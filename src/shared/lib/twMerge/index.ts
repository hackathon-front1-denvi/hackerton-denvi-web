import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'text_10_15',
            'text_11_14',
            'text_11_18',
            'text_11_20_m0.4',
            'text_11_22_m0.4',
            'text_12_20',
            'text_12_20_m0.4',
            'text_13_18',
            'text_13_20',
            'text_13_24',
            'text_14_20',
            'text_14_24',
            'text_15_18',
            'text_15_22',
            'text_15_24',
            'text_16_22',
            'text_16_24',
            'text_17_28',
            'text_18_22',
            'text_18_24',
            'text_20_24',
            'text_20_28',
            'text_22_28_m0.4',
          ],
        },
      ],
      rounded: ['rounded-2xsm', 'rounded-xsm'],
    },
  },
})

export default twMerge
