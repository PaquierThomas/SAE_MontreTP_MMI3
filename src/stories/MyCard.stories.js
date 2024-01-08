import MyCard from '@/components/elements/MyCard.vue'

export default {
  title: 'components/elements/MyCard',
  component: MyCard,
  argTypes: {
    name: {
      control: 'select',
      options: [
        'RightArrow',
        'LeftArrow',
        'Play',
        'ChevronRight',
        'ShoppingBag',
        'Search',
        'Clock',
        'MapPin',
        'Phone',
        'Star',
        'StarFilled',
        'ForkKnife',
        'ForkKnifeCrossed',
        'Truck',
        'Facebook',
        'Instagram',
        'Linkedin',
        'Twitter'
      ]
    },
    description: {
      control: 'text'
    },
    title: {
      control: 'text'
    },
    style: {
      control: 'select',
      options: ['no-border', 'no-shadow', 'border', 'shadow']
    }
  }
}

export const Card = {
  render: (args) => {
    return {
      components: {
        MyCard
      },
      setup() {
        return { args }
      },
      template: `<MyCard v-bind="args" />`
    }
  },
  args: {
    title: 'Healthy Food',
    description: `But I must explain to you 
    how all this mistaken idea of denouncing pleasure and
    practising pain was wrong.`,
    buttonLabel: 'Bouton de la card'
  }
}
