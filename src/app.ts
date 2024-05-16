import express from 'express';

export class App {
  private app: express.Application = express();

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