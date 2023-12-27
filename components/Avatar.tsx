import { useGLTF } from "@react-three/drei"
import { useGraph } from "@react-three/fiber";


export default function Avatar (){
    const avatar = useGLTF('https://models.readyplayer.me/658ae7bdfc8bec93d064ced4.glb?morphTargets=ARKit');
    const {nodes} = useGraph(avatar.scene);
     
    return(
        <>
        <primitive  object={avatar.scene} position={[0,-1,3.6]}/>
        </>
    )
}