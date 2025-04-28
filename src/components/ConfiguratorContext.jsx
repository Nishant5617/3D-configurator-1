import React, { createContext, useContext, useState } from "react";
import QRCodeModal          from "./QrCodeModal";
import SceneContent         from "./SceneContent";
import { GLTFExporter }     from "three/examples/jsm/exporters/GLTFExporter";

/* ────────────────────────────────────────────────────────────── */
const ConfiguratorContext = createContext();
export const useConfigurator = () => useContext(ConfiguratorContext);

/* ────────────────────────────────────────────────────────────── */
export const ConfiguratorProvider = ({ children, initialOptions }) => {
  /* ── CURRENT SELECTIONS ───────────────────────────────────── */
  const [selectedSize,  setSelectedSize ] = useState(initialOptions.furnitureOptions[0]);
  const [woodFinish,    setWoodFinish   ] = useState(initialOptions.woodFinishOptions[0]);
  const [handleType,    setHandleType   ] = useState(initialOptions.handleOptions[0]);
  const [handleFinish,  setHandleFinish ] = useState(initialOptions.handleFinishOptions[0]);
  const [legOption,     setLegOption    ] = useState(initialOptions.legOptions[0]);

  /* ── QR MODAL STATE ───────────────────────────────────────── */
  const [showQR, setShowQR] = useState(false);
  const [arUrl,  setArUrl ] = useState("");

  /* ─────────────────────────────────────────────────────────── */
  const generateARQRCode = async () => {
    const baseUrl = window.location.origin;             // ← will go in the QR

    /* 1️⃣  current furniture item */
    const selectedFurniture = initialOptions.furnitureOptions
      .find(o => o.id === selectedSize.id);
    if (!selectedFurniture) return;

    /* 2️⃣  export current scene */
    const exporter = new GLTFExporter();
    const scene    = SceneContent.getScene();
    let output;
    try {
      output = await exporter.parseAsync(scene, { binary:true });
    } catch (err) {
      console.error("GLTF export failed:", err);
      return;
    }

    /* 3️⃣  Blob + object-URL */
    const blob = output instanceof ArrayBuffer
      ? new Blob([output], { type:"model/gltf-binary" })
      : new Blob([JSON.stringify(output,null,2)], { type:"model/gltf+json" });

    const blobUrl = URL.createObjectURL(blob);

    /* 4️⃣  AR-viewer URL (only used for mobile redirect) */
    const arViewerUrl =
      `${baseUrl}/model-viewer?` +
      `modelId=${encodeURIComponent(selectedFurniture.id)}` +
      `&woodFinish=${encodeURIComponent(woodFinish.id)}` +
      `&handleType=${encodeURIComponent(handleType.id)}` +
      `&handleFinish=${encodeURIComponent(handleFinish.id)}` +
      `&legOption=${encodeURIComponent(legOption.id)}` +
      `&glbUrl=${encodeURIComponent(blobUrl)}`;

    /* 5️⃣  Decide by user agent */
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);

    if (isMobile) {
      /* same-tab navigation keeps blob alive */
      window.location.href = arViewerUrl;
    } else {
      /* desktop shows QR with *baseUrl* (no blob) */
      setArUrl(baseUrl);
      setShowQR(true);
    }

    /* 6️⃣  cleanup */
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
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
    },
  };

  return (
    <ConfiguratorContext.Provider value={ctx}>
      {children}
      <QRCodeModal isOpen={showQR} onClose={closeQRModal} arUrl={arUrl} />
    </ConfiguratorContext.Provider>
  );
};