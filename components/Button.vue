<script setup lang="ts">
const sizes = {
  lg: "",
  md: "text-xs sm:text-base py-3 px-8 font-medium",
  sm: "text-xs sm:text-sm py-3 px-6 font-medium"
};

const props = defineProps<{
  size?: keyof typeof sizes;
  disabled?: boolean;
  color?: string;
  loading?: boolean;
}>();

const attrs = useAttrs();
const router = useRouter();

const onClick = () => {
  const defaultHref = attrs.href || attrs.defaultHref;

  if (defaultHref) router.push(defaultHref);
};

const buttonClasses = classNames(
  sizes[props.size || "md"],
  props.color ||
    "bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-400"
);
</script>

<template>
  <button
    :class="buttonClasses"
    class="rounded-3xl appearance-none justify-center outline-offset-2 transition duration-300 active:transition-none items-center inline-flex"
    :disabled="disabled"
    @click="onClick"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot></slot>
  </button>
</template>
