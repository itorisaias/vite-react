import { Meta, StoryFn } from "@storybook/react";
import { PersonPinCircle } from "@styled-icons/material-outlined";
import { TextField } from ".";

export default {
  component: TextField,
  args: {
    label: "E-mail",
    labelFor: "email",
    id: "email",
    placeholder: "jhon.cage@gmail.com",
  },
  decorators: [
    (storyFn) => <div style={{ maxWidth: 300, padding: 15 }}>{storyFn()}</div>,
  ],
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const withError = Template.bind({});
withError.args = {
  error: "Ops...somethind is wrong",
};
