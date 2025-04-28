import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ModelViewer2 = () => {
  const [searchParams] = useSearchParams();
  const src = searchParams.get("glbUrl") || "";

  /* load Google <model-viewer> once */
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src  = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  /* optional fetch check */
  useEffect(() => {
    if (!src) return;
    fetch(src).then(r => {
      if (!r.ok) throw new Error(`GLB fetch failed (${r.status})`);
    }).catch(console.error);
  }, [src]);

  if (!src) return <p style={{textAlign:"center"}}>No GLB URL supplied.</p>;

  return (
    <model-viewer
      src={src}
      ar
      camera-controls
      touch-action="pan-y"
      environment-image="/565/flamingo_pan_1k.hdr"
      style={{ width: "100%", height: "100vh" }}
    >
      <button slot="ar-button"
        style={{
          position:"absolute", top:"16px", right:"16px",
          background:"#fff", border:"none", borderRadius:"4px",
          padding:"8px 12px", cursor:"pointer"
        }}>
        👋 View in your space
      </button>
    </model-viewer>
  );
};

export default ModelViewer2;