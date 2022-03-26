<script setup lang="ts">
import * as Three from 'three'
import { onMounted, ref } from 'vue';
import { useMouse } from '@vueuse/core'
import Button from '../components/Button.vue';

const { x, y } = useMouse()
const mouseDown = ref(false)

onMounted(() => {

  const canvas = document.querySelector("#renderer-canvas") as HTMLElement
  if (!canvas) return

  const scene = new Three.Scene();
  const camera = new Three.PerspectiveCamera(24, 400 / 200, 0.1, 100);


  canvas.addEventListener('mousedown', () => mouseDown.value = true)
  window.addEventListener('mouseup', () => mouseDown.value = false)


  const renderer = new Three.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(400, 200)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x121316)
  renderer.outputEncoding = Three.sRGBEncoding;
  renderer.toneMapping = Three.ACESFilmicToneMapping;


  const geometry = new Three.BoxGeometry();
  const material = new Three.MeshPhongMaterial({ color: '#5eead4', });
  const cube = new Three.Mesh(geometry, material);

  scene.add(cube);
  cube.rotation.x = -0.7
  cube.rotation.y = 0.7

  const color = 0xFFFFF;
  const intensity = 1.4;
  const light = new Three.DirectionalLight(color, intensity);
  light.position.set(1, 2, 6);
  light.target.position.set(0, 0, 0);


  scene.add(light);
  scene.add(light.target);


  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    if (mouseDown.value) {
      cube.rotation.x = -((window.innerHeight / 2 - y.value) / 200);
      cube.rotation.y = -((window.innerWidth / 2 - x.value) / 200);
    }


    renderer.render(scene, camera);
  }
  animate();
})

</script>

<template>
  <div class="py-5 px-8 mx-auto max-w-7xl">
    <div class="flex justify-center">
      <canvas id="renderer-canvas" class="cursor-grab"></canvas>
    </div>
    <div class>
      <h1 class="pt-10 font-bold leading-tight text-white lg:text-4xl text-center">Hello</h1>
      <p class="pt-2 max-w-2xl text-xl tracking-wide leading-relaxed text-gray-300 mx-auto">
        My name is
        <b>Franek</b> I'm a 16 year old software engineer from poland.
      </p>
    </div>

    <div class="mx-auto w-max mt-5">
      <router-link to="/blog">
        <Button>My blog</Button>
      </router-link>
    </div>

    <div class="absolute bottom-0 py-16 -ml-8 pl-10 md:pl-48 mx-auto max-w-5xl w-full">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center md:gap-x-10">
        <span
          class="font-semibold tracking-wider text-white uppercase whitespace-nowrap"
        >reach me on</span>
        <div
          class="flex flex-wrap gap-x-14 items-center pt-6 lg:flex-nowrap md:pt-0 left-0 right-0"
        >
          <a href="https://discord.com/channels/@me/624981292865552435" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'discord']"
              class="w-auto h-5 text-gray-400 transition cursor-pointer fill-current hover:text-white"
            />
          </a>
          <a href="https://github.com/nei7" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'github']"
              class="w-auto h-5 text-gray-400 transition cursor-pointer fill-current hover:text-white"
            />
          </a>
          <a href="mailto:franciszek.szarek2@gmail.com" target="_blank">
            <font-awesome-icon
              :icon="['fas', 'at']"
              class="w-auto h-5 text-gray-400 transition cursor-pointer fill-current hover:text-white"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
