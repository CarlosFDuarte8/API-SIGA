// Data Model Interfaces
import { promises as fs } from 'fs';
import { BaseMenu, Menu, JsonProps } from "./menu.interface";
import { Menus } from "./menus.interface";

// In - get from json

let { menus } = require('../../db/menu.json');
const { readFile, writeFile } = fs;

// Service Methods
export const findAll = async (): Promise<Menu[]> => Object.values(menus);

export const find = async (id: number): Promise<Menu> => menus[id];

export const create = async (newMenu: BaseMenu): Promise<Menu | unknown> => {
  const file: string = 'src/db/menu.json';
  const prevJson = JSON.parse(await readFile(file, "utf-8"));

  try {
    let menu: Menu = newMenu;
    const json: JsonProps = { ...prevJson };

    menu = { id: json.nextId++, ...menu }

    json.menus.push(menu);
    await writeFile(file, JSON.stringify(json, null, 2));
    return menu;
  } catch (error: any) {
    await writeFile(file, JSON.stringify(prevJson, null, 2));
    console.warn('Error: ', error);
  };
  return null;
}

export const update = async (id: number, menuUpdate: BaseMenu): Promise<Menu | null> => {

  const menu = await find(id);

  if (!menu) {
    return null;
  }

  menus[id] = {
    id,
    ...menuUpdate
  };

  return menus[id];
}

export const remove = async (id: number): Promise<null | void> => {

  const menu = await find(id);

  if (!menu) {
    return null;
  }

  delete menus[id];
}
