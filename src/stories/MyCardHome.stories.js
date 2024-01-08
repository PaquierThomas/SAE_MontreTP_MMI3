import MyCardHome from '@/components/elements/MyCardHome.vue'

export default {
  title: 'components/elements/MyCardHome',
  component: MyCardHome,
  argTypes: {
    imageSrc: {
      control: 'text'
    },
    imageAlt: {
      control: 'text'
    },
    title: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    price: {
      control: 'number'
    }
  }
}

// max-width 260px min width 250
// max-height 380px min-height 370
// image 90% width

export const Card = {
  render: (args) => {
    return {
      components: {
        MyCardHome
      },
      setup() {
        return { args }
      },
      template: `<MyCardHome v-bind="args" />`
    }
  },
  args: {
    title: 'Burger',
    description: `Mushroom sauce`,
    imageSrc: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c1a8.png',
    imageAlt: "image d'un burger",
    price: 10
  }
}
