import type { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function loadGLTF(scene: THREE.Scene, asset: string): Promise<Group> {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      asset,
      (gltf) => {
        const obj = gltf.scene;
      
        obj.receiveShadow = true;
        obj.castShadow = true;

        scene.add(obj);
        resolve(obj);
      },
      undefined,
      (err) => {
        reject(err);
      }
    );
  });
}
