"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const contactsRouter_1 = require("./contactsRouter");
const app = express();
app.use(express.json());
app.use('/contacts', contactsRouter_1.contactsRouter);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log('Example app listening on port 4000!'));
//# sourceMappingURL=api.js.map