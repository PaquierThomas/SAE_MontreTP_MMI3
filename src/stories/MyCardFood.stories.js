import MyCardFood from '@/components/elements/MyCardFood.vue'

export default {
  title: 'components/elements/MyCardFood',
  component: MyCardFood,
  argTypes: {
    title: {
      control: 'text'
    },
    rating: {
      control: 'number'
    },
    price: {
      control: 'number'
    },
    imageSrc: {
      control: 'text'
    },
    imageAlt: {
      control: 'text'
    },
    buttonLabel: {
      control: 'text'
    }
  }
}

export const CardFood = {
  render: (args) => {
    return {
      components: {
        MyCardFood
      },
      setup() {
        return { args }
      },
      template: `<MyCardFood v-bind="args" />`
    }
  },
  args: {
    title: 'Healthy Food',
    rating: 4,
    price: 10,
    imageSrc: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c1a8.png',
    imageAlt: 'image de la card',
    buttonLabel: 'Bouton de la card'
  }
}
