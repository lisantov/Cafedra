import type { Meta, StoryObj } from "@storybook/react-vite";

import { Product } from "./product.tsx";

const meta = {
    title: 'components/Product',
    component: Product,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '360px' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof Product>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        productTitle: 'Жизненно важная вещь!',
        productDescription: 'Что бы вы делали, если бы не эта штука! Да как без неё можно жить?',
        productPrice: 9999,
    }
}