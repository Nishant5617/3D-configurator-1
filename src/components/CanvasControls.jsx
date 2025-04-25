
import React from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const CanvasControls = ({ onScreenshot, onARView, onToggleMeasurements }) => {
  const { gl, scene, camera } = useThree();
  
  // Function to handle screenshot
  const handleScreenshot = () => {
    // Render the scene
    gl.render(scene, camera);
    
    // Get the canvas element
    const canvas = gl.domElement;
    
    if (canvas) {
      // Preserve the current size
      const originalWidth = canvas.width;
      const originalHeight = canvas.height;
      
      // Create a link element
      const link = document.createElement('a');
      link.download = 'furniture-configuration.png';
      
      // Convert canvas to data URL and set it as the href
      link.href = canvas.toDataURL('image/png');
      
      // Simulate a click on the link to trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (onScreenshot) onScreenshot();
    }
  };

  return (
    <Html
      position={[0, -1, 0]}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        display: 'flex',
        gap: '15px'
      }}
    >
      {/* Screenshot Button */}
      <button
        onClick={handleScreenshot}
        style={{
          background: '#ffffff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
        title="Take Screenshot"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19 9h-4.5L12 4.5 9.5 9H5l3.5 4L6 19l6-3 6 3-2.5-6 3.5-4z"></path>
        </svg>
      </button>

      {/* AR View Button */}
      <button
        onClick={onARView}
        style={{
          background: '#ffffff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
        title="View In Your Room"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a9.96 9.96 0 0 1 7.05 2.9 10 10 0 0 1-17.3 10.17A10 10 0 0 1 12 2zm0 4v10m-4-4h8"></path>
        </svg>
      </button>

      {/* Ruler/Measurement Button */}
      <button
        onClick={onToggleMeasurements}
        style={{
          background: '#ffffff',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
        title="Show Measurements"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"></path>
          <path d="M21 9H3"></path>
        </svg>
      </button>
    </Html>
  );
};

export default CanvasControls;