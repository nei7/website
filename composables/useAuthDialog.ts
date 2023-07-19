const isOpen = ref(false);

export default function useAuthDialog() {
  function setIsOpen(value: boolean) {
    isOpen.value = value;
  }

  return {
    isOpen,
    setIsOpen,
  };
}
