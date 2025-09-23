import type { Meta, StoryObj } from "@storybook/react-vite";

import { Cart } from "./cart.tsx";

const meta = {
    title: 'components/Cart',
    component: Cart,
    tags: ['autodocs'],
} satisfies Meta<typeof Cart>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
}