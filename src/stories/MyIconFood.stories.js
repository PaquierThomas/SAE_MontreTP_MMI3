import MyIconFood from '@/components/elements/MyIconFood.vue'

export default {
  title: 'elements/MyIconFood',
  component: MyIconFood,
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
    background: {
      control: 'select',
      options: ['orange', 'tangerine', 'black', 'white', 'no-bg']
    },
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large']
    },
    color: {
      control: 'select',
      options: ['orange', 'tangerine', 'black', 'white', 'no-color'],
      default: 'no-color'
    }
  }
}

export const PrimaryIcon = {
  render: (args) => {
    return {
      components: {
        MyIconFood
      },
      setup() {
        return { args }
      },
      template: `<MyIconFood v-bind="args"></MyIconFood>`
    }
  },
  args: {
    name: 'play',
    background: 'orange'
  }
}
