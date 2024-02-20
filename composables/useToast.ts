// import { createVNode, render, getCurrentInstance } from "vue";
// import NotificationList from "~/components/Notification/List";
// import { useAppStore } from "~/stores";

// let vnode: null | VNode = null;

// export type Notification = {
//   id: string;
//   title?: string;
//   text: string;
//   timeout?: number;
// };

export default function useToast(_props: Omit<Notification, "id">) {
  //   if (!process.client) return;
  //   const store = useAppStore();
  //   if (vnode === null) {
  //     vnode = createVNode(NotificationList, props);
  //     const app = getCurrentInstance();
  //     vnode.appContext = app?.appContext || null;
  //     render(vnode, document.body);
  //   }
  //   store.addNotification(props);
}
