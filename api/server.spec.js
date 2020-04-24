const supertest = require("supertest");
const server = require('./server');
const db = require("../database/dbConfig");


beforeEach(async () => {
    await db("users").truncate();
  });
  
  const userData = {
    username: "fluxlog",
    password: "banana"
  };

  describe("Register", () => {
    test("register", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send(userData);
      expect(res.status).toBe(201);
    });

    test("register fail", async () => {
        const res = await supertest(server)
          .post("/api/auth/register")
          .send({ username: "coke" });
        expect(res.status).toBe(500);
      });
  
describe('test server.js', () => {
    it('should set the testing enviroment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
}); 

});

