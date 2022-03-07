import { Request, Response } from 'express';

export type Context = {
    // @ts-ignore
    req: Request & { session?: Express.Session };
    res: Response;
}