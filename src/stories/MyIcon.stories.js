import MyIcon from '@/components/elements/MyIcon.vue'

export default {
  title: 'elements/MyIcon',
  component: MyIcon,
  argTypes: {
    name: {
      control: 'select',
      options: ['community', 'documentation', 'ecosystem', 'support']
    }
  }
}

export const PrimaryIcon = {
  render: (args) => {
    return {
      components: {
        MyIcon
      },
      setup() {
        return { args }
      },
      template: `<MyIcon v-bind="args"></MyIcon>`
    }
  },
  args: {
    size: 'regular',
    variant: 'default'
  }
}

export const SecondaryIcon = {
  render: (args) => {
    return {
      components: {
        MyIcon
      },
      setup() {
        return { args }
      },
      template: `<MyIcon v-bind="args"></MyIcon>`
    }
  },
  args: {
    size: 'regular',
    variant: 'rounded'
  }
}

export const SmallPrimaryIcon = {
  render: (args) => {
    return {
      components: {
        MyIcon
      },
      setup() {
        return { args }
      },
      template: `<MyIcon v-bind="args"></MyIcon>`
    }
  },
  args: {
    size: 'small',
    variant: 'default'
  }
}

export const SmallSecondaryIcon = {
  render: (args) => {
    return {
      components: {
        MyIcon
      },
      setup() {
        return { args }
      },
      template: `<MyIcon v-bind="args"></MyIcon>`
    }
  },
  args: {
    size: 'small',
    variant: 'rounded'
  }
}
