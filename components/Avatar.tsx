import { useGLTF } from "@react-three/drei"
import { useFrame, useGraph } from "@react-three/fiber";
import { useEffect } from "react";
import { Euler } from "three";

type Props = {
    rotate :  Euler
}
//https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024

//Mine
// https://models.readyplayer.me/658ae7bdfc8bec93d064ced4.glb?morphTargets=ARKit&textureAtlas-1024

let headMesh : any
export default function Avatar (rotate: Props){
    console.log(rotate)
    const rotation = rotate.rotate
    console.log(`x:${rotation?.x},y:${rotation?.y},z:${rotation?.z}`)
    const avatar = useGLTF('https://models.readyplayer.me/6460d95f9ae10f45bffb2864.glb?morphTargets=ARKit&textureAtlas=1024');
    const {nodes} = useGraph(avatar.scene);
    useEffect(()=>{
        headMesh = nodes.Wolf3D_Avatar
    },[nodes])

    useFrame((_,delta)=>{
        // 
         rotation ? nodes.Head.rotation.set(rotation.x,rotation.y,rotation.z) : 'rotation sucks'
    })
//scale 11 y-11 z-0
    return(
        <>
        <primitive object={avatar.scene}   position={[0,-1.65,4]}/>
        </>
    )
}