import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    res.status(200).send('You hit /recipe');
};
