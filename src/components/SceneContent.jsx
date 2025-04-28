import React, { useRef, useState, useEffect } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useConfigurator } from "./ConfiguratorContext";

import FurnitureModel from "./FurnitureModel";
import HandleModel    from "./HandleModel";
import LegModel       from "./LegModel";
import CanvasControls from "./CanvasControls";
import DimensionHelper from "./DimensionHelper"; // Import the DimensionHelper

/*  props from parent remain unchanged  */
const SceneContent = ({
  selectedSize, woodFinish, handleType, handleFinish, legOption,
  furnitureOptions, woodFinishOptions, handleOptions, handleFinishOptions, legOptions
}) => {
  const modelRef = useRef();
  const [showMeasurements, setShowMeasurements] = useState(false);
  const { actions } = useConfigurator();

  /* expose the live Three.js scene to GLTFExporter */
  const { scene } = useThree();
  useEffect(() => { SceneContent.getScene = () => scene; }, [scene]);

  /* resolve current chosen variants (with fallbacks) */
  const currentFurniture     = selectedSize   || furnitureOptions[0];
  const currentWoodFinish    = woodFinish     || woodFinishOptions[0];
  const currentHandleType    = handleType     || handleOptions[0];
  const currentHandleFinish  = handleFinish   || handleFinishOptions[0];
  const currentLegOption     = legOption      || legOptions[0];

  /* derive model paths */
  const furnitureModelPath = currentFurniture.modelPath;
  const handleModelPath = currentHandleType.modelPathTemplate
    ?.replace(/{furnitureId}/g, currentFurniture.id);
  const legModelPath = currentLegOption.modelPathTemplate
    ?.replace(/{furnitureId}/g, currentFurniture.id);

  /* button callbacks */
  const handleScreenshot = () => console.log("Screenshot captured");
  const handleARView     = actions.generateARQRCode;
  const toggleMeasure    = () => setShowMeasurements((s) => !s);

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <Environment preset="apartment" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10,10,5]} intensity={1} />
      <hemisphereLight intensity={0.3} />

      {furnitureModelPath && (
        <FurnitureModel
          ref={modelRef}
          modelPath={furnitureModelPath}
          woodFinish={currentWoodFinish}
          selectedSize={currentFurniture.name}
          furnitureOptions={furnitureOptions}
          flipVertical
        />
      )}

      {handleModelPath && (
        <HandleModel
          modelPath={handleModelPath}
          handleFinish={currentHandleFinish}
        />
      )}

      {legModelPath && (
        <LegModel
          modelPath={legModelPath}
          woodFinish={currentWoodFinish}
          selectedSize={currentFurniture.name}
          furnitureOptions={furnitureOptions}
          flipVertical
        />
      )}

      <CanvasControls
        onScreenshot={handleScreenshot}
        onARView={handleARView}
        onToggleMeasurements={toggleMeasure}
      />

      {showMeasurements && <DimensionHelper objectRef={modelRef} />}
    </>
  );
};

export default SceneContent;