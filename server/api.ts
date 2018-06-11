import * as express from 'express';
import {contactsRouter} from './contactsRouter';
const app = express();
app.use(express.json());

app.use('/contacts', contactsRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(4000, () => console.log('Example app listening on port 4000!'));