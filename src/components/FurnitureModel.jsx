

// import React, { useEffect, useMemo, forwardRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { applyWoodTexture } from '../utils/applyWoodTexture';

// const FurnitureModel = forwardRef(({ 
//   modelPath, 
//   woodFinish, 
//   selectedSize, 
//   furnitureOptions 
// }, ref) => {
//   const { scene } = useGLTF(modelPath);
  
//   // Clone the model when it loads or changes
//   const model = useMemo(() => scene ? scene.clone() : null, [scene]);
  
//   useEffect(() => {
//     if (model && woodFinish && selectedSize && furnitureOptions) {
//       // Apply texture to the model directly, not to ref.current
//       applyWoodTexture(model, woodFinish, selectedSize, furnitureOptions);
//     }
//   }, [model, woodFinish, selectedSize, furnitureOptions]);

//   // Set the ref to point to the model
//   useEffect(() => {
//     if (ref && model) {
//       if (typeof ref === 'function') {
//         ref(model);
//       } else {
//         ref.current = model;
//       }
//     }
//   }, [model, ref]);

//   if (!model) return null;
//   return <primitive object={model} />;
// });

// export default FurnitureModel;

import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { applyWoodTexture } from '../utils/applyWoodTexture';

const LegModel = ({ 
  modelPath, 
  woodFinish, 
  selectedSize, 
  furnitureOptions,
  flipVertical = false // Add the flipVertical prop
}) => {
  const { scene } = useGLTF(modelPath);
  
  // Apply same wood finish as the furniture to the legs
  useEffect(() => {
    if (woodFinish && selectedSize && furnitureOptions) {
      // Pass the flipVertical parameter to applyWoodTexture
      applyWoodTexture(scene, woodFinish, selectedSize, furnitureOptions, flipVertical);
    }
  }, [scene, woodFinish, selectedSize, furnitureOptions, flipVertical]);

  if (!scene) return null;
  return <primitive object={scene} />;
};

export default LegModel;