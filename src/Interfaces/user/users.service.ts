
// Data Model Interfaces
import { BaseUser, User } from "./user.interface";
import { Users } from "./users.interface";


// In - Memory Store
let users: Users = {
    1: {
        id: 1,
        name: "Carlos Duarte",
        login: "C.Duarte",
        password: "Abcarlos*2808*",
        situation: "Ativo"
    },
    2: {
        id: 2,
        name: "Abigail de Jesus",
        login: "A.Jesus",
        password: "biaGata",
        situation: "Ativo"
    },
    3: {
        id: 3,
        name: "Macária Duarte",
        login: "M.Duarte",
        password: "123",
        situation: "Inativo"
    }
};


// Service Methods
 export const findAll = async (): Promise<User[]> => Object.values(users);

 export const find = async (id: number): Promise<User> => users[id];

 export const create = async (newUser: BaseUser): Promise<User> => {
     
    const id = new Date().valueOf();

     users[id] = {
         id,
         ...newUser,
     };

     return users[id];
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