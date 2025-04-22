//SECTION 1: COMPONENT SETUP AND STATE MANAGEMENT
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import html2canvas from 'html2canvas';
import { QRCodeSVG as QRCode } from 'qrcode.react'; // Named export with alias
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>



import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import ARViewer from './ARViewer'; 



import './App.css';
import ModelViewer from './ModelViewer';




// Custom icon components
const ViewInYourRoom = () => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
    <span className="text-sm font-medium">View in your room</span>
  </div>
);

// Usage example:
// <ViewInYourRoom />

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
    <circle cx="12" cy="12" r="4"></circle>
    <line x1="8" y1="6" x2="8" y2="2"></line>
    <line x1="16" y1="6" x2="16" y2="2"></line>
  </svg>
);

const RotateCcwIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v6h6"></path>
    <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
  </svg>
);

const MaximizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
    <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
    <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
    <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);


function App() {
  // State variables
  const [selectedSize, setSelectedSize] = useState('Single Drawer');
  const [woodFinish, setWoodFinish] = useState('Cafelle');
  const [handleType, setHandleType] = useState('handle-1');
  const [handleFinish, setHandleFinish] = useState('Antique English');
  const [legOption, setLegOption] = useState('Leg A');
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const [showWoodFinishOptions, setShowWoodFinishOptions] = useState(false);
  const [showHandleOptions, setShowHandleOptions] = useState(false);
  const [showHandleFinishOptions, setShowHandleFinishOptions] = useState(false);
  const [showLegOptions, setShowLegOptions] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const[arUrl, setArUrl]= useState("");


  
  
  // References for 3D viewer
  const viewerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const currentModelRef = useRef(null);
  const handleModelRef = useRef(null); // Reference for handle model
  const legModelRef = useRef(null);
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  
  // GLB model paths for furniture options with image thumbnails
  const furnitureOptions = [
    { id: '565-01', name: 'Single Drawer', image:'ICONS/565-01.png.png', modelPath: '565/565-01/565-01.glb' },
    { id: '565-02', name: 'Three Drawer', image:'ICONS/565-02.png.png' , modelPath: '565/565-02/565-02.glb' },
    // { id: '565-04', name: 'Chest', image: "/api/placeholder/80/80", modelPath: '565/565-03/565-04.glb' },
    { id: '565-04', name: 'Single Wardrobe', image: 'ICONS/565-04.png.png', modelPath: '565/565-04/565-04.glb' },
    { id: '565-05', name: 'Double Wardrobe', image: 'ICONS/565-05.png.png', modelPath: '565/565-05/565-05.glb' },
    { id: '565-06', name: 'Footboard', image: "/api/placeholder/80/80", modelPath: '565/565-06/565-06.glb' },
    // { id: 'headboard', name: 'Headboard', image: "/api/placeholder/80/80", modelPath: 'models/headboard.glb' },
  ];
  
  // Updated wood finish options with dynamic texture path templates
  const woodFinishOptions = [
    { id: 'cafelle', name: 'Cafelle', color: '#362617', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Cafelle.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'amber', name: 'Amber', color: '#8B5A2B', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Amber.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'bitmore', name: 'Bitmore', color: '#4A2511', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Bitmore.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'brighton', name: 'Brighton', color: '#352315', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Brighton.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'cocoballa', name: 'Cocoballa', color: '#3D2B1F', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Cocoballa.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'columbian', name: 'Columbian', color: '#4F3222', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Columbian.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'empire', name: 'Empire', color: '#462913', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Empire.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'fonthill', name: 'Fonthill', color: '#A16C38', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Fonthill.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'macadamia', name: 'Macadamia', color: '#9C8E7B', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Macadamia Nut.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'naturalash', name: 'Natural Ash', color: '#E5D7B7', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Natural Ash.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'reya', name: 'Reya', color: '#5B5B40', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Raya.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'rivercherry', name: 'River Cherry', color: '#B68E5B', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/River Cherry.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'studioteak', name: 'Studio Teak', color: '#6A6D56', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Studio Teak.png', 
      roughnessTexturePathTemplate:'565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'whitecypress', name: 'White Cypress', color: '#D3C9B6', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/White Cypress.png', 
      roughnessTexturePathTemplate:'565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'williamsburg', name: 'Williamsburg', color: '#4D2C19', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Williamsburg.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png' },
    { id: 'windsor', name: 'Windsor', color: '#95432F', 
      texturePathTemplate: '565/{furnitureId}/Varients/WOOD LAMINATE FINISHES/Windsor.png', 
      roughnessTexturePathTemplate: '565/565-01/565-01/Varients/565 Single Drawer Roughness.png'},
  ];

  const handleOptions = [
    { id: 'handle-1', name: 'Handle 1', image: 'ICONS/handle_1.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 1.glb' },
    { id: 'handle-2', name: 'Handle 2', image: 'ICONS/handle_2.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 2.glb' },
    { id: 'handle-3', name: 'Handle 3', image: "ICONS/handle_3.jpg", modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 3.glb' },
    { id: 'handle-4', name: 'Handle 4', image: 'ICONS/handle_4.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 4.glb' },
    { id: 'handle-5', name: 'Handle 5', image: 'ICONS/handle_5.jpg', modelPathTemplate: '565/{furnitureId}/Handle/{furnitureId} Hardware 5.glb' },
  ];

  const handleFinishOptions = [
    { id: 'antique-english', name: 'Antique English', color: '#704214', modelPath: '565/Handle Finishs/Antique English.jpg'},
    { id: 'brushed-nickel', name: 'Brushed Nickel', color: '#C0C0C0', modelPath: '565/Handle Finishs/Brushed Nickel.jpg' },
    { id: 'satin-nickel', name: 'satin-nickel', color: '#352A20', modelPath: '565/Handle Finishs/Satin Nickel.jpg'},
   
  ];

  const legOptions = [
    {id: 'leg-a', name: 'Leg A', image: 'ICONS/leg A.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg A.glb'},
    {id: 'leg-b', name: 'Leg B', image: 'ICONS/Leg B.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg B.glb'},
    {id: 'leg-c', name: 'Leg C', image: 'ICONS/Leg C.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg C.glb'},
    {id: 'leg-d', name: 'Leg D', image: 'ICONS/Leg D.png.png', modelPathTemplate: '565/{furnitureId}/Leg Options/Leg D.glb'}
  ];

///SECTION 2: CORE 3D FUNCTIONALITY - INITIALIZATION, LOADING, AND TEXTURE APPLICATION
  // Initialize 3D scene
  useEffect(() => {
    if (!viewerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      viewerRef.current.clientWidth / viewerRef.current.clientHeight, 
      0.1, 
      1000
    );
    
    camera.position.z = 1.2;
    camera.position.y = 1.2;
    camera.position.x = 1.2;
    // camera.lookAt(0, 6, 0);
    cameraRef.current = camera;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer:true });
    renderer.setSize(viewerRef.current.clientWidth, viewerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    viewerRef.current.innerHTML = '';
    viewerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target0.y=0.5
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = false;
    controlsRef.current = controls;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!viewerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = viewerRef.current.clientWidth / viewerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(viewerRef.current.clientWidth, viewerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && rendererRef.current.domElement) {
        viewerRef.current?.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Function to generate actual texture paths from templates
  const getTexturePaths = (textureOption) => {
    // Find the selected furniture option
    const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
    if (!selectedFurniture) return { texturePath: '', roughnessPath: '' };

    const furnitureId = selectedFurniture.id;
    const furnitureSize = selectedSize.replace(' ', '%20'); // Handle spaces in the size name

    // Replace placeholders in template paths
    const texturePath = textureOption.texturePathTemplate
      .replace(/{furnitureId}/g, furnitureId)
      .replace(/{furnitureSize}/g, furnitureSize);
    
    const roughnessPath = textureOption.roughnessTexturePathTemplate
      .replace(/{furnitureId}/g, furnitureId)
      .replace(/{furnitureSize}/g, furnitureSize);

    return { texturePath, roughnessPath };
  };

  // Updated function to apply wood texture to model
  const applyWoodTexture = (model, textureOption) => {
    return new Promise((resolve) => {
      if (!model) {
        resolve();
        return;
      }
  
      const { texturePath, roughnessPath } = getTexturePaths(textureOption);
  
      if (!texturePath || !roughnessPath) {
        console.error('Invalid texture paths generated');
        model.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(textureOption.color);
          }
        });
        resolve();
        return;
      }

      
  
      // Load the main texture
      textureLoaderRef.current.load(
        texturePath,
        (texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.flipY = false;
          texture.repeat.set(1, 1);
  
          // Load the roughness texture
          textureLoaderRef.current.load(
            roughnessPath,
            (roughnessTexture) => {
              roughnessTexture.wrapS = THREE.RepeatWrapping;
              roughnessTexture.wrapT = THREE.RepeatWrapping;
              roughnessTexture.flipY = false;
              roughnessTexture.repeat.set(1, 1);
  
              model.traverse((object) => {
                if (object.isMesh) {
                  const newMaterial = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughnessMap: roughnessTexture,
                    color: new THREE.Color(textureOption.color),
                    roughness: 0.7,
                    metalness: 0.1,
                  });
                  object.material = newMaterial;
                }
              });
  
              resolve();
            },
            undefined,
            (error) => {
              console.error(`Error loading roughness texture from ${roughnessPath}:`, error);
              // Fall back to just main texture
              model.traverse((object) => {
                if (object.isMesh) {
                  const newMaterial = new THREE.MeshStandardMaterial({
                    map: texture,
                    color: new THREE.Color(textureOption.color),
                    roughness: 0.7,
                    metalness: 0.1,
                  });
                  object.material = newMaterial;
                }
              });
              resolve();
            }
          );
        },
        undefined,
        (error) => {
          console.error(`Error loading texture from ${texturePath}:`, error);
          // Fallback to color only
          model.traverse((object) => {
            if (object.isMesh) {
              object.material.color.set(textureOption.color);
            }
          });
          resolve();
        }
      );
    });
  };
  
