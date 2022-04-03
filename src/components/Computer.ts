import { defineComponent, h, onMounted, ref } from "vue";
import * as Three from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadGLTF } from "../utils/model";

export default defineComponent({
  setup() {
    const canvas = ref<HTMLElement | undefined>();

    onMounted(async () => {
      if (!canvas.value) return;

      const target = new Three.Vector3(-0.3, 0, 0);

      const scene = new Three.Scene();

      const camera = new Three.PerspectiveCamera(
        35,
        canvas.value.clientWidth / canvas.value.clientHeight,
        0.1,
        100
      );
      camera.lookAt(target);
      camera.position.z = 5;

      const renderer = new Three.WebGLRenderer({
        antialias: true,
        canvas: canvas.value,
      });
      renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x151618);
      renderer.outputEncoding = Three.sRGBEncoding;

      const laptop = await loadGLTF(scene, "computer.glb");
      laptop.position.y = -0.6;
      laptop.position.x = -0.3;

      const light = new Three.AmbientLight(0xd4ecdd, 1.2);
      light.position.set(0, 2, 0);
      scene.add(light);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    });

    return () => {
      return h("canvas", {
        ref: canvas,
        class: "cursor-grab md:ml-0",
      });
    };
  },
});
