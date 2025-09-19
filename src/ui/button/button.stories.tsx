import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button.tsx";

const meta = {
    title: 'components/Button',
    component: Button,
    tags: ['autodocs']
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Кнопка',
        isPrimary: true
    }
}

export const Secondary: Story = {
    args: {
        children: 'Кнопка',
        isPrimary: false
    }
}

export const Disabled: Story = {
    args: {
        children: 'Кнопка',
        isPrimary: true,
        isDisabled: true
    }
}