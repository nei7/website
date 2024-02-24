import { expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";
import ui from "./Input.ui";

it("can mount component", async () => {
  const wrapper = await mount(Input);

  expect(wrapper.exists()).toBeTruthy();
});

it("can apply classes", async () => {
  const wrapper = await mount(Input, {
    props: {
      size: "md"
    }
  });

  const classes = wrapper.find("input").classes();

  const hasClasses = ui.sizes.md.split(" ").every((size) => classes.includes(size));
  expect(hasClasses).toBeTruthy();
});
