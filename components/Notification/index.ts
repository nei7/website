import { ref, computed } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

import useTimer from "~/composables/useTimer";

export default defineComponent({
  name: "Notification",
  props: {
    id: {
      type: String,
      required: true
    },

    timeout: {
      type: Number,
      required: false,
      default: 5000
    },
    text: {
      type: String,
      requried: true
    },
    title: {
      type: String,
      requried: false
    }
  },
  emits: ["close"],
  setup(props, { emit }) {
    const remaining = ref(props.timeout);

    const progressStyle = computed(() => {
      const remainingPercent = (remaining.value / props.timeout) * 100;

      return { width: `${remainingPercent || 0}%` };
    });

    let timer: ReturnType<typeof useTimer> | null = null;
    const onClose = () => {
      timer?.stop();
      emit("close", props.id);
    };
    onMounted(() => {
      timer = useTimer(() => {
        onClose();
      }, props.timeout);

      watchEffect(() => {
        if (timer) remaining.value = timer.remaining.value;
      });

      onUnmounted(() => timer?.stop());
    });

    return () =>
      h(
        "div",
        {
          onMouseover: () => timer?.pause(),
          onMouseleave: () => timer?.resume(),
          class: "w-full bg-white shadow-lg rounded-xl border border-gray"
        },
        [
          h(
            "div",
            {
              class: "flex items-center pt-4 px-4 pb-3 text-slate-600"
            },

            [
              h("div", { class: "flex-1 mr-3 " }, [
                props.title && h("div", { class: "text-lg font-medium" }, props.title),

                h("div", { class: "text-sm" }, props.text)
              ]),
              h(
                "div",
                {
                  onClick: () => emit("close", props.id),
                  class: "p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                },
                h(XMarkIcon, {
                  class: "h-5 w-5 ml-auto "
                })
              )
            ]
          ),
          h("div", {
            class: "w-full h-1.5 bg-indigo-600 rounded-b-xl",
            style: progressStyle.value
          })
        ]
      );
  }
});
