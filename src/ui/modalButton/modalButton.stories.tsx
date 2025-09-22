import type { Meta, StoryObj } from "@storybook/react-vite";

import { ModalButton } from "./modalButton.tsx";

const meta = {
    title: 'components/ModalButton',
    component: ModalButton,
    tags: ['autodocs']
} satisfies Meta<typeof ModalButton>;
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