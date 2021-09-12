export interface BaseMenu {
  icon: string;
  title: string;
  path: string
  subTitle1: string;
  subTitle2: string;
}

export interface Menu extends BaseMenu {
  id?: number;
}

export interface JsonProps {
  nextId: number;
  menus: Menu[];
}
