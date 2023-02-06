import { Meta, StoryFn } from '@storybook/react';
import { PersonPinCircle } from '@styled-icons/material-outlined';
import { Button } from '.';

export default {
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Buy now',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  size: 'small',
  children: 'Buy now',
  icon: <PersonPinCircle />,
};

export const AsLink = Template.bind({});
AsLink.args = {
  size: 'large',
  children: 'Buy now',
  as: 'a',
  href: '/link',
};
