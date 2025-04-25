import React, { createContext, useContext, useState } from "react";
import QRCodeModal from "./QrCodeModal"; // Import the QR code modal component
import SceneContent from "./SceneContent";

// Create the context
const ConfiguratorContext = createContext();

// Custom hook to use the configurator context
export const useConfigurator = () => useContext(ConfiguratorContext);

export const ConfiguratorProvider = ({ children, initialOptions }) => {
  // Initialize state with the first option of each type
  const [selectedSize, setSelectedSize] = useState(
    initialOptions.furnitureOptions[0]
  );
  const [woodFinish, setWoodFinish] = useState(
    initialOptions.woodFinishOptions[0]
  );
  const [handleType, setHandleType] = useState(initialOptions.handleOptions[0]);
  const [handleFinish, setHandleFinish] = useState(
    initialOptions.handleFinishOptions[0]
  );
  const [legOption, setLegOption] = useState(initialOptions.legOptions[0]);
  const [showQR, setShowQR] = useState(false);
  const [arUrl, setArUrl] = useState("");

  // Single function to generate a URL for AR viewing with current configuration
  // const triggerARView = () => {
  //   // Create a configuration object with just the necessary IDs
  //   const configData = {
  //     furnitureId: selectedSize?.id || '',
  //     woodFinishId: woodFinish?.id || '',
  //     handleTypeId: handleType?.id || '',
  //     handleFinishId: handleFinish?.id || '',
  //     legOptionId: legOption?.id || ''
  //   };

  //   // Encode the configuration data for passing in URL
  //   const encodedConfig = encodeURIComponent(JSON.stringify(configData));

  //   // Create the URL for the AR view
  //   const newArUrl = `${window.location.origin}/ar-viewer?config=${encodedConfig}`;
  //   console.log(newArUrl)
  //   // Set the AR URL in state and show the QR modal
  //   setArUrl(newArUrl);
  //   setShowQR(true);
  // };

  const generateARQRCode = () => {
    
    <SceneContent></SceneContent>

    const baseUrl = window.location.origin;
    const selectedFurniture = initialOptions.furnitureOptions.find(
      (option) => option.name === selectedSize.name
    );

    if (!selectedFurniture) return;

    const arViewerUrl =
      `${baseUrl}/model-viewer?` +
      `modelId=${encodeURIComponent(selectedFurniture.id)}` +
      `&woodFinish=${encodeURIComponent(woodFinish)}` +
      `&handleType=${encodeURIComponent(handleType)}` +
      `&handleFinish=${encodeURIComponent(handleFinish)}` +
      `&legOption=${encodeURIComponent(legOption)}`;
    console.log(arViewerUrl);
    setArUrl(arViewerUrl);
    setShowQR(true);
  };

  // Function to close QR modal
  const closeQRModal = () => {
    setShowQR(false);
  };

  // Group all state and actions for the context value
  const contextValue = {
    state: {
      selectedSize,
      woodFinish,
      handleType,
      handleFinish,
      legOption,
      showQR,
      arUrl,
      options: initialOptions,
    },
    actions: {
      setSelectedSize,
      setWoodFinish,
      setHandleType,
      setHandleFinish,
      setLegOption,
      setShowQR,
      setArUrl,
      generateARQRCode,
      closeQRModal,
    },
  };

  // Provide the context value to all children
  return (
    <ConfiguratorContext.Provider value={contextValue}>
      {children}
      {/* Include QR Code Modal within the provider */}
      <QRCodeModal isOpen={showQR} onClose={closeQRModal} arUrl={arUrl} />
    </ConfiguratorContext.Provider>
  );
};
