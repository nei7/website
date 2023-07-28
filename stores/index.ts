import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const authDialog = ref(false);

  function setAuthDialog(value: boolean) {
    authDialog.value = value;
  }

  return {
    authDialog,
    setAuthDialog,
  };
});
