// Required External Modules and Interfaces
import express, { Request, Response } from "express";
import * as MenuService from '../Interfaces/menu/menus.service';
import { BaseMenu, Menu } from "../Interfaces/menu/menu.interface";

// Router Definition
export const menusRouter = express.Router();


// Controller Definitions

// GET menus
menusRouter.get("/", async (req: Request, res: Response) => {

    try {
        const menus: Menu[] = await MenuService.findAll();

        res.status(200).send(menus);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET menus/:id

menusRouter.get("/:id", async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10);

    try {

        const menu: Menu = await MenuService.find(id);

        if (menu) {
            return res.status(200).send(menu);
        }

        res.status(404).send("menu not found");
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST menus
menusRouter.post("/", async (req: Request, res: Response) => {
    try {
        const menu: BaseMenu = req.body;

        const newMenu: Menu | unknown = await MenuService.create(menu);

        res.status(201).json(newMenu);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT items/:id

menusRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const menuUpdate: Menu = req.body;

        const exitingMenu: Menu = await MenuService.find(id);

        if (exitingMenu) {

            const updateMenu = await MenuService.update(id, menuUpdate);
            return res.status(200).json(updateMenu);
        }

        const newMenu = await MenuService.create(menuUpdate);

        res.status(201).json(newMenu);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE items/:id
menusRouter.delete("/:id", async (req: Request, res: Response) => {

    try {
        const id: number = parseInt(req.params.id, 10);
        await MenuService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
})
