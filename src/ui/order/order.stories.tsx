import type { Meta, StoryObj } from "@storybook/react-vite";

import { Order } from "./order.tsx";

const meta = {
    title: 'components/Order',
    component: Order,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '360px' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof Order>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        productsId: ['1'],
        orderId: '1',
        orderPrice: 1000
    }
}