import BasicRoute from "./basic";
import ExchangeRateController from "../controllers/exchangeRate";
import { ExchangeRateService } from "../services/ExchangeRateService";
import { exchangeRates } from "../data";



export default class ExchangeRateRoute extends BasicRoute {
    constructor() {
        super();
        this.setPrefix("exchangeRate");
        this.setRoutes();
    }

    protected setRoutes() {
        const controller = new ExchangeRateController(
            new ExchangeRateService(exchangeRates),
        );

        this.router.get('/', controller.convert.bind(controller));

    }

}