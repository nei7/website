import { defineStore } from "pinia";
import { type Notification } from "~/composables/useToast";

export const useAppStore = defineStore("app", () => {
  const notifications = ref<Notification[]>([]);
  const authDialog = ref(false);

  function setAuthDialog(value: boolean) {
    authDialog.value = value;
  }

  function addNotification(notification: Omit<Notification, "id">) {
    notifications.value.push({
      id: new Date().getTime().toString(),
      ...notification
    });
  }

  function removeNotification(id: string) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }

  return {
    authDialog,
    setAuthDialog,
    notifications,
    addNotification,
    removeNotification
  };
});
