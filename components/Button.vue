<script setup lang="ts">
const props = defineProps<{
  size?: keyof typeof sizes;
  disabled?: boolean;
  color?: string;
}>();

const attrs = useAttrs();
const router = useRouter();

const onClick = () => {
  const defaultHref = attrs["href"] || attrs["defaultHref"];

  if (defaultHref) router.push(defaultHref);
};

const sizes = {
  lg: "",
  md: "text-xs sm:text-base py-3 px-8 font-medium",
  sm: "text-xs sm:text-sm py-3 px-6 font-medium",
};

const buttonClasses = classNames(
  sizes[props.size || "md"],
  props.color ||
    "bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-400"
);
</script>

<template>
  <button
    @click="onClick"
    :class="buttonClasses"
    class="rounded-3xl appearance-none justify-center outline-offset-2 transition duration-300 active:transition-none items-center inline-flex"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
