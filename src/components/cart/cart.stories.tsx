import type { Meta, StoryObj } from "@storybook/react-vite";

import { Cart } from "./cart.tsx";

const meta = {
    title: 'components/Login',
    component: Cart,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '420px', margin: 'auto' }}>
                <Story />
            </div>
        )
    ]
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