//  const generateARQRCode = () => {
//   const baseUrl = window.location.origin;
//   const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
  
//   if (!selectedFurniture) {
//     console.error("No furniture selected");
//     return null;
//   }
  
//   // Create URL with parameters for the selected configuration
//   const arViewerUrl = `${baseUrl}/ar-viewer?` + 
//     `modelId=${encodeURIComponent(selectedFurniture.id)}` +
//     `&woodFinish=${encodeURIComponent(woodFinish)}` +
//     `&handleType=${encodeURIComponent(handleType)}` +
//     `&handleFinish=${encodeURIComponent(handleFinish)}` +
//     `&legOption=${encodeURIComponent(legOption)}`;
  
//   return (
//     <div className="qr-code-container">
//       <h3>Scan to View in AR</h3>
//       <QRCode value={arViewerUrl} size={200} level="H" includeMargin={true} />
//       <p>Scan with your mobile device to view in AR</p>
//       <button 
//         className="ar-direct-link"
//         onClick={() => window.open(arViewerUrl, '_blank')}
//       >
//         Open AR viewer directly
//       </button>
//       <p className="qr-info">Configuration details will be transferred to the AR view</p>
//     </div>
//   );
// };

const generateARQRCode = async () => {
  console.log("hello hello");
  const baseUrl = window.location.origin;

  const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
  if (!selectedFurniture) {
    console.error("No furniture selected");
    return null;
  }

  // 1. Export current scene (main model + handle + leg) as a single GLB
  const exporter = new GLTFExporter();
  const root = new THREE.Group();
  if (currentModelRef.current) root.add(currentModelRef.current.clone());
  if (handleModelRef.current) root.add(handleModelRef.current.clone());
  if (legModelRef.current) root.add(legModelRef.current.clone());

  return new Promise((resolve, reject) => {
    exporter.parse(
      root,
      (result) => {
        const glbBlob = new Blob([result], { type: 'model/gltf-binary' });

        // 2. Create Blob URL
        const blobUrl = URL.createObjectURL(glbBlob);
        console.log("blob url: ",blobUrl);
        
        // Create a download link and click it
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = 'model.glb'; // filename for download
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          // Optional: revoke the object URL later to free memory
          // URL.revokeObjectURL(blobUrl);




    
        // `&modelId=${encodeURIComponent(selectedFurniture.id)}` +
        // `&woodFinish=${encodeURIComponent(woodFinish)}` +
        // `&handleType=${encodeURIComponent(handleType)}` +
        // `&handleFinish=${encodeURIComponent(handleFinish)}` +
        // `&legOption=${encodeURIComponent(legOption)}`;

        // 3. Use blob URL in QR temporarily (for same-session use only)
        const arViewerUrl = `${baseUrl}/ar-viewer?blobUrl=${encodeURIComponent(blobUrl)}`;
        setArUrl(arViewerUrl);     // Set for QR
        console.log("url",arViewerUrl);
      setShowQR(true);
      },
      (error) => {
        console.error("GLB export failed", error);
        reject(error);
      },
      { binary: true }
    );
  });
};
  
  
  
  const loadAndPositionHandle = (handleOption) => {
    return new Promise((resolve, reject) => {
      const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
      const furnitureId = selectedFurniture ? selectedFurniture.id : 'single-drawer';
  
      const modelPath = handleOption.modelPathTemplate.replace(/{furnitureId}/g, furnitureId);
  
      if (!modelPath) {
        console.error("Model path is undefined.");
        reject(new Error("Model path could not be generated."));
        return;
      }
  
      console.log(`Loading handle model: ${modelPath} for furniture ID: ${furnitureId}`);
  
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          const handleModel = gltf.scene;
  
          const selectedHandleFinish = handleFinish && handleFinishOptions.find(option => option.name === handleFinish);
          if (selectedHandleFinish) {
            handleModel.traverse((object) => {
              if (object.isMesh) {
                object.material = new THREE.MeshStandardMaterial({
                  color: new THREE.Color(selectedHandleFinish.color),
                  metalness: 0.8,
                  roughness: 0.2,
                });
              }
            });
          }
  
          handleModelRef.current = handleModel;
          resolve(handleModel);
        },
        undefined,
        (error) => {
          console.error(`Error loading handle model from path ${modelPath}:`, error);
          reject(error);
        }
      );
    });
  };
  

  // Function to load and position leg - UPDATED
  const loadAndPositionLeg = (legOption) => {
    return new Promise((resolve, reject) => {
      // Get the current furniture ID based on selected size
      const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
      if (!selectedFurniture) {
        console.error(`Couldn't find furniture option for size: ${selectedSize}`);
        reject(new Error("Selected furniture not found"));
        return;
      }
      
      const furnitureId = selectedFurniture.id;
      const modelPath = legOption.modelPathTemplate.replace(/{furnitureId}/g, furnitureId);
      
      console.log(`Loading leg model: ${modelPath}`);
  
      const loader = new GLTFLoader();
      loader.load(
        modelPath,
        (gltf) => {
          const legModel = gltf.scene;
          
          // Apply the same wood finish to leg as main model
          const selectedWoodFinish = woodFinishOptions.find(option => option.name === woodFinish);
          if (selectedWoodFinish) {
            applyWoodTexture(legModel, selectedWoodFinish)
              .then(() => {
                console.log(`Applied wood finish to leg model`);
              });
          }
  
          // Store the loaded leg model
          legModelRef.current = legModel;
          console.log('Leg model loaded successfully');
          resolve(legModel);
        },
        (xhr) => {
          console.log(`${modelPath} loading: ${(xhr.loaded / xhr.total * 100).toFixed(0)}%`);
        },
        (error) => {
          console.error(`Error loading leg model from ${modelPath}:`, error);
          reject(error);
        }
      );
    });
  };

  // Load model when size changes
  useEffect(() => {
    if (!sceneRef.current) return;
  
    // Find the selected furniture option
    const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
    if (!selectedFurniture) return;
  
    const loader = new GLTFLoader();
    loader.load(
      selectedFurniture.modelPath,
      (gltf) => {
        // Remove previous model and handle and leg
        if (currentModelRef.current) {
          sceneRef.current.remove(currentModelRef.current);
        }
  
        if (handleModelRef.current) {
          sceneRef.current.remove(handleModelRef.current);
        }
        
        if (legModelRef.current) {
          sceneRef.current.remove(legModelRef.current);
          legModelRef.current = null;
        }
  
        const model = gltf.scene;
  
        // Add to scene first
        sceneRef.current.add(model);
        currentModelRef.current = model;
  
        // Reset camera position
        if (cameraRef.current) {
          cameraRef.current.position.z = 5;
        }
  
        // Reset controls
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
  
        // Apply the current wood finish texture to the newly loaded model
        const selectedWoodFinish = woodFinishOptions.find(option => option.name === woodFinish);
        if (selectedWoodFinish) {
          applyWoodTexture(model, selectedWoodFinish);
        }
  
        // Load and add handle based on current handle type selection
        const selectedHandleOption = handleOptions.find(option => option.name === handleType);
        if (selectedHandleOption) {
          loadAndPositionHandle(selectedHandleOption)
            .then(handleModel => {
              // Add handle to scene
              sceneRef.current.remove(handleModelRef.current);
                handleModelRef.current = handleModel;
              sceneRef.current.add(handleModel);
              console.log('handle model added to the scene');
            })
            .catch(error => {
              console.error("Failed to load handle:", error);
            });
        }
        else{
          console.log('error');
        }
        
        // Load and add leg based on current leg selection
        const selectedLegOption = legOptions.find(option => option.name === legOption);
        if (selectedLegOption) {
          loadAndPositionLeg(selectedLegOption)
            .then(legModel => {
              // Add leg to scene
             
              if (sceneRef.current) {
                sceneRef.current.remove(legModelRef.current);
                legModelRef.current = legModel;
                sceneRef.current.add(legModel);
                console.log('Leg model added to scene');
              }
            })
            .catch(error => {
              console.error("Failed to load leg:", error);
            });
        }
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }, [selectedSize]);
  
  // Apply wood finish texture when it changes
  useEffect(() => {
    if (!sceneRef.current || !currentModelRef.current) return;
  
    const selectedWoodFinish = woodFinishOptions.find(option => option.name === woodFinish);
    if (selectedWoodFinish && currentModelRef.current) {
      applyWoodTexture(currentModelRef.current, selectedWoodFinish)
        .then(() => {
          console.log(`Applied ${woodFinish} texture to model`);
        });
    }
  }, [woodFinish]);

  useEffect(() => {
    if (!legModelRef.current) return;
    
    const selectedWoodFinish = woodFinishOptions.find(option => option.name === woodFinish);
    if (selectedWoodFinish) {
      applyWoodTexture(legModelRef.current, selectedWoodFinish);
    }
  }, [woodFinish]);
  
  // Update handle when handle type or finish changes
  useEffect(() => {
    if (!sceneRef.current || !currentModelRef.current) return;
  
    // Remove current handle if it exists
    if (handleModelRef.current) {
      sceneRef.current.remove(handleModelRef.current);
    }
  
   
    // Find current furniture ID
    const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
    if (!selectedFurniture) return;

  
    // Load and add new handle
    const selectedHandleOption = handleOptions.find(option => option.id === handleType);
    if (selectedHandleOption) {
      loadAndPositionHandle(selectedHandleOption)
        .then(handleModel => {
          // Add handle to scene
          sceneRef.current.add(handleModel);
        })
        .catch(error => {
          console.error("Failed to load handle:", error);
        });
    }
  }, [handleType, handleFinish, selectedSize]);



  // Update leg when leg option changes - UPDATED
  useEffect(() => {
    if (!sceneRef.current || !currentModelRef.current) return;
  
    console.log(`Leg option changed to: ${legOption}`); // Add debug logging

   
  
    // Remove current leg if it exists
    if (legModelRef.current) {
      sceneRef.current.remove(legModelRef.current);
      legModelRef.current = null;
      console.log('removed');
    }

   
   
  
    // Find current furniture ID
    const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);

   
    

    if (!selectedFurniture) return;

 
    // Load and add new leg
   // Load and add new leg
const selectedLegOption = legOptions.find(option => option.name === legOption);
if (selectedLegOption) {
  console.log(`Selected leg option: ${selectedLegOption.name}, loading model...`);
  loadAndPositionLeg(selectedLegOption)
    .then(legModel => {
      // Update the reference first
      legModelRef.current = legModel;
      
      // Then add leg to scene
      sceneRef.current.add(legModel);
      console.log(`Added leg model ${selectedLegOption.name} to scene`);
    })
    .catch(error => {
      console.error("Failed to load leg:", error);
    });
}
  }, [legOption, selectedSize]);
  
  // Reset camera view
  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };
  
  // Zoom in
  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z *= 0.8;
    }
  };
  
  // Full screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting full screen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const takeScreenshot = () => {
      console.log(viewerRef.current.children[0])
      html2canvas(viewerRef.current.children[0]).then(canvas => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = `${selectedSize}-${woodFinish}-${handleType}.png`;
        link.click();
      })
  };
  
