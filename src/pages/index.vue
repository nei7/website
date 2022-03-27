<script setup lang="ts">
import * as Three from 'three'
import { onMounted, onUnmounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTF } from '../utils/model';
import Footer from '../components/Footer.vue'

onMounted(async () => {
  const canvas = document.querySelector("#renderer-canvas") as HTMLElement
  if (!canvas) return

  const target = new Three.Vector3(-0.3, 0, 0)

  const scene = new Three.Scene();

  // Initialize camera
  const camera = new Three.PerspectiveCamera(35, 300 / 250, 0.1, 100);
  camera.lookAt(target)
  camera.position.z = 5;

  // Create renderer
  const renderer = new Three.WebGLRenderer({ antialias: true, canvas, });
  renderer.setSize(300, 250)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x121316)
  renderer.outputEncoding = Three.sRGBEncoding

  // Load 3d model
  const laptop = await loadGLTF(scene, "computer.glb")
  laptop.position.y = -0.6;
  laptop.position.x = -0.3;

  // Light
  const light = new Three.AmbientLight(0xD4ECDD, 1.2);
  light.position.set(0, 2, 0);
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true
  controls.target = target

  let animationFrame: number;
  function animate() {
    animationFrame = requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
  }
  animate();

  onUnmounted(() => {
    renderer.dispose()
    cancelAnimationFrame(animationFrame)
  })
})


</script>

<template>
  <div class="px-8 mx-auto max-w-7xl md:mt-20 mb-10">
    <div class="flex mx-auto w-full justify-center flex-col md:flex-row">
      <div class="flex justify-center mr-10">
        <canvas id="renderer-canvas" class="cursor-grab ml-16 md:ml-0"></canvas>
      </div>
      <div class="text-center md:text-left">
        <h1 class="font-bold leading-tight text-white text-6xl">Hello</h1>
        <p class="pt-2 max-w-xl text-xl tracking-wide leading-relaxed text-gray-300 mx-auto">
          My name is
          <b>Franek</b> I'm a 16 year old software engineer from Poland.
        </p>
        <div class="mt-7">
          <router-link to="/blog">
            <Button>My blog</Button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>
