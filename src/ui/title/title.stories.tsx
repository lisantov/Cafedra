import type { Meta, StoryObj } from "@storybook/react-vite";

import { Title } from "./title.tsx";

const meta = {
    title: 'components/Title',
    component: Title,
    tags: ['autodocs']
} satisfies Meta<typeof Title>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Я - заголовок!'
    },
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
}