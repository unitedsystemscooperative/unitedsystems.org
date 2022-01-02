import { RequestHandler, rest } from 'msw';

export const handlers: RequestHandler[] = [
  rest.get('/boo', (req, res, ctx) => {
    return res(ctx.json('ahh!'));
  }),
];
