export interface BaseUser {
    name: string;
    login: string;
    password: string;
    situation: string;
}

export interface User extends BaseUser {
    id: number;
}