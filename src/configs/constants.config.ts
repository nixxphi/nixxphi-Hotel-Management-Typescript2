import { Request, Response } from 'express';

export default {
    PAGENOTFOUND: (req: Request, res: Response) => res.json({
        success: false,
        message: "You're looking for a resource that does not exist"
    })
};
