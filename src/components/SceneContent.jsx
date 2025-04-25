


import React, { useRef, useState } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { useConfigurator } from './ConfiguratorContext';
import FurnitureModel from './FurnitureModel';
import HandleModel from './HandleModel';
import LegModel from './LegModel';
import CanvasControls from './CanvasControls';

const SceneContent = ({
  selectedSize,
  woodFinish,
  handleType,
  handleFinish,
  legOption,
  furnitureOptions,
  woodFinishOptions,
  handleOptions,
  handleFinishOptions,
  legOptions
}) => {
  const modelRef = useRef();
  const [showMeasurements, setShowMeasurements] = useState(false);
  const { actions } = useConfigurator();

  // Safety check - make sure selectedSize is an object with id property
  const currentFurniture = selectedSize && typeof selectedSize === 'object' ? selectedSize : furnitureOptions[0];
  const currentWoodFinish = woodFinish || woodFinishOptions[0];
  const currentHandleType = handleType || handleOptions[0];
  const currentHandleFinish = handleFinish || handleFinishOptions[0];
  const currentLegOption = legOption || legOptions[0];
  
  // Get the correct model paths
  const furnitureModelPath = currentFurniture.modelPath;
  
  // Generate handle model path by replacing {furnitureId} placeholder
  const handleModelPath = currentHandleType?.modelPathTemplate?.replace(/{furnitureId}/g, currentFurniture.id);
  
  // Generate leg model path by replacing {furnitureId} placeholder
  const legModelPath = currentLegOption?.modelPathTemplate?.replace(/{furnitureId}/g, currentFurniture.id);

  // Handle screenshot taken
  const handleScreenshot = () => {
    console.log('Screenshot taken!');
    // You can add additional functionality here if needed
  };

  // Handle AR view - use the context action
  const handleARView = () => {
    actions.generateARQRCode();
  };

  // Toggle measurements
  const handleToggleMeasurements = () => {
    setShowMeasurements(!showMeasurements);
    console.log('Measurements toggled:', !showMeasurements);
  };

  return (
    <>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="apartment" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <hemisphereLight intensity={0.3} />
      
      {/* Render furniture model only if we have a valid model path */}
      {furnitureModelPath && (
        <FurnitureModel
          ref={modelRef}
          modelPath={furnitureModelPath}
          woodFinish={currentWoodFinish}
          selectedSize={currentFurniture.name}
          furnitureOptions={furnitureOptions}
          flipVertical={true}
        />
      )}
      
      {/* Render handle model */}
      {handleModelPath && (
        <HandleModel 
          modelPath={handleModelPath}
          handleFinish={currentHandleFinish} 
        />
      )}
      
      {/* Render leg model */}
      {legModelPath && (
        <LegModel 
          modelPath={legModelPath}
          woodFinish={currentWoodFinish} // Legs typically use same finish as furniture
          selectedSize={currentFurniture.name}
          furnitureOptions={furnitureOptions}
          flipVertical={true}
        />
      )}

      {/* Add our canvas controls */}
      <CanvasControls 
        onScreenshot={handleScreenshot}
        onARView={handleARView}
        onToggleMeasurements={handleToggleMeasurements}
      />
      
      {/* Here you would add measurement lines if showMeasurements is true */}
      {showMeasurements && (
        <>
          {/* You can add measurement lines here */}
        </>
      )}
    </>
  );
};

export default SceneContent;