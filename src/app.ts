import express from 'express';
import router from './routes/routes';


export class App {
  private app: express.Application = express();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    for (const route of router) {
      this.app.use(`/api/${route.getPrefix()}`, route.getRouter());
    }
  }

  public boot(): void {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    this.app.get('/', (req, res) => {
      res.send('Hello World!');
    });
  }
}   