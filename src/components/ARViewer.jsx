// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// function ARViewer() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const [isModelViewerLoaded, setIsModelViewerLoaded] = useState(false);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const [loadError, setLoadError] = useState(null);
  
//   // Get URL parameters
//   const mainModelUrl = searchParams.get('model');
//   const furnitureId = searchParams.get('furniture');
//   const woodFinishId = searchParams.get('woodFinish');
//   const handleTypeId = searchParams.get('handleType');
//   const handleFinishId = searchParams.get('handleFinish');
//   const legOptionId = searchParams.get('legOption');
  
//   // Helper function to get color from wood finish ID
//   const getWoodColor = (id) => {
//     switch(id) {
//       case 'walnut': return '#5D432C';
//       case 'oak': return '#D4B486';
//       case 'cherry': return '#A52A2A';
//       case 'maple': return '#E8CDA9';
//       case 'mahogany': return '#4E2728';
//       default: return '#D4B486'; // Default to oak
//     }
//   };
  
//   // Helper function to get color from handle finish ID
//   const getHandleColor = (id) => {
//     switch(id) {
//       case 'brass': return '#B5A642';
//       case 'chrome': return '#E8E8E8';
//       case 'black': return '#2B2B2B';
//       case 'bronze': return '#CD7F32';
//       case 'copper': return '#B87333';
//       default: return '#B5A642'; // Default to brass
//     }
//   };
  
//   // Generate paths for additional models
//   const getHandleModelPath = () => {
//     if (!handleTypeId || !furnitureId) return null;
//     return `/models/handles/handle-${handleTypeId}-${furnitureId}.glb`;
//   };
  
//   const getLegModelPath = () => {
//     if (!legOptionId || !furnitureId) return null;
//     return `/models/legs/leg-${legOptionId}-${furnitureId}.glb`;
//   };
  
//   const handleModelPath = getHandleModelPath();
//   const legModelPath = getLegModelPath();
  
//   useEffect(() => {
//     // Load model-viewer script
//     const script = document.createElement('script');
//     script.type = 'module';
//     script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.2.0/model-viewer.min.js';
    
//     script.onload = () => {
//       setIsModelViewerLoaded(true);
//     };
    
//     script.onerror = () => {
//       setLoadError('Failed to load AR viewer component');
//     };
    
//     document.head.appendChild(script);
    
//     return () => {
//       if (document.head.contains(script)) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);
  
//   // Handle error case
//   if (loadError) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         flexDirection: 'column',
//         padding: '20px',
//         textAlign: 'center'
//       }}>
//         <div style={{
//           maxWidth: '400px',
//           backgroundColor: '#fff3f3',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//         }}>
//           <h2 style={{ color: '#e53e3e' }}>AR Viewer Error</h2>
//           <p>{loadError}</p>
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
  
//   // Show loading screen while model-viewer is loading
//   if (!isModelViewerLoaded) {
//     return (
//       <div style={{
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
//         <p style={{ marginTop: '20px' }}>Loading AR viewer...</p>
        
//         <style dangerouslySetInnerHTML={{ __html: `
//           @keyframes rotate {
//             100% { transform: rotate(360deg); }
//           }
//           @keyframes dash {
//             0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
//             50% { stroke-dasharray: 89, 200; stroke-dashoffset: -35; }
//             100% { stroke-dasharray: 89, 200; stroke-dashoffset: -124; }
//           }
//         `}} />
//       </div>
//     );
//   }
  
//   // Create model-viewer element with all necessary attributes
//   return (
//     <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
//       {/* @ts-ignore - model-viewer is a custom element */}
//       <model-viewer
//         src={mainModelUrl}
//         alt="3D furniture model"
//         ar
//         ar-modes="webxr scene-viewer quick-look"
//         environment-image="neutral"
//         camera-controls
//         shadow-intensity="1"
//         auto-rotate
//         rotation-per-second="30deg"
//         loading="eager"
//         style={{ width: '100%', height: '100%' }}
//         onLoad={() => setModelLoaded(true)}
//         onError={() => setLoadError('Failed to load 3D model')}
//       >
//         {/* Show loading animation while model loads */}
//         {!modelLoaded && (
//           <div slot="poster" style={{
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#f5f5f5'
//           }}>
//             <div style={{ textAlign: 'center' }}>
//               <div className="loading-spinner" style={{
//                 width: '48px',
//                 height: '48px',
//                 border: '5px solid #eaeaea',
//                 borderRadius: '50%',
//                 borderTop: '5px solid #3182ce',
//                 animation: 'spin 1s linear infinite',
//                 margin: '0 auto 20px'
//               }}></div>
//               <p>Loading 3D Model...</p>
//             </div>
//           </div>
//         )}
        
