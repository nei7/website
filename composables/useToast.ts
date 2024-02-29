import type { Icon } from "~/types/icon";
import { uid } from "#imports";

export interface Notification {
  id: string;
  icon?: Icon;
  iconClass?: string;
  text: string;
  timeout?: number;
}

export function useToast() {
  const notifications = useState<Notification[]>("notifications", () => []);

  const add = (notification: Partial<Notification> & { text: string }) => {
    notifications.value.push({ id: uid(), ...notification });
  };

  const remove = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return {
    add,
    remove,
    notifications
  };
}
