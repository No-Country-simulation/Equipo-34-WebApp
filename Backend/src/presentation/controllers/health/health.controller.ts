export class server_health {
  public async server_health_controller() {
    return {
      status: 200,
      message: "Server running",
    };
  }
}
