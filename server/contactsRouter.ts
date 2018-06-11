import * as express from 'express';
export const contactsRouter = express.Router();
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
const saltRounds = 10;
let i = 0;

function readFile(){
    const data = fs.readFileSync(`${__dirname}\\data.json`).toString();
    return JSON.parse(data);
}

contactsRouter.get('/', (req, res)=>{
    const contacts = readFile();
    res.status(200).json(contacts);
});

contactsRouter.post('/sign-up', (req, res)=>{
   const user = req.body;
   const myPlaintextPassword = user.password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            user.password = hash;
            user.id = ++i;
            const data = readFile();
            data.contacts.push(user);

            fs.writeFile(`${__dirname}\\data.json`, JSON.stringify(data), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                res.status(200).json({user:{"id":user.id, "name":user.name}});
            });
        });
    });
});

contactsRouter.post('/login', (req, res)=>{
    const user = req.body;
    const myPlaintextPassword = user.password;
    const data = readFile();
    const userIndex = data.contacts.findIndex((contact)=>{
        return contact.name === user.name;
    });

    const hash = data.contacts[userIndex].password;

    bcrypt.compare(myPlaintextPassword, hash, function(err, resp) {
        if (resp == true){
            return res.status(200).json({"status":"OK"});
        }
        return res.status(401).json({"status":"FAIL"});
    });
});