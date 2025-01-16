import { Request, Response } from "express";
import { SERVICE } from "../services/services.js";

export const CONTROLLERS = {
    renderBoard : async(req: Request, res: Response): Promise<void> => {
        
        res.render("index");
    },
    downloadCSV : async(req: Request, res: Response): Promise<void> => {
        const jsonFile = req.file?.buffer.toString();
        
        if (!jsonFile) {
            res.status(400).json({ error: "No JSON file provided" });
            return;
        }          
        const csvData = await SERVICE.downloadCSV(jsonFile);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=trello_board.csv");
        res.send(csvData);
    },
    holaMundo: async(req: Request, res: Response): Promise<void> => {
        res.send("Hola Mundo");
    }

}
