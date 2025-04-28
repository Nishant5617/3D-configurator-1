import React, { createContext, useContext, useState } from "react";
import QRCodeModal from "./QrCodeModal";
import SceneContent from "./SceneContent";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

/* ────────────────────────────────────────────────────────────── */
const ConfiguratorContext = createContext();
export const useConfigurator = () => useContext(ConfiguratorContext);

/* ────────────────────────────────────────────────────────────── */
export const ConfiguratorProvider = ({ children, initialOptions }) => {
  /* ── CURRENT SELECTIONS ───────────────────────────────────── */
  const [selectedSize, setSelectedSize] = useState(initialOptions.furnitureOptions[0]);
  const [woodFinish, setWoodFinish] = useState(initialOptions.woodFinishOptions[0]);
  const [handleType, setHandleType] = useState(initialOptions.handleOptions[0]);
  const [handleFinish, setHandleFinish] = useState(initialOptions.handleFinishOptions[0]);
  const [legOption, setLegOption] = useState(initialOptions.legOptions[0]);

  /* ── QR MODAL STATE ───────────────────────────────────────── */
  const [showQR, setShowQR] = useState(false);
  const [arUrl, setArUrl] = useState("");

  /* ─────────────────────────────────────────────────────────── */
  const generateARQRCode = async () => {
    const baseUrl = window.location.origin;
    // Get the current path (without query parameters)
    const currentPath = window.location.pathname;

    /* 1️⃣  current furniture item */
    const selectedFurniture = initialOptions.furnitureOptions
      .find(o => o.id === selectedSize.id);
    if (!selectedFurniture) return;

    /* 2️⃣  export current scene */
    const exporter = new GLTFExporter();
    const scene = SceneContent.getScene();
    let output;
    try {
      output = await exporter.parseAsync(scene, { binary: true });
    } catch (err) {
      console.error("GLTF export failed:", err);
      return;
    }

    /* 3️⃣  Blob + object-URL */
    const blob = output instanceof ArrayBuffer
      ? new Blob([output], { type: "model/gltf-binary" })
      : new Blob([JSON.stringify(output, null, 2)], { type: "model/gltf+json" });

    const blobUrl = URL.createObjectURL(blob);

    /* 4️⃣ Build configuration URL using the current path */
    // This ensures we use whatever path is currently active
    const configUrl =
      `${baseUrl}${currentPath}?` +
      `size=${encodeURIComponent(selectedFurniture.id)}` +
      `&woodFinish=${encodeURIComponent(woodFinish.id)}` +
      `&handleType=${encodeURIComponent(handleType.id)}` +
      `&handleFinish=${encodeURIComponent(handleFinish.id)}` +
      `&legOption=${encodeURIComponent(legOption.id)}`;

    /* Only mobile devices should be directed to AR view */
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);

    if (isMobile) {
      /* For mobile: Create AR viewer URL with the blob */
      const arViewerUrl =
        `${baseUrl}/model-viewer?` +
        `modelId=${encodeURIComponent(selectedFurniture.id)}` +
        `&woodFinish=${encodeURIComponent(woodFinish.id)}` +
        `&handleType=${encodeURIComponent(handleType.id)}` +
        `&handleFinish=${encodeURIComponent(handleFinish.id)}` +
        `&legOption=${encodeURIComponent(legOption.id)}` +
        `&glbUrl=${encodeURIComponent(blobUrl)}`;

      /* same-tab navigation keeps blob alive */
      window.location.href = arViewerUrl;
    } else {
      /* For desktop: Show QR with configurator URL */
      setArUrl(configUrl);  // Use configUrl instead of arViewerUrl
      setShowQR(true);
    }

    /* 6️⃣  cleanup */
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
  };

  /* Function to handle direct view in AR for mobile devices */
  const handleViewInAR = async () => {
    // Get the current furniture item
    const selectedFurniture = initialOptions.furnitureOptions
      .find(o => o.id === selectedSize.id);
    if (!selectedFurniture) return;

    // Export current scene
    const exporter = new GLTFExporter();
    const scene = SceneContent.getScene();
    
    try {
      const output = await exporter.parseAsync(scene, { binary: true });
      
      // Create blob and object URL
      const blob = output instanceof ArrayBuffer
        ? new Blob([output], { type: "model/gltf-binary" })
        : new Blob([JSON.stringify(output, null, 2)], { type: "model/gltf+json" });
      
      const blobUrl = URL.createObjectURL(blob);
      
      // Build AR viewer URL with the blob
      const baseUrl = window.location.origin;
      const arViewerUrl =
        `${baseUrl}/model-viewer?` +
        `modelId=${encodeURIComponent(selectedFurniture.id)}` +
        `&woodFinish=${encodeURIComponent(woodFinish.id)}` +
        `&handleType=${encodeURIComponent(handleType.id)}` +
        `&handleFinish=${encodeURIComponent(handleFinish.id)}` +
        `&legOption=${encodeURIComponent(legOption.id)}` +
        `&glbUrl=${encodeURIComponent(blobUrl)}`;
      
      // Redirect to AR viewer
      window.location.href = arViewerUrl;
      
      // Cleanup blob URL after a minute
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      
    } catch (err) {
      console.error("GLTF export failed:", err);
    }
  };

  const closeQRModal = () => setShowQR(false);

  /* ── CONTEXT VALUE ────────────────────────────────────────── */
  const ctx = {
    state: {
      selectedSize, woodFinish, handleType, handleFinish,
      legOption, showQR, arUrl, options: initialOptions,
    },
    actions: {
      setSelectedSize, setWoodFinish, setHandleType, setHandleFinish,
      setLegOption, setShowQR, setArUrl, generateARQRCode, closeQRModal,
      handleViewInAR,
    },
  };

  return (
    <ConfiguratorContext.Provider value={ctx}>
      {children}
      <QRCodeModal isOpen={showQR} onClose={closeQRModal} arUrl={arUrl} />
    </ConfiguratorContext.Provider>
  );
};