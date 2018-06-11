import * as express from 'express';
export const contactsRouter = express.Router();
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
const saltRounds = 10;
let i = 0;

function readFile():Promise<{contacts:any[]}>{
    return new Promise((resolve, reject)=>{
        fs.readFile(`${__dirname}\\data.json`, (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data.toString()));
        });
    });
}

contactsRouter.get('/', async (req, res)=>{
    const contacts = await readFile();
    res.status(200).json(contacts);
});

contactsRouter.post('/sign-up', async (req, res)=>{
   const user = req.body;
   const data = await readFile();
   const userIndex = data.contacts.findIndex((contact)=>{
       return contact.name === user.name
   });
   if(userIndex === -1){
       const myPlaintextPassword = user.password;
       bcrypt.genSalt(saltRounds, function(err, salt) {
           bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
               user.password = hash;
               user.id = ++i;
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
   }
   else{
       res.status(422).json({"message":"username already exist! choose a different name"});
   }
});

contactsRouter.post('/login', async (req, res)=>{
    const user = req.body;
    const myPlaintextPassword = user.password;
    const data = await readFile();

    const userIndex = data.contacts.findIndex((contact)=>{
        return contact.name === user.name;
    });

    if(userIndex !== -1){
        const hash = data.contacts[userIndex].password;
        bcrypt.compare(myPlaintextPassword, hash, function(err, resp) {
            if (resp == true){
                return res.status(200).json({"status":"OK"});
            }
            return res.status(404).json({"status":"FAIL"});
        });
    }
    else{
        return res.status(404).json({"status":"FAIL"});
    }

});