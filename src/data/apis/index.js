import { Router } from 'express';
import NewsRouter from './news';

const Route = Router();

// END
const n = new NewsRouter();
n.mountToExpress(Route);

export default Route;
