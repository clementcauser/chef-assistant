import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LinkButton } from "./link-button";

export default {
  component: LinkButton,
  title: "LinkButton",
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = (args) => (
  <LinkButton {...args}>Go to login page</LinkButton>
);

export const Primary = Template.bind({});
Primary.args = {};
