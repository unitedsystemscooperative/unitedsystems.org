import { RequestHandler, rest } from 'msw';

export const defaultHandlers: RequestHandler[] = [
  rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.post('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.patch('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.put('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
  rest.delete('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
];
