"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.contactsRouter = express.Router();
var bcrypt = require("bcrypt");
var fs = require("fs");
var saltRounds = 10;
var i = 0;
function readFile() {
    var data = fs.readFileSync(__dirname + "\\data.json").toString();
    return JSON.parse(data);
}
exports.contactsRouter.get('/', function (req, res) {
    var contacts = readFile();
    res.status(200).json(contacts);
});
exports.contactsRouter.post('/sign-up', function (req, res) {
    var user = req.body;
    var myPlaintextPassword = user.password;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            user.password = hash;
            user.id = ++i;
            var data = readFile();
            data.contacts.push(user);
            fs.writeFile(__dirname + "\\data.json", JSON.stringify(data), function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                res.status(200).json({ user: { "id": user.id, "name": user.name } });
            });
        });
    });
});
exports.contactsRouter.post('/login', function (req, res) {
    var user = req.body;
    var myPlaintextPassword = user.password;
    var data = readFile();
    var userIndex = data.contacts.findIndex(function (contact) {
        return contact.name === user.name;
    });
    var hash = data.contacts[userIndex].password;
    bcrypt.compare(myPlaintextPassword, hash, function (err, resp) {
        if (resp == true) {
            return res.status(200).json({ "status": "OK" });
        }
        return res.status(401).json({ "status": "FAIL" });
    });
});
//# sourceMappingURL=contactsRouter.js.map