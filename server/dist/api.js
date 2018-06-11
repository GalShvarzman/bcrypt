"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var contactsRouter_1 = require("./contactsRouter");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
app.use('/contacts', contactsRouter_1.contactsRouter);
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.listen(4000, function () { return console.log('Example app listening on port 4000!'); });
//# sourceMappingURL=api.js.map