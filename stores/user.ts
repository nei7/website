import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => {
    return { id: "" };
  },
  getters: {
    isAuthenticated: (state) => state.id !== ""
  }
});
