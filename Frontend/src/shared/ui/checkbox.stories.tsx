import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Label } from './label';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">I agree to the terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Checkbox is checked</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled">Disabled checkbox</Label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled-checked" defaultChecked disabled />
      <Label htmlFor="disabled-checked">Disabled and checked</Label>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="item1" />
        <Label htmlFor="item1">Item 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="item2" defaultChecked />
        <Label htmlFor="item2">Item 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="item3" />
        <Label htmlFor="item3">Item 3</Label>
      </div>
    </div>
  ),
};