//         {/* AR Button */}
//         <button
//           slot="ar-button"
//           style={{
//             backgroundColor: 'white',
//             borderRadius: '4px',
//             border: 'none',
//             position: 'absolute',
//             bottom: '16px',
//             right: '16px',
//             padding: '12px 20px',
//             fontWeight: 'bold',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}
//         >
//           <span role="img" aria-label="AR">👋</span>
//           View in your space
//         </button>
        
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
        
//         {/* Progress bar */}
//         <div slot="progress-bar" style={{ 
//           width: '100%', 
//           height: '8px', 
//           position: 'absolute', 
//           top: 0, 
//           left: 0 
//         }}>
//           <div className="progress-bar-inner" style={{
//             height: '100%',
//             backgroundColor: '#4299e1',
//             width: 'var(--progress-percent, 0%)',
//             transition: 'width 0.3s ease-out'
//           }}></div>
//         </div>
        
//         {/* Handle additional models correctly */}
//         {handleModelPath && (
//           <div slot="model-viewer-nodes">
//             <model-viewer-node
//               src={handleModelPath}
//               mesh="handle"
//             >
//               <model-viewer-material
//                 color={getHandleColor(handleFinishId)}
//                 metalness="0.8"
//                 roughness="0.4"
//               ></model-viewer-material>
//             </model-viewer-node>
//           </div>
//         )}
        
//         {/* Leg model, if available */}
//         {legModelPath && (
//           <div slot="model-viewer-nodes">
//             <model-viewer-node
//               src={legModelPath}
//               mesh="leg"
//             >
//               <model-viewer-material
//                 color={getWoodColor(woodFinishId)}
//                 metalness="0.2"
//                 roughness="0.8"
//               ></model-viewer-material>
//             </model-viewer-node>
//           </div>
//         )}
        
//         {/* Material overrides for wood finish on main furniture */}
//         <div slot="material-variants">
//           <material-variant
//             name="wood"
//             color={getWoodColor(woodFinishId)}
//           ></material-variant>
//         </div>
//       </model-viewer>
//     </div>
//   );
// }

// export default ARViewer;


// import React, { Suspense, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Html, useProgress } from '@react-three/drei';
// import { Canvas } from '@react-three/fiber';
// import FurnitureModel from './FurnitureModel';
// import HandleModel from './HandleModel';
// import LegModel from './LegModel';
// const options = {
//   furnitureOptions: [
//     { id: '565-01', name: 'Single Drawer', image:'ICONS/565-01.png.png', modelPath: '565/565-01/565-01.glb' },
//     { id: '565-02', name: 'Three Drawer', image:'ICONS/565-02.png.png' , modelPath: '565/565-02/565-02.glb' },
//     { id: '565-04', name: 'Single Wardrobe', image: 'ICONS/565-04.png.png', modelPath: '565/565-04/565-04.glb' },
//     { id: '565-05', name: 'Double Wardrobe', image: 'ICONS/565-05.png.png', modelPath: '565/565-05/565-05.glb' },
//     { id: '565-06', name: 'Footboard', image: "/api/placeholder/80/80", modelPath: '565/565-06/565-06.glb' },
    
//   ],
//   woodFinishOptions: [
//     { id: 'cafelle', name: 'Cafelle', color: '#362617', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Cafelle.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'amber', name: 'Amber', color: '#8B5A2B', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Amber.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'bitmore', name: 'Bitmore', color: '#4A2511', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Bitmore.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'brighton', name: 'Brighton', color: '#352315', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Brighton.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'cocoballa', name: 'Cocoballa', color: '#3D2B1F', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Cocoballa.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'columbian', name: 'Columbian', color: '#4F3222', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Columbian.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'empire', name: 'Empire', color: '#462913', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Empire.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'fonthill', name: 'Fonthill', color: '#A16C38', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Fonthill.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'macadamia', name: 'Macadamia Nut', color: '#9C8E7B', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Macadamia Nut.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'naturalash', name: 'Natural Ash', color: '#E5D7B7', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Natural Ash.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'raya', name: 'Raya', color: '#5B5B40', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Raya.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'rivercherry', name: 'River Cherry', color: '#B68E5B', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/River Cherry.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'studioteak', name: 'Studio Teak', color: '#6A6D56', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Studio Teak.png', 
//       roughnessTexturePathTemplate:'565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'whitecypress', name: 'White Cypress', color: '#D3C9B6', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/White Cypress.png', 
//       roughnessTexturePathTemplate:'565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'williamsburg', name: 'Williamsburg', color: '#4D2C19', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Williamsburg.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
//     { id: 'windsor', name: 'Windsor', color: '#95432F', 
//       texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Windsor.png', 
//       roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png'},
//   ],
//   handleOptions: [
//     { id: 'handle-1', name: 'Handle 1', image: 'ICONS/handle_1.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 1.glb' },
//     { id: 'handle-2', name: 'Handle 2', image: 'ICONS/handle_2.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 2.glb' },
//     { id: 'handle-3', name: 'Handle 3', image: "ICONS/handle_3.jpg", modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 3.glb' },
//     { id: 'handle-4', name: 'Handle 4', image: 'ICONS/handle_4.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 4.glb' },
//     { id: 'handle-5', name: 'Handle 5', image: 'ICONS/handle_5.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 5.glb' },
//   ],
//   handleFinishOptions: [
//     { id: 'antique-english', name: 'Antique English', color: '#704214', modelPath: '565/Handle Finishs/Antique English.jpg'},
//     { id: 'brushed-nickel', name: 'Brushed Nickel', color: '#C0C0C0', modelPath: '565/Handle Finishs/Brushed Nickel.jpg' },
//     { id: 'satin-nickel', name: 'satin-nickel', color: '#352A20', modelPath: '565/Handle Finishs/Satin Nickel.jpg'},
//   ],
//   legOptions: [
//     {id: 'leg-a', name: 'Leg A', image: 'ICONS/leg A.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg A.glb'},
//     {id: 'leg-b', name: 'Leg B', image: 'ICONS/Leg B.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg B.glb'},
//     {id: 'leg-c', name: 'Leg C', image: 'ICONS/Leg C.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg C.glb'},
//     {id: 'leg-d', name: 'Leg D', image: 'ICONS/Leg D.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg D.glb'}
//   ]
// };


