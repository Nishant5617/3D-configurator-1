// import React, { useEffect } from "react";

// const ModelViewer = ({
//   blobUrl
// }) => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src =
//       "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
//     document.head.appendChild(script);
//   }, []);
// console.log("hello"+blobUrl);
//   return (
//     <model-viewer
//     //   alt={alt}
//       src={blobUrl}
//     //   src="/565/565-01/565-01/565-01.glb"
//       ar
//       environment-image="/565/flamingo_pan_1k.hdr"
//       shadow-intensity="1"
//       camera-controls
//       touch-action="pan-y"
//       style={{ width: "100%", height: "500px" }}
//     >
//       <button
//         slot="ar-button"
//         style={{
//             backgroundColor: "white",
//             borderRadius: "4px",
//             border: "none",
//             position: "absolute",
//             top: "16px",
//             right: "16px",
//         }}
//       >
//         👋 Activate AR
//       </button>
//     </model-viewer>
//   );
// };

// export default ModelViewer;
// import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// const ModelViewer = () => {
//   const [searchParams] = useSearchParams()
  
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src =
//       "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
//     document.head.appendChild(script);
//   }, []);
  

//   // Allow src from blobUrl prop or query parameters
//   const blobUrlParam = searchParams.get("blobUrl");
//   const src = blobUrlParam


//   return (
//     <model-viewer
//       src={src}
//       ar
//       environment-image="/565/flamingo_pan_1k.hdr"
//       shadow-intensity="1"
//       camera-controls
//       touch-action="pan-y"
//       style={{ width: "100%", height: "500px" }}
//     >
//       <button
//         slot="ar-button"
//         style={{
//           backgroundColor: "white",
//           borderRadius: "4px",
//           border: "none",
//           position: "absolute",
//           top: "16px",
//           right: "16px",
//         }}
//       >
//         👋 Activate AR
//       </button>
//     </model-viewer>
//   );
// };

// export default ModelViewer;

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

const ModelViewer = () => {
  const [searchParams] = useSearchParams();
  const [modelUrl, setModelUrl] = useState(null);

  const viewerRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const modelId = searchParams.get("modelId");
    const woodFinish = searchParams.get("woodFinish");
    const handleType = searchParams.get("handleType");
    const handleFinish = searchParams.get("handleFinish");
    const legOption = searchParams.get("legOption");
console.log(modelId)
    if (!modelId || !woodFinish || !handleType || !handleFinish || !legOption) return;

    const scene = new THREE.Scene();
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    const group = new THREE.Group();

    const loadGLB = (path) => new Promise((resolve, reject) => {
      loader.load(path, (gltf) => resolve(gltf.scene), undefined, reject);
    });

    const applyWoodTexture = async (model, furnitureId) => {
      const texturePath = `565/${furnitureId}/Varients/WOOD LAMINATE FINISHES/${woodFinish}.png`;
      const roughnessPath = `565/565-01/Varients/565 Single Drawer Roughness.png`;
      
      const texture = await textureLoader.loadAsync(texturePath);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.flipY = false;
      debugger
    //   const roughness = await textureLoader.loadAsync(roughnessPath);
    //   roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
    //   roughness.flipY = false;

      model.traverse((obj) => {
        if (obj.isMesh) {
          obj.material = new THREE.MeshStandardMaterial({
            map: texture,
            // roughnessMap: roughness,
            roughness: 0.7,
            metalness: 0.1,
          });
        }
      });
    };

    const applyHandleFinish = (model) => {
      const finishes = {
        "Antique English": "#704214",
        "Brushed Nickel": "#C0C0C0",
        "satin-nickel": "#352A20",
      };
      const color = finishes[handleFinish] || "#aaaaaa";
      model.traverse((obj) => {
        if (obj.isMesh) {
          obj.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            metalness: 0.8,
            roughness: 0.2,
          });
        }
      });
    };

    const exportGLB = async () => {
      const furniture = await loadGLB(`565/${modelId}/${modelId}.glb`);
      
      await applyWoodTexture(furniture, modelId);
      debugger
     group.add(furniture);

      const handle = await loadGLB(`565/${modelId}/Handle/${modelId} Hardware ${handleType.split('-')[1]}.glb`);
     
      applyHandleFinish(handle);
      group.add(handle);
      
      const leg = await loadGLB(`565/${modelId}/Leg Options/${legOption}.glb`);
      await applyWoodTexture(leg, modelId);
      group.add(leg);
     
      

      const exporter = new GLTFExporter();
      exporter.parse(group, (result) => {
        const blob = new Blob([result], { type: 'model/gltf-binary' });
        const url = URL.createObjectURL(blob);
        setModelUrl(url);
      }, (err) => console.error("GLTF export error", err), { binary: true });
    };

    exportGLB();
  }, [searchParams]);

  if (!modelUrl) {
    return <p>Preparing AR model...</p>;
  }

  return (
    <model-viewer
      key={modelUrl}
      src={modelUrl}
      ar
      environment-image="/565/flamingo_pan_1k.hdr"
      shadow-intensity="1"
      camera-controls
      touch-action="pan-y"
      style={{ width: "100%", height: "500px" }}
    >
      <button
        slot="ar-button"
        style={{
          backgroundColor: "white",
          borderRadius: "4px",
          border: "none",
          position: "absolute",
          top: "16px",
          right: "16px",
        }}
      >
        👋 Activate AR
      </button>
    </model-viewer>
  );
};

export default ModelViewer;
