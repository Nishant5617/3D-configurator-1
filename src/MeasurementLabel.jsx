import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const MeasurementLabel = ({ start, end, text }) => {
  const midpoint = new THREE.Vector3().lerpVectors(start, end, 0.5);

  return (
    <Html position={midpoint.toArray()} center occlude>
      <div className="label-3d">
        {text}
      </div>
    </Html>
  );
};

export default MeasurementLabel;