// // Loading indicator component
// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress.toFixed(0)} % loaded</Html>;
// }

// const ARViewer = () => {
//   const location = useLocation();
//   const [modelConfig, setModelConfig] = useState(null);
//   const [arSupported, setARSupported] = useState(false);

//   useEffect(() => {
//     // Check if AR is supported
//     if ('xr' in navigator) {
//       navigator.xr.isSessionSupported('immersive-ar')
//         .then(supported => setARSupported(supported))
//         .catch(err => {
//           console.error('Error checking AR support:', err);
//           setARSupported(false);
//         });
//     } else {
//       setARSupported(false);
//     }

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

//   // if (!arSupported) {
//   //   return (
//   //     <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center' }}>
//   //       <h2>AR Not Supported</h2>
//   //       <p>Your device or browser does not support WebXR or AR features.</p>
//   //       <p>Please try with a compatible device or browser.</p>
//   //       <a href="/" style={{ marginTop: '20px', padding: '10px 20px', background: '#4a90e2', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
//   //         Return to Configurator
//   //       </a>
//   //     </div>
//   //   );
//   // }

//   const { furnitureId, woodFinishId, handleTypeId, handleFinishId, legOptionId } = modelConfig;

//   // Fetch the detailed options from the config
 
//   const furniture =options.furnitureOptions.find(f => f.id === furnitureId);
//   const woodFinish = options.woodFinishOptions.find(w => w.id === woodFinishId);
//   const handleType = options.handleOptions.find(h => h.id === handleTypeId);
//   const handleFinish = options.handleFinishOptions.find(hf => hf.id === handleFinishId);
//   const legOption=options.legOptions.find(l => l.id === legOptionId);

//   // Generate model paths
//   const furnitureModelPath = furniture?.modelPath;
//   const handleModelPath = handleType?.modelPathTemplate?.replace(/{furnitureId}/g, furniture.id);
//   const legModelPath = legOption?.modelPathTemplate?.replace(/{furnitureId}/g, furniture.id);

//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <Canvas
//         camera={{ position: [0, 0, 5], fov: 45 }}
//         style={{ background: 'transparent' }}
//         gl={{ alpha: true }}
//         onCreated={({ gl }) => {
//           gl.setSize(window.innerWidth, window.innerHeight);
//           gl.setClearColor(0x000000, 0);
//         }}
//         // XR related props
//         vr={{ enabled: true }}
//         onContextMenu={(e) => e.preventDefault()}
//       >
//         <Suspense fallback={<Loader />}>
//           <ambientLight intensity={0.8} />
//           <directionalLight position={[5, 5, 5]} intensity={1} />
//           <hemisphereLight intensity={0.4} />

//           {furnitureModelPath && (
//             <FurnitureModel
//               modelPath={furnitureModelPath}
//               woodFinish={woodFinish}
//               selectedSize={furniture.name}
//               furnitureOptions={options.furnitureOptions}
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
//               furnitureOptions={options.furnitureOptions}
//               flipVertical={true}
//             />
//           )}
//         </Suspense>
//       </Canvas>
      
//       {/* AR Instructions Overlay */}
//       <div style={{
//         position: 'absolute',
//         bottom: 20,
//         left: 0,
//         right: 0,
//         textAlign: 'center',
//         padding: '10px',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         color: 'white'
//       }}>
//         <p>Tap and place furniture in your space</p>
//         <p>Pinch to resize • Two fingers to rotate</p>
//       </div>
//     </div>
//   );
// };

// export default ARViewer;