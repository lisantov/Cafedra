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
        product: {
            id: '1',
            name: 'Продукт',
            image: 'img/iStock-1158470655.jpg',
            description: 'Лучший продукт',
            price: 1000,
            amount: 2,
            totalPrice: 2000,
            cart_id: ['1'],
        },
        deleteProduct: (v) => {console.log(v)},
        increaseProduct: (v) => {console.log(v)},
        decreaseProduct: (v) => {console.log(v)}
    }
}