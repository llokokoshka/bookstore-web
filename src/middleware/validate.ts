import { NextFunction, Request, Response } from 'express';

export const validate =
  (schema: {
    validate: (arg0: { body: any }, arg1: { abortEarly: boolean }) => any;
  }) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validate(
        {
          body: req.body,
        },
        { abortEarly: false }
      );
      next();
    } catch (err: any) {
      res.status(500).json({ type: err.name, message: err.message });
    }
  };
