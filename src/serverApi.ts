import {delay} from "./helpers";

const basicUrl = 'http://localhost:4000/';

export function getAllContacts():Promise<any> {
    return fetch(basicUrl+'contacts').then((res)=>{
         return res.json();
    });
}

export function signUp(user):Promise<any>{
    return fetch(basicUrl+'contacts/sign-up', {
        method:'POST',
        body: JSON.stringify(user),
        headers: {'content-type': 'application/json'}
    })
    .then((res)=>{
        console.log(res);
        return res.json();
    })
}

export async function login(user):Promise<any>{
    return await fetch(basicUrl+'contacts/login', {
        method:'POST',
        body: JSON.stringify(user),
        headers: {'content-type': 'application/json'}
    })
        .then((res)=>{
            return res.json();
        })
}

export async function updateContact(contact: Contact) {
    await delay(2500);
    // throw new Error(`Contact ${contact.id} does not exist`);
}

export interface Contact {
    id: number;
    name: string;
}
