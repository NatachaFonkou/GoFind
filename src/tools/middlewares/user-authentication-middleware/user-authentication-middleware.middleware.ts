import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class UserAuthenticationMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (!req.headers.users)
      throw new BadRequestException(
        "Le propriétaire n'a pas été precisé correctement",
      );

    if (typeof req.headers.users !== "string")
      throw new BadRequestException("L'ID de l'utilisateur est incorrect");

    const user = Number.parseInt(req.headers.users);
    if (Number.isNaN(user))
      throw new BadRequestException("L'ID de l'utilisateur est incorrect");

    res.locals.user = user;
    next();
  }
}
