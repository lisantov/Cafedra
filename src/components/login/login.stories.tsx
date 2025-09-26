import type { Meta, StoryObj } from "@storybook/react-vite";

import { Login } from "./login.tsx";

const meta = {
    title: 'components/Login',
    component: Login,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '420px', margin: 'auto' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof Login>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onLogin: () => {}
    },
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
}