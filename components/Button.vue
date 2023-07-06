<script setup lang="ts">
const props = defineProps<{
  transparent?: boolean;
  size?: keyof typeof sizes;
  disabled?: boolean;
}>();

const attrs = useAttrs();
const router = useRouter();

const onClick = () => {
  const defaultHref = attrs["href"] || attrs["defaultHref"];

  if (defaultHref) router.push(defaultHref);
};

const sizes = {
  lg: "",
  md: "py-3 px-8 font-medium",
  sm: "text-sm py-3 px-6 font-medium",
};

const buttonClasses = classNames(
  sizes[props.size || "md"],
  props.transparent
    ? ["text-slate-800"]
    : ["bg-indigo-600 text-white  hover:bg-indigo-500"]
);
</script>

<template>
  <button
    @click="onClick"
    :class="buttonClasses"
    class="rounded-3xl appearance-none justify-center outline-offset-2 transition duration-300 active:transition-none disabled:bg-indigo-400"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
