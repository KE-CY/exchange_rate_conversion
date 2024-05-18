import { NextFunction, Request, Response } from "express";
import { ExchangeRateService } from "../services/ExchangeRateService";
import * as Joi from 'joi';

class ExchangeRateController {
  public readonly service: ExchangeRateService;
  constructor(service: ExchangeRateService) {
    this.service = service;
  }

  async convert(req: Request, res: Response, next: NextFunction) {
    const querySchema = Joi.object({
      source: Joi.string().required(),
      target: Joi.string().required(),
      amount: Joi.alternatives().try(
        Joi.number().required(),
        Joi.string().pattern(/^\d{1,3}(,\d{3})*(\.\d+)?$/).required()
      )
    });

    try {
      await querySchema.validateAsync(req.query);
    }
    catch (ex) {
      console.log('error msg:', (ex as Error).message);
      return res.status(400).json({
        'msg': (ex as Error).message
      });
    }



    const source = req.query.source as string;
    const target = req.query.target as string;
    const amount = req.query.amount as string;


    try {

      const exchangeRate = await this.service.convert(source, target, amount);

      return res.status(200).json({
        "msg": "success",
        "amount": exchangeRate
      });

    } catch (ex) {
      console.log('error msg:', (ex as Error).message);
      return res.status(400).json({
        'msg': (ex as Error).message
      });
    }
  }

}


export default ExchangeRateController;