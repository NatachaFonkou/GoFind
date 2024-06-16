import { Controller, Get, Headers } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiHeader } from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiHeader({ name: "user", description: "l'utilisateur courant" })
  @Get()
  getHello(@Headers() headers: Record<string, string>) {
    return {
      message: this.appService.getHello(),
      headers,
    };
  }

  @Get("/config")
  getConfig() {
    // toutes les methodes sont sécurisées sauf les GET
    // il est possible de retirer la securité sur un element en precisant dans except
    return {
      prefix: process.env.API_PREFIX,
      excepts: { POST: [], PATCH: [], DELETE: [] },
    };
  }
}
