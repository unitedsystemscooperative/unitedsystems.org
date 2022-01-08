import { RequestHandler, rest } from 'msw';

export const errorHandlers: RequestHandler[] = [
  rest.get('*', (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ errorMessage: 'error happened' }))
  ),
  rest.post('*', (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ errorMessage: 'error happened' }))
  ),
  rest.patch('*', (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ errorMessage: 'error happened' }))
  ),
  rest.put('*', (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ errorMessage: 'error happened' }))
  ),
  rest.delete('*', (req, res, ctx) =>
    res(ctx.status(500), ctx.json({ errorMessage: 'error happened' }))
  ),
];
