import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductButton } from "./productButton.tsx";

const meta = {
    title: 'components/ProductButton',
    component: ProductButton,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '360px' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof ProductButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
}