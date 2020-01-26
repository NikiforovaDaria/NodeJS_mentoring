import express from 'express';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', require('../User/routers/UserRoute'));

app.listen(port, ():void => console.log(`Listenning on port ${port}`));
