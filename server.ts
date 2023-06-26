import { ngExpressEngine } from '@nguniversal/express-engine';
import bootstrap from './src/main.server';
import * as express from 'express';

export function app(): express.Express {
  const server = express();
  server.engine('html', ngExpressEngine({ bootstrap }));
  return server;
}
