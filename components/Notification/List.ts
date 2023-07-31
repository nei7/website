import { h, TransitionGroup } from "vue";
import Notification from "./index";
import { useAppStore } from "~/stores";

export default defineComponent({
  name: "Notifications",
  setup() {
    const store = useAppStore();

    return () =>
      h(
        TransitionGroup,
        {
          tag: "div",
          class:
            "fixed bottom-5 left-1/2 right-1/2 -translate-x-1/2  flex flex-col w-full max-w-sm gap-5",
          enterActiveClass: "duration-200 ease-out",
          enterFromClass: "opacity-0 scale-95",
          enterToClass: "opacity-0 scale-95",
          leaveActiveClass: "duration-100 ease-in",
          leaveFromClass: "opacity-100 scale-100",
          leaveToClass: "opacity-0 scale-95"
        },
        () =>
          store.$state.notifications.map((props) =>
            h(Notification, {
              ...props,
              id: props.id,
              onClose: (notificationId: string) =>
                store.removeNotification(notificationId),
              key: props.id
            })
          )
      );
  }
});
