import * as express from 'express';
import {contactsRouter} from './contactsRouter';
import * as cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(4000, () => console.log('Example app listening on port 4000!'));