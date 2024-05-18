import BasicRoutes from './basic';
import ExchangeRateRoute from './exchangeRate';

const router: Array<BasicRoutes> = [
    new ExchangeRateRoute(),
]

export default router;