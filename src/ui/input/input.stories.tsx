import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input.tsx";

const meta = {
    title: 'components/Input',
    component: Input,
    tags: ['autodocs'],
    decorators: [
        Story => (
            <div style={{ maxWidth: '360px' }}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NotRequired: Story = {
    args: {
        title: 'Замечательное поле ввода',
        isRequired: false,
    },
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
}

export const Required: Story = {
    args: {
        title: 'Замечательное поле ввода',
        isRequired: true,
    },
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
}