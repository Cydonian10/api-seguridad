import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValition = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        req.query = validatedData.query || req.query;
        req.params = validatedData.params || req.params;

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(404).json(
                error.issues.map((issue) => ({
                    path: issue.path,
                    message: issue.message,
                }))
            );
        }
        return res.status(400).json({ message: "internal server error" });
    }
};