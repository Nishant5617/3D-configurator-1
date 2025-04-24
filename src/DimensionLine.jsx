import { Line, Text } from '@react-three/drei'

export default function DimensionLine({ start, end, label }) {
  const midPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ]

  return (
    <group>
      <Line points={[start, end]} color="black" lineWidth={1} />
      <Text
        position={midPoint}
        fontSize={0.05}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// /**
//  * Component to display a measurement line with dimension value
//  * @param {Object} props - Component props
//  * @param {THREE.Vector3} props.start - Start point of the line
//  * @param {THREE.Vector3} props.end - End point of the line
//  * @param {number} props.value - The measurement value
//  * @param {THREE.Camera} props.camera - The THREE.js camera
//  * @param {number} props.color - Color of the line
//  * @param {THREE.Vector3} props.offset - Offset for positioning the line
//  */
// const DimensionLine = ({ start, end, value, camera, color = 0xffffff, offset = new THREE.Vector3() }) => {
//   const lineRef = useRef();
//   const textRef = useRef();
  
//   useEffect(() => {
//     if (!start || !end || !camera) return;
    
//     // Create the line geometry
//     const startPoint = new THREE.Vector3().copy(start).add(offset);
//     const endPoint = new THREE.Vector3().copy(end).add(offset);
    
//     // Create line material
//     const material = new THREE.LineBasicMaterial({ 
//       color: color,
//       linewidth: 2,
//       depthTest: false,
//       depthWrite: false
//     });
    
//     // Create line with arrow caps
//     const points = [startPoint];
    
//     // Add arrow at start
//     const arrowLength = 0.05;
//     const arrowDirection = new THREE.Vector3().subVectors(endPoint, startPoint).normalize();
//     const arrowPerp1 = new THREE.Vector3(-arrowDirection.y, arrowDirection.x, 0).normalize().multiplyScalar(arrowLength);
//     const arrowPerp2 = new THREE.Vector3(arrowDirection.y, -arrowDirection.x, 0).normalize().multiplyScalar(arrowLength);
    
//     points.push(
//       new THREE.Vector3().copy(startPoint).add(arrowPerp1),
//       startPoint,
//       new THREE.Vector3().copy(startPoint).add(arrowPerp2),
//       startPoint
//     );
    
//     // Add main line
//     points.push(endPoint);
    
//     // Add arrow at end
//     points.push(
//       new THREE.Vector3().copy(endPoint).sub(arrowPerp1),
//       endPoint,
//       new THREE.Vector3().copy(endPoint).sub(arrowPerp2),
//       endPoint
//     );
    
//     // Create line geometry
//     const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
//     // Create line mesh
//     const line = new THREE.Line(geometry, material);
//     line.renderOrder = 1000; // Ensure line renders on top
    
//     // Add line to scene
//     if (lineRef.current) {
//       lineRef.current.remove();
//     }
//     lineRef.current = line;
    
//     // Create text sprite for dimension value
//     const midpoint = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
    
//     // Create canvas for text
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     canvas.width = 100;
//     canvas.height = 50;
    
//     // Draw text on canvas
//     context.fillStyle = '#FFFFFF';
//     context.font = '24px Arial';
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//     context.fillText(`${value.toFixed(2)}m`, canvas.width / 2, canvas.height / 2);
    
//     // Create texture from canvas
//     const texture = new THREE.CanvasTexture(canvas);
//     texture.needsUpdate = true;
    
//     // Create sprite material
//     const spriteMaterial = new THREE.SpriteMaterial({
//       map: texture,
//       transparent: true,
//       depthTest: false,
//       depthWrite: false
//     });
    
//     // Create sprite
//     const sprite = new THREE.Sprite(spriteMaterial);
//     sprite.position.copy(midpoint);
//     sprite.scale.set(0.5, 0.25, 1);
//     sprite.renderOrder = 1001; // Ensure text renders on top of line
    
//     if (textRef.current) {
//       textRef.current.remove();
//     }
//     textRef.current = sprite;
    
//     // Return clean-up function
//     return () => {
//       if (lineRef.current) {
//         lineRef.current.geometry.dispose();
//         lineRef.current.material.dispose();
//         lineRef.current.parent?.remove(lineRef.current);
//       }
      
//       if (textRef.current) {
//         textRef.current.material.map.dispose();
//         textRef.current.material.dispose();
//         textRef.current.parent?.remove(textRef.current);
//       }
//     };
//   }, [start, end, value, camera, color, offset]);
  
//   return null; // This component doesn't render React elements
// };

// export default DimensionLine;