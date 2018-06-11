"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.contactsRouter = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const saltRounds = 10;
let i = 0;
function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}\\data.json`, (err, data) => {
            if (err)
                reject(err);
            resolve(JSON.parse(data.toString()));
        });
    });
}
exports.contactsRouter.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const contacts = yield readFile();
    res.status(200).json(contacts);
}));
exports.contactsRouter.post('/sign-up', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = req.body;
    const data = yield readFile();
    const userIndex = data.contacts.findIndex((contact) => {
        return contact.name === user.name;
    });
    if (userIndex === -1) {
        const myPlaintextPassword = user.password;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                user.password = hash;
                user.id = ++i;
                data.contacts.push(user);
                fs.writeFile(`${__dirname}\\data.json`, JSON.stringify(data), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                    res.status(200).json({ user: { "id": user.id, "name": user.name } });
                });
            });
        });
    }
    else {
        res.status(422).json({ "message": "username already exist! choose a different name" });
    }
}));
exports.contactsRouter.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = req.body;
    const myPlaintextPassword = user.password;
    const data = yield readFile();
    const userIndex = data.contacts.findIndex((contact) => {
        return contact.name === user.name;
    });
    if (userIndex !== -1) {
        const hash = data.contacts[userIndex].password;
        bcrypt.compare(myPlaintextPassword, hash, function (err, resp) {
            if (resp == true) {
                return res.status(200).json({ "status": "OK" });
            }
            return res.status(404).json({ "status": "FAIL" });
        });
    }
    else {
        return res.status(404).json({ "status": "FAIL" });
    }
}));
//# sourceMappingURL=contactsRouter.js.map