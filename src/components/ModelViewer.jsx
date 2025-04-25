

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const ModelViewer = () => {
//   const [searchParams] = useSearchParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // Get all model configuration parameters
//   const modelUrl = searchParams.get('model');
//   const woodFinishId = searchParams.get('woodFinish');
//   const handleTypeId = searchParams.get('handleType');
//   const handleFinishId = searchParams.get('handleFinish');
//   const legOptionId = searchParams.get('legOption');
  
//   // Extract furniture ID from model URL if available
//   const getFurnitureId = () => {
//     if (!modelUrl) return '';
//     const matches = modelUrl.match(/furniture-(\w+)/);
//     return matches ? matches[1] : '';
//   };
  
//   const furnitureId = getFurnitureId();
  
//   // Create paths for handle and leg models
//   const getHandleModelPath = () => {
//     if (!handleTypeId || !furnitureId) return '';
//     return `/models/handles/handle-${handleTypeId}-${furnitureId}.glb`;
//   };
  
//   const getLegModelPath = () => {
//     if (!legOptionId || !furnitureId) return '';
//     return `${furnitureId}/legs/leg-${legOptionId}-${furnitureId}.glb`;
//   };
  
//   // Load model-viewer script
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.type = 'module';
//     script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.2.0/model-viewer.min.js';
//     script.onload = () => setIsLoading(false);
//     script.onerror = () => setError('Failed to load AR viewer');
//     document.head.appendChild(script);
    
//     return () => {
//       if (document.head.contains(script)) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Set a timeout to consider the model as failed to load
//     const timeoutId = setTimeout(() => {
//       if (isLoading) {
//         setError('Model loading timed out. Please check your connection and try again.');
//       }
//     }, 15000); // 15 seconds timeout

//     return () => clearTimeout(timeoutId);
//   }, [isLoading]);

//   if (error) {
//     return (
//       <div className="ar-error" style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         padding: '20px',
//         textAlign: 'center'
//       }}>
//         <div style={{
//           backgroundColor: '#fff3f3',
//           padding: '20px',
//           borderRadius: '8px',
//           border: '1px solid #ffcaca',
//           maxWidth: '500px'
//         }}>
//           <h2 style={{ color: '#e53e3e', marginBottom: '10px' }}>Error</h2>
//           <p>{error}</p>
//           <Link to="/">
//             <button style={{
//               marginTop: '15px',
//               padding: '8px 16px',
//               backgroundColor: '#3182ce',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}>
//               Return to Configurator
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading || !modelUrl) {
//     return (
//       <div className="ar-loading" style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         flexDirection: 'column'
//       }}>
//         <div style={{ width: '50px', height: '50px' }} className="spinner">
//           <svg viewBox="0 0 50 50" style={{ animation: 'rotate 2s linear infinite' }}>
//             <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" stroke="#3182ce" 
//               strokeDasharray="80, 200" strokeDashoffset="0" 
//               style={{ animation: 'dash 1.5s ease-in-out infinite' }} />
//           </svg>
//         </div>
//         <p style={{ marginTop: '20px' }}>Preparing AR View...</p>
        
//         <style jsx>{`
//           @keyframes rotate {
//             100% { transform: rotate(360deg); }
//           }
//           @keyframes dash {
//             0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
//             50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35; }
//             100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124; }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="ar-viewer-container">
//       {/* Using model-viewer component */}
//       <model-viewer
//         src={modelUrl}
//         alt="3D Model of configured furniture"
//         ar
//         ar-modes="webxr scene-viewer quick-look"
//         environment-image="neutral"
//         camera-controls
//         shadow-intensity="1"
//         exposure="0.8"
//         style={{ width: '100%', height: '100vh' }}
//         loading="eager"
//         reveal="auto"
//         ar-status="not-presenting"
//       >
//         {/* Handle model, if applicable */}
//         {handleTypeId && furnitureId && (
//           <div className="additionalModel" slot="additionalModels">
//             <model-url src={getHandleModelPath()}></model-url>
//           </div>
//         )}
        
//         {/* Leg model, if applicable */}
//         {legOptionId && furnitureId && (
//           <div className="additionalModel" slot="additionalModels">
//             <model-url src={getLegModelPath()}></model-url>
//           </div>
//         )}
        
//         {/* Material overrides for wood finish */}
//         {woodFinishId && (
//           <div slot="materialOverrides">
//             <material
//               name="wood" color={
//               woodFinishId === 'walnut' ? '#5D432C' :
//               woodFinishId === 'oak' ? '#D4B486' :
//               woodFinishId === 'cherry' ? '#A52A2A' : '#D4B486'
//             }></material>
//           </div>
//         )}
        
//         {/* Material overrides for handle finish */}
//         {handleFinishId && (
//           <div slot="materialOverrides">
//             <material name="handle" color={
//               handleFinishId === 'brass' ? '#B5A642' :
//               handleFinishId === 'chrome' ? '#E8E8E8' :
//               handleFinishId === 'black' ? '#2B2B2B' : '#B5A642'
//             }></material>
//           </div>
//         )}

//         <button
//           slot="ar-button"
//           className="ar-button"
//           style={{
//             backgroundColor: 'white',
//             borderRadius: '4px',
//             border: 'none',
//             position: 'absolute',
//             bottom: '16px',
//             right: '16px',
//             padding: '8px 16px',
//             color: 'black',
//             fontWeight: 'bold',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
//           }}
//         >
//           👋 View in your space
//         </button>
        
//         <div className="ar-prompt" slot="ar-prompt">
//           <div style={{
//             padding: '10px',
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             borderRadius: '4px',
//             marginBottom: '20px'
//           }}>
//             <p>Place the item in your space</p>
//           </div>
//         </div>
        
//         <div className="progress-bar" slot="progress-bar">
//           <div style={{
//             width: '100%',
//             height: '5px',
//             backgroundColor: '#edf2f7',
//             borderRadius: '4px',
//             overflow: 'hidden'
//           }}>
//             <div className="update-bar" style={{
//               height: '100%',
//               backgroundColor: '#4299e1',
//               width: 'var(--progress-percent, 0%)',
//               transition: 'width 0.3s ease-out'
//             }}></div>
//           </div>
//         </div>
        
//         {/* Back button */}
//         <Link to="/" style={{
//           position: 'absolute',
//           top: '16px',
//           left: '16px',
//           zIndex: 10,
//           textDecoration: 'none'
//         }}>
//           <button style={{
//             backgroundColor: 'white',
//             borderRadius: '4px',
//             border: 'none',
//             padding: '8px 16px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '5px',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
//           }}>
//             <span>←</span> Back to Configurator
//           </button>
//         </Link>
//       </model-viewer>
//     </div>
//   );
// };

// export default ModelViewer;
// import React, { Suspense, useEffect, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Html, useProgress, Environment } from '@react-three/drei';
// import { useLocation } from 'react-router-dom';
// import FurnitureModel from './FurnitureModel';
// import HandleModel from './HandleModel';
// import LegModel from './LegModel';
// import CameraControls from './CameraControls';

// // Loading indicator component
// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress.toFixed(0)} % loaded</Html>;
// }

// const ModelViewer = () => {
//   const location = useLocation();
//   const [modelConfig, setModelConfig] = useState(null);

//   useEffect(() => {
//     // Parse the URL params to get the configuration details
//     const params = new URLSearchParams(location.search);
//     const configParam = params.get('config');
    
//     if (configParam) {
//       try {
//         const config = JSON.parse(decodeURIComponent(configParam));
//         setModelConfig(config);
//       } catch (e) {
//         console.error('Error parsing configuration:', e);
//       }
//     }
//   }, [location]);

//   if (!modelConfig) {
//     return (
//       <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <p>Loading configuration...</p>
//       </div>
//     );
//   }

//   const { furnitureId, woodFinishId, handleTypeId, handleFinishId, legOptionId } = modelConfig;

//   // Fetch the detailed options from the config
//   const furniture = modelConfig.options.furnitureOptions.find(f => f.id === furnitureId);
//   const woodFinish = modelConfig.options.woodFinishOptions.find(w => w.id === woodFinishId);
//   const handleType = modelConfig.options.handleOptions.find(h => h.id === handleTypeId);
//   const handleFinish = modelConfig.options.handleFinishOptions.find(hf => hf.id === handleFinishId);
//   const legOption = modelConfig.options.legOptions.find(l => l.id === legOptionId);

//   // Generate model paths
//   const furnitureModelPath = furniture?.modelPath;
//   const handleModelPath = handleType?.modelPathTemplate?.replace(/{furnitureId}/g, furniture.id);
//   const legModelPath = legOption?.modelPathTemplate?.replace(/{furnitureId}/g, furniture.id);

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <Canvas camera={{ position: [1.2, 1.2, 1.2], fov: 45 }} style={{ background: '#f5f5f5' }}>
//         <Suspense fallback={<Loader />}>
//           <Environment preset="apartment" />
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} intensity={1} />
//           <hemisphereLight intensity={0.3} />

//           {furnitureModelPath && (
//             <FurnitureModel
//               modelPath={furnitureModelPath}
//               woodFinish={woodFinish}
//               selectedSize={furniture.name}
//               furnitureOptions={modelConfig.options.furnitureOptions}
//               flipVertical={true}
//             />
//           )}

//           {handleModelPath && (
//             <HandleModel 
//               modelPath={handleModelPath}
//               handleFinish={handleFinish} 
//             />
//           )}

//           {legModelPath && (
//             <LegModel 
//               modelPath={legModelPath}
//               woodFinish={woodFinish}
//               selectedSize={furniture.name}
//               furnitureOptions={modelConfig.options.furnitureOptions}
//               flipVertical={true}
//             />
//           )}

//           <CameraControls />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default ModelViewer;