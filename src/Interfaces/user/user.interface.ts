export interface BaseUser {
    name: string;
    login: string;
    password: string;
    situation: boolean;
}

export interface User extends BaseUser {
    id?: number;
}

export interface JsonProps {
  nextId: number;
  users: User[];
}
