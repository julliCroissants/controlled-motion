// import * as THREE from 'three';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// import { Skeleton, Bone } from 'three';


function CoinMesh() {
    const mesh = useRef(null);
    useFrame(()=> (mesh.current.rotation.y = mesh.current.rotation.z += 0.1));
    return (
        <mesh ref={mesh} scale={2}>
            <cylinderGeometry color="red" args={[1,1,0.3,50]} />
            <meshLambertMaterial attach="material" />
        </mesh>
    );
}

function Meshes(){
    return (
        <>
          <Canvas camera={ { position: [0,0,5] } } >
            <CoinMesh />
          </Canvas>
        </>
      );
}

export default Meshes;