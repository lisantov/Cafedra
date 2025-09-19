import type { Meta, StoryObj } from "@storybook/react-vite";
import { AmountSetter } from "./amountSetter.tsx";

const meta = {
    title: 'components/Setter',
    component: AmountSetter,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '360px' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof AmountSetter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
}