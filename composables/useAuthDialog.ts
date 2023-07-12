const isOpen = ref(false);

export default function useAuthDialog() {
  const user = useSupabaseUser();

  function setIsOpen(value: boolean) {
    isOpen.value = value;
  }

  function openOnUnlogged() {
    isOpen.value = !user.value;
  }

  return {
    isOpen,
    setIsOpen,
    openOnUnlogged,
  };
}
