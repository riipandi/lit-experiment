import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import '#/components/button'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  label?: string
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ variant, size, label, disabled, onClick }: ButtonProps) => {
  return html`
    <my-button
      variant=${variant || 'primary'}
      size=${size || 'medium'}
      ?disabled=${disabled}
      @:click=${onClick}
    >
      ${label}
    </my-button>
  `
}

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => Button(args),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'Button variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<ButtonProps>

export default meta
type Story = StoryObj<ButtonProps>

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Button',
  },
}
