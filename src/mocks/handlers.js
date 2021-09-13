import { rest } from 'msw'

export const BASE_URL = 'http://localhost:3030'

export const handlers = [
  rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  }),

  rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
        { name: 'Cherries', imagePath: '/images/cherries.png' },
      ])
    )
  }),
]
