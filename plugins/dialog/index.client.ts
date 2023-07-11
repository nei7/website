import {
  createVNode,
  render,
  FunctionalComponent,
  getCurrentInstance,
  provide,
  inject,
  VNode,
  AppContext,
} from "vue";
import Dialog from "./Dialog.vue";

function mount(component: any, context: AppContext) {
  let vNode: VNode | null = createVNode(component, {});
  if (context) vNode.appContext = context;
  render(vNode, document.body);

  const destroy = () => {
    render(null, document.body);

    vNode = null;
  };

  return { vNode, destroy };
}

export default defineNuxtPlugin((nuxtApp) => {
  const vm = mount(Dialog, nuxtApp.vueApp._context);

  return {
    provide: {
      useModal: (msg: string) => {
        const data = vm.vNode.component?.data;
        if (data) data.show = !data.show;
      },
    },
  };
});