//SECTION 3: UI CONTROLS AND RENDERING
  //Function to toggle size options visibility
  const toggleSizeOptions = () => {
    setShowSizeOptions(!showSizeOptions);
    // Close other dropdowns
    if (showWoodFinishOptions) setShowWoodFinishOptions(false);
    if (showHandleOptions) setShowHandleOptions(false);
    if (showHandleFinishOptions) setShowHandleFinishOptions(false);
  };
  
  // Function to toggle wood finish options visibility
  const toggleWoodFinishOptions = () => {
    setShowWoodFinishOptions(!showWoodFinishOptions);
    // Close other dropdowns
    if (showSizeOptions) setShowSizeOptions(false);
    if (showHandleOptions) setShowHandleOptions(false);
    if (showHandleFinishOptions) setShowHandleFinishOptions(false);
  };
  
  // Function to toggle handle options visibility
  const toggleHandleOptions = () => {
    setShowHandleOptions(!showHandleOptions);
    // Close other dropdowns
    if (showSizeOptions) setShowSizeOptions(false);
    if (showWoodFinishOptions) setShowWoodFinishOptions(false);
    if (showHandleFinishOptions) setShowHandleFinishOptions(false);
  };
  
  // Function to toggle handle finish options visibility
  const toggleHandleFinishOptions = () => {
    setShowHandleFinishOptions(!showHandleFinishOptions);
    // Close other dropdowns
    if (showSizeOptions) setShowSizeOptions(false);
    if (showWoodFinishOptions) setShowWoodFinishOptions(false);
    if (showHandleOptions) setShowHandleOptions(false);
  };

  const toggleLegOptions = () => {
    setShowLegOptions(!showLegOptions);
    // Close other dropdowns
    if (showSizeOptions) setShowSizeOptions(false);
    if (showWoodFinishOptions) setShowWoodFinishOptions(false);
    if (showHandleOptions) setShowHandleOptions(false);
    if (showHandleFinishOptions) setShowHandleFinishOptions(false);
  };
  
  // Function to select size
  const selectSize = (sizeName) => {
    setSelectedSize(sizeName);
    setShowSizeOptions(false);
  };
  
  // Function to select wood finish
  const selectWoodFinish = (finishName) => {
    setWoodFinish(finishName);
    setShowWoodFinishOptions(false);
  };

  // Function to select handle type
  const selectHandleType = (typeName) => {
    setHandleType(typeName);
    setShowHandleOptions(false);
  };
  
  // Function to select handle finish
  const selectHandleFinish = (finishName) => {
    setHandleFinish(finishName);
    setShowHandleFinishOptions(false);
  };

  const selectLegOption = (legName) => {
    setLegOption(legName);
    setShowLegOptions(false);
  };

  // Function to get dynamic wood texture path for thumbnails in UI
  const getWoodTextureThumbnailPath = (textureOption) => {
    const selectedFurniture = furnitureOptions.find(option => option.name === selectedSize);
    const furnitureId = selectedFurniture ? selectedFurniture.id : '565-01';
    
    return textureOption.texturePathTemplate.replace(/{furnitureId}/g, furnitureId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="header">
              <h1>3D Product Configurator</h1>
              <p>
                Real-time 3D customization that brings furniture to life—change colors, materials, and features with ease.
              </p>
            </div>
            
            <div className="content-wrapper">
              {/* Left side - 3D Viewer */}
              <div className="viewer-container">
                <div className="viewer" ref={viewerRef}>
                </div>
                <div className="control-buttons">
                  <button className="control-btn" onClick={resetView}>
                    <RotateCcwIcon />
                  </button>
                  <button className="control-btn" onClick={zoomIn}>
                    <ZoomInIcon />
                  </button>
                  <button className="control-btn" onClick={toggleFullScreen}>
                    <MaximizeIcon />
                  </button>
                  <button className="control-btn" onClick={takeScreenshot}>
                    <CameraIcon />
                  </button>
                  <button className="ar-view-btn" onClick={generateARQRCode}>
                    <ViewInYourRoom />
                  </button>
                </div>
              </div>
              
              {/* Right side - Configuration Options */}
              <div className="config-container">
                <div className="config-panel">
                  <div className="ancestry-section">
                    <h2>ANCESTRY</h2>
                    <p>
                      With Ancestry Collection the best from generation to generation is carried forward.
                    </p>
                  </div>
                  
                  {/* Size Selection Dropdown */}
                  <div className="selection-row">
                    <div className="selection-content" onClick={toggleSizeOptions}>
                      <div className="selection-preview">
                        <div className="thumbnail-container">
                          <img 
                            src={furnitureOptions.find(option => option.name === selectedSize)?.image}
                            alt={selectedSize}
                            className="option-thumbnail"
                          />
                        </div>
                        <div>
                          <h3>Select Size</h3>
                          <p className="selected-option">{selectedSize}</p>
                        </div>
                      </div>
                      <button className={`dropdown-arrow ${showSizeOptions ? 'open' : ''}`}>
                        <ChevronDownIcon />
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded Size Options */}
                  {showSizeOptions && (
                    <div className="expanded-options size-options">
                      {furnitureOptions.map((option) => (
                        <div 
                          key={option.id}
                          className={`size-option ${selectedSize === option.name ? 'selected' : ''}`}
                          onClick={() => selectSize(option.name)}
                        >
                          <div className="option-thumbnail-container">
                            <img 
                              src={option.image}
                              alt={option.name}
                              className={`option-thumbnail ${selectedSize === option.name ? 'selected-thumbnail' : ''}`}
                            />
                          </div>
                          <p>{option.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Wood Finish Selection */}
                  <div className="selection-row">
                    <div className="selection-content" onClick={toggleWoodFinishOptions}>
                      <div className="selection-preview">
                        <div 
                          className="wood-swatch" 
                          style={{ 
                            backgroundColor: woodFinishOptions.find(option => option.name === woodFinish)?.color,
                            backgroundImage: `url(${woodFinishOptions.find(option => option.name === woodFinish)?.texturePath})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '2px solid #fff',
                            boxShadow: '0 0 0 1px #ccc'
                          }}
                        ></div>
                        <div>
                          <h3>Select Wood Finish</h3>
                          <p className="selected-option">{woodFinish}</p>
                        </div>
                      </div>
                      <button className={`dropdown-arrow ${showWoodFinishOptions ? 'open' : ''}`}>
                        <ChevronDownIcon />
                      </button>
                    </div>
                  </div> 
  
                  {/* Wood Finish Color Swatches Grid when dropdown is open */}
                  {showWoodFinishOptions && (
                    <div className="expanded-options">
                      <div className="product-label">
                        <h3>Ancestry {selectedSize}</h3>
                        <div className="separator-line"></div> 
                      </div>
                      <div className="wood-finish-grid">
                        {woodFinishOptions.map((option) => (
                          <div 
                            key={option.id}
                            className="wood-finish-item"
                            onClick={() => selectWoodFinish(option.name)}>
                            <div 
                              className={`wood-circle-swatch ${woodFinish === option.name ? 'selected-swatch' : ''}`}
                              style={{ 
                                backgroundImage: `url(${getWoodTextureThumbnailPath(option)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: option.color,
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: woodFinish === option.name ? '3px solid #333' : '1px solid #ccc',
                                boxShadow: woodFinish === option.name ? '0 0 0 2px #fff' : 'none',
                                margin: '0 auto 5px auto'
                              }}
                            />
                            <p className="wood-name">{option.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="selection-row">
                    <div className="selection-content" onClick={toggleHandleOptions}>
                      <div className="selection-preview">
                        <div className="thumbnail-container">
                          <img 
                            src={handleOptions.find(option => option.id === handleType)?.image || "/api/placeholder/40/40"} 
                            alt="Handle preview" 
                            className="option-thumbnail"
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }} 
                          />
                        </div>
                        <div>
                          <h3>Select Handle Type</h3>
                          <p className="selected-option">{handleType}</p>
                        </div>
                      </div>
                      <button className={`dropdown-arrow ${showHandleOptions ? 'open' : ''}`}>
                        <ChevronDownIcon />
                      </button>
                    </div>
                  </div>
  
                  {/* Expanded Handle Options */}
                  {showHandleOptions && (
                    <div className="expanded-options size-options">
                      {handleOptions.map((option) => (
                        <div 
                          key={option.id}
                          className={`size-option ${handleType === option.id ? 'selected' : ''}`}
                          onClick={() => selectHandleType(option.id)}
                        >
                          <div className="option-thumbnail-container">
                            <img 
                              src={option.image}
                              alt={option.name}
                              className={`option-thumbnail ${handleType === option.id ? 'selected-thumbnail' : ''}`}
                              style={{ 
                                width: '40px', 
                                height: '40px', 
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          </div>
                          <p>{option.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
  
                  {/* Handle Finish Selection */}
                  <div className="selection-row">
                    <div className="selection-content" onClick={toggleHandleFinishOptions}>
                      <div className="selection-preview">
                        <div 
                          className="handle-swatch" 
                          style={{ 
                            backgroundColor: handleFinishOptions.find(option => option.name === handleFinish)?.color,
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: '2px solid #fff',
                            boxShadow: '0 0 0 1px #ccc'
                          }}
                        ></div>
                        <div>
                          <h3>Select Handle Finish</h3>
                          <p className="selected-option">{handleFinish}</p>
                        </div>
                      </div>
                      <button className={`dropdown-arrow ${showHandleFinishOptions ? 'open' : ''}`}>
                        <ChevronDownIcon />
                      </button>
                    </div>
                  </div>
  
                  {/* Handle Finish Options Grid when dropdown is open */}
                  {showHandleFinishOptions && (
                    <div className="expanded-options">
                      <div className="product-label">
                        <div className="separator-line"></div> 
                      </div>
                      <div className="handle-finish-grid">
                        {handleFinishOptions.map((option) => (
                          <div 
                            key={option.id}
                            className="handle-finish-item"
                            onClick={() => selectHandleFinish(option.name)}>
                            <div 
                              className={`handle-circle-swatch ${handleFinish === option.name ? 'selected-swatch' : ''}`}
                              style={{ 
                                backgroundColor: option.color,
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: handleFinish === option.name ? '3px solid #333' : '1px solid #ccc',
                                boxShadow: handleFinish === option.name ? '0 0 0 2px #fff' : 'none',
                                margin: '0 auto 5px auto'
                              }}
                            />
                            <p className="handle-name">{option.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
  
                  {/* Leg Options Selection */}
                  <div className="selection-row">
                    <div className="selection-content" onClick={toggleLegOptions}>
                      <div className="selection-preview">
                        <div className="thumbnail-container">
                          <img 
                            src={legOptions.find(option => option.name === legOption)?.image || "/api/placeholder/40/40"} 
                            alt="Leg option preview" 
                            className="option-thumbnail"
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                        </div>
                        <div>
                          <h3>Select Leg Options</h3>
                          <p className="selected-option">{legOption}</p>
                        </div>
                      </div>
                      <button className={`dropdown-arrow ${showLegOptions ? 'open' : ''}`}>
                        <ChevronDownIcon />
                      </button>
                    </div>
                  </div>
  
                  {/* Expanded Leg Options */}
                  {showLegOptions && (
                    <div className="expanded-options size-options">
                      {legOptions.map((option) => (
                        <div 
                          key={option.id}
                          className={`size-option ${legOption === option.name ? 'selected' : ''}`}
                          onClick={() => selectLegOption(option.name)}
                        >
                          <div className="option-thumbnail-container">
                            <img 
                              src={option.image}
                              alt={option.name}
                              className={`option-thumbnail ${legOption === option.name ? 'selected-thumbnail' : ''}`}
                              style={{ 
                                width: '40px', 
                                height: '40px', 
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          </div>
                          <p>{option.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Price and Add to Cart */}
                  <div className="price-section">
                    <div className="price-info">
                      <h3>Product Price</h3>
                      <p>$ 0 <span className="original-price">$ 0</span></p>
                    </div>
                    <button className="add-to-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            {/* QR Code Modal */}
           
            {showQR && arUrl && (
  <div className="qr-modal">
    <div className="qr-popup">
      <button className="qr-close" onClick={() => setShowQR(false)}>×</button>

      <div className="qr-code-wrapper">
        <QRCode
          value={arUrl}
          size={300}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          includeMargin={true}
        />
      </div>

      <p>Scan this QR code to view your configured furniture in AR.</p>
    </div>
  </div>
)}

          </div>
        } />
        <Route path="/ar-viewer" element={<ModelViewer  blobUrl={arUrl} />} />
      </Routes>
    </Router>
  );
      }
      export default App;

