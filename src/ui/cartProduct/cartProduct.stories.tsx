import type { Meta, StoryObj } from "@storybook/react-vite";

import { CartProduct } from "./cartProduct.tsx";

const meta = {
    title: 'components/CartProduct',
    component: CartProduct,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '360px' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof CartProduct>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        productTitle: 'Жизненно важная вещь!',
        productDescription: 'Что бы вы делали, если бы не эта штука! Да как без неё можно жить?',
        productPrice: 9999,
    }
}