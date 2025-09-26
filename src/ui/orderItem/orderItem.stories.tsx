import type { Meta, StoryObj } from "@storybook/react-vite";

import { OrderItem } from "./orderItem.tsx";

const meta = {
    title: 'components/OrderItem',
    component: OrderItem,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '360px' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof OrderItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        productsTitle: 'Яблака',
        productsAmount: 5,
    }
}