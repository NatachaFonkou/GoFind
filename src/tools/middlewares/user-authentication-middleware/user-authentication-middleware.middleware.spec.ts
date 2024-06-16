import { UserAuthenticationMiddlewareMiddleware } from "./user-authentication-middleware.middleware";

describe("UserAuthenticationMiddlewareMiddleware", () => {
  it("should be defined", () => {
    expect(new UserAuthenticationMiddlewareMiddleware()).toBeDefined();
  });
});
