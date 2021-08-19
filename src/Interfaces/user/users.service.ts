
// Data Model Interfaces
import { BaseUser, User } from "./user.interface";
import { Users } from "./users.interface";
import { promises as fs } from 'fs';


// In - get from json

// let users = require('../../db/users.json');
let users = '../../db/users.json';
const { readFile, writeFile } = fs;


// Service Methods
export const findAll = async (): Promise<User[]> => Object.values(users);

export const find = async (id: number): Promise<User> => users[id];

export const create = async (newUser: BaseUser): Promise<any> => {
    const user = newUser;
    // const json = JSON.parse(await readFile(users, "utf-8"));
    console.log(await readFile(users, "utf-8"));

    // const id = new Date().valueOf();

    // users[id] = {
    //     id,
    //     ...newUser,
    // };

    // return users[id];
}

export const update = async (id: number, userUpdate: BaseUser): Promise<User | null> => {

    const user = await find(id);

    if (!user) {
        return null;
    }

    users[id] = {
        id,
        ...userUpdate
    };

    return users[id];
}

export const remove = async (id: number): Promise<null | void> => {

    const user = await find(id);

    if (!user) {
        return null;
    }

    delete users[id];
}