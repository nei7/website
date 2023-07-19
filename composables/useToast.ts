import { createVNode, render, getCurrentInstance } from "vue";
import NotificationList from "~/components/Notification/List";
import mitt from "mitt";

let vnode: null | VNode = null;

export const eventBus = mitt<{ notification: Props }>();

export type Props = {
  title?: string;
  text: string;
  timeout?: number;
};

export default function useToast(props: Props) {
  if (!process.client) return;

  if (vnode === null) {
    vnode = createVNode(NotificationList, props);
    const app = getCurrentInstance();
    vnode.appContext = app?.appContext || null;

    render(vnode, document.body);
  }

  eventBus.emit("notification", props);
}
