const request = require("supertest");
const db = require("../database/dbConfig.js");
const User = require("../users/user-model.js");
const server = require("../api/server.js");

describe("user model", () => {
    it("shoud test user regiations", async () => {
      User.add({ username: "fluxlog", password: "banana" });
  
      const users = await db("users");
      expect(users).toHaveLength(1);

    });

      it("should test user logging in", async () => {});

      describe("should test registring and loggin in", () => {
        it("should register users", async () => {
          const newUser = { username: "fluxlog", password: "banana" };
          const res = await request(server)
            .post("/api/auth/register")
            .send(newUser);
          expect(res.status).toBe(201);
        });

        it("should test the login function", async () => {
            const creds = { username: "fluxlog", password: "banana" };
            const res = await request(server)
              .post("/api/auth/login")
              .send(creds);
              expect(res.status).toBe(401);
            });
          });
        });
        
        beforeEach(async () => {
          await db("users").truncate();
        }); 