import express from 'express';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', require('../components/User/routers/UserRoute'));
app.use('/groups', require('../components/Group/routers/GroupRoute'));

app.listen(port, ():void => console.log(`Listenning on port ${port}`));
