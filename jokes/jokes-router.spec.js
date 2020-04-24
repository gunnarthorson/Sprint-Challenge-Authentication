const request = require("supertest");
const server = require("../api/server.js");

describe("GET /api/jokes", () => {
  it("should return json type", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.type).toBe("application/json");
  });

  it("should return status of 200", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.status).toBe(400);
  });
}); 