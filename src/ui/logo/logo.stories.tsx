import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logo } from "./logo.tsx";

const meta = {
    title: 'components/Logo',
    component: Logo,
    tags: ['autodocs']
} satisfies Meta<typeof Logo>;
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