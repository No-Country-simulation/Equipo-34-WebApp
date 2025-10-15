import { Get, Route } from "tsoa";
@Route("health")
export class server_health {
  @Get("/")
  public async server_health_controller() {
    return {
      status: 200,
      message: "Server running",
    };
  }
}
