import type { Meta, StoryObj } from "@storybook/react-vite";

import { Registration } from "./registration.tsx";

const meta = {
    title: 'components/Registration',
    component: Registration,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '420px', margin: 'auto' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof Registration>;
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