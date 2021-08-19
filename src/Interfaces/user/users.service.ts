// Data Model Interfaces
import { promises as fs } from 'fs';
import { BaseUser, User, JsonProps } from "./user.interface";
import { Users } from "./users.interface";

// In - get from json

let { users } = require('../../db/users.json');
const { readFile, writeFile } = fs;

// Service Methods
export const findAll = async (): Promise<User[]> => Object.values(users);

export const find = async (id: number): Promise<User> => users[id];

export const create = async (newUser: BaseUser): Promise<User | unknown> => {
  const file: string = 'src/db/users.json';
  const prevJson = JSON.parse(await readFile(file, "utf-8"));

  try {
    let user: User = newUser;
    const json: JsonProps = { ...prevJson };

    user = { id: json.nextId++, ...user }

    json.users.push(user);
    await writeFile(file, JSON.stringify(json, null, 2));
    return user;
  } catch (error: any) {
    await writeFile(file, JSON.stringify(prevJson, null, 2));
    console.warn('Error: ', error);
  };
  return null;
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
