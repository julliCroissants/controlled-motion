// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useThree, useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useControls } from 'leva'
 
function moveJoint(degrees, joint, degreeLimit = 90) {
  joint.rotation.xD = THREE.MathUtils.lerp(joint.rotation.xD || 0, degrees[1], 0.1)
  joint.rotation.yD = THREE.MathUtils.lerp(joint.rotation.yD || 0, degrees[0], 0.1)
  joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD)
  joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD)
}
function moveJointz(degrees, joint, degreeLimit = 90) {
  joint.rotation.xD = THREE.MathUtils.lerp(joint.rotation.xD || 0, degrees.x, 0.1)
  joint.rotation.yD = THREE.MathUtils.lerp(joint.rotation.yD || 0, degrees.y, 0.1)
  joint.rotation.zD = THREE.MathUtils.lerp(joint.rotation.zD || 0, degrees.z, 0.1)
  joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD)
  joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD)
  joint.rotation.z = THREE.MathUtils.degToRad(joint.rotation.zD)
}
export default function Model({ mouse, ...props }) {
  const modelPose = useControls({
      head: {value:[-4,4],step:1}
    , neck: {value:[-2,2] , step:1}
    , spine: {value:[-5,-1],step:1}
    , shoulder: {x:83.84,y:-17.07,z:-108.3}
    , arm: {value:[34,61],step:1}
    , hand: {value:[-2,-26],step:1}
    , leg: {value:[-18,-10],step:1}
  })
  const group = useRef()
  const { nodes, animations } = useLoader(GLTFLoader, "/stacy.glb")
  const texture = useLoader(THREE.TextureLoader, "/stacy.jpg")
  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = { idle: mixer.clipAction(animations[8], group.current) }
    actions.current.idle.play()
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])
  const { size } = useThree()
  useFrame((state, delta) => {
    mouse.current = { x: size.width / 2 + (state.mouse.x * size.width) / 2, y: size.height / 2 + (-state.mouse.y * size.height) / 2 }

    mixer.update(delta);
    moveJoint(modelPose.head, nodes.mixamorigHead)
    moveJoint(modelPose.neck, nodes.mixamorigNeck)
    moveJoint(modelPose.spine, nodes.mixamorigSpine)
    moveJointz(modelPose.shoulder, nodes.mixamorigLeftShoulder)
    moveJoint(modelPose.arm, nodes.mixamorigLeftArm)
    moveJoint(modelPose.hand, nodes.mixamorigLeftHand)
    moveJoint(modelPose.leg, nodes.mixamorigLeftLeg)
   
  })
  return (
      <group ref={group} {...props} dispose={null}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes["mixamorigHips"]} />
          <skinnedMesh receiveShadow castShadow geometry={nodes["stacy"].geometry} skeleton={nodes["stacy"].skeleton}>
            <meshStandardMaterial map={texture} map-flipY={false} skinning />
          </skinnedMesh>
        </group>
      </group>  
  )
}
