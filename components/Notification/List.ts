import { h, TransitionGroup } from "vue";
import Notification from "./index";
import { eventBus, Props } from "~/composables/useToast";

export default defineComponent({
  name: "Notifications",
  setup() {
    const notifications = reactive<Props[]>([]);

    onMounted(() =>
      eventBus.on("notification", (props) => {
        notifications.push(props);
      })
    );

    return () =>
      h(
        TransitionGroup,
        {
          tag: "div",
          class:
            "fixed bottom-5 left-1/2 right-1/2  flex flex-col w-full max-w-xs gap-5",
          enterActiveClass: "duration-200 ease-out",
          enterFromClass: "opacity-0 scale-95",
          enterToClass: "opacity-0 scale-95",
          leaveActiveClass: "duration-100 ease-in",
          leaveFromClass: "opacity-100 scale-100",
          leaveToClass: "opacity-0 scale-95",
        },
        () =>
          notifications.map((props, id) =>
            h(Notification, {
              ...props,
              id,
              onClose: (idx: number) => notifications.splice(idx, 1),
              key: id,
            })
          )
      );
  },
});
