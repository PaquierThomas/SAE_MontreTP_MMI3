import MyButton from '@/components/elements/MyButton.vue'

export default {
  title: 'elements/MyButton',
  component: MyButton,
  argTypes: {
    href: {
      control: 'text'
    },
    size: {
      control: 'select',
      options: ['regular', 'small']
    },
    variant: {
      control: 'select',
      options: ['default', 'rounded']
    },
    Boolean: {
      control: 'boolean',
      default: 'false'
    }
  }
}

export const PrimaryButton = {
  render: (args) => {
    return {
      components: {
        MyButton
      },
      setup() {
        return { args }
      },
      template: `<MyButton v-bind="args">Order now</MyButton>`
    }
  },
  args: {
    size: 'regular',
    variant: 'default',
    icon: false
  }
}

export const SecondaryButton = {
  render: (args) => {
    return {
      components: {
        MyButton
      },
      setup() {
        return { args }
      },
      template: `<MyButton v-bind="args">Learn Button</MyButton>`
    }
  },
  args: {
    size: 'regular',
    variant: 'rounded',
    icon: false
  }
}

export const SmallPrimaryButton = {
  render: (args) => {
    return {
      components: {
        MyButton
      },
      setup() {
        return { args }
      },
      template: `<MyButton v-bind="args">See more product</MyButton>`
    }
  },
  args: {
    size: 'regular',
    variant: 'rounded',
    icon: true
  }
}

export const SmallSecondaryButton = {
  render: (args) => {
    return {
      components: {
        MyButton
      },
      setup() {
        return { args }
      },
      template: `<MyButton v-bind="args">Add to cart </MyButton>`
    }
  },
  args: {
    size: 'small',
    variant: 'rounded',
    icon: false
  }
}
