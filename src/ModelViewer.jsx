import React, { useEffect } from "react";

const ModelViewer = ({
  blobUrl
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    document.head.appendChild(script);
  }, []);
console.log("hello"+blobUrl);
  return (
    <model-viewer
    //   alt={alt}
      src={blobUrl}
    //   src="/565/565-01/565-01/565-01.glb"
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
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const ModelViewer = () => {
//   const [searchParams] = useSearchParams();
//   const [loading, setLoading] = useState(true);

//   // Get parameters from URL
//   const modelId = searchParams.get("modelId") || "565-01";
//   const woodFinish = searchParams.get("woodFinish") || "Cafelle";
//   const handleType = searchParams.get("handleType") || "handle-1";
//   const handleFinish = searchParams.get("handleFinish") || "Antique English";
//   const legOption = searchParams.get("legOption") || "Leg A";

//   // Construct dynamic model path
//   const modelPath = `/565/${modelId}/${modelId}.glb`;
  
//   useEffect(() => {
//     // Load model-viewer script
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
//     document.head.appendChild(script);
    
//     script.onload = () => {
//       setLoading(false);
//     };
    
//     return () => {
//       // Clean up if needed
//       if (document.head.contains(script)) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading AR Viewer...</div>;
//   }

//   return (
//     <div className="ar-viewer-container">
//       <div className="ar-header">
//         <h2>View in AR</h2>
//         <p>Selected model: {modelId} with {woodFinish} finish</p>
//       </div>
      
//       <model-viewer
//         alt="3D furniture model"
//         src={modelPath}
//         ar
//         ar-modes="webxr scene-viewer quick-look"
//         environment-image="/565/flamingo_pan_1k.hdr"
//         shadow-intensity="1"
//         camera-controls
//         touch-action="pan-y"
//         style={{ width: "100%", height: "80vh" }}
//       >
//         <button
//           slot="ar-button"
//           style={{
//             backgroundColor: "white",
//             borderRadius: "4px",
//             border: "none",
//             position: "absolute",
//             top: "16px",
//             right: "16px",
//             padding: "8px 12px",
//             fontSize: "14px"
//           }}
//         >
//           👋 Activate AR
//         </button>

//         <div className="ar-info" style={{
//           position: "absolute", 
//           bottom: "20px", 
//           left: "20px", 
//           background: "rgba(255,255,255,0.8)",
//           padding: "10px",
//           borderRadius: "8px"
//         }}>
//           <p>Model: {modelId}</p>
//           <p>Wood: {woodFinish}</p>
//           <p>Handle: {handleType} - {handleFinish}</p>
//           <p>Leg: {legOption}</p>
//         </div>
//       </model-viewer>
//     </div>
//   );
// };

// export default ModelViewer;