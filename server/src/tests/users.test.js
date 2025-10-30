import app from "../app.js";
import request from "supertest";
import { setupDB, teardownDB } from "./setup.js";

beforeAll(async () => {
  await setupDB();
});

afterAll(async () => {
  await teardownDB();
});

describe("Users API", () => {
  describe("GET /api/users/:id", () => {
    it("should get user by id", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name");
    });

    it("should return 404 if user does not exist", async () => {
      const res = await request(app).get("/api/users/9999");
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if id is not a number", async () => {
      const res = await request(app).get("/api/users/abc");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const res = await request(app)
      .post("/api/users")
      .send({ name: "Test User", email: "test@example.com", role: "Requester" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
    });
    
    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/users").send({ name: "No Email" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if email is invalid", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Test", email: "invalid-email", role: "Requester" });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });

    it("should return 409 if email already exists", async () => {
      await request(app)
        .post("/api/users")
        .send({ name: "Alice", email: "alice@example.com", role: "Requester" });

      const res = await request(app)
        .post("/api/users")
        .send({ name: "Alice2", email: "alice@example.com", role: "Requester" });

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("error");
    });
  })

  describe("PATCH /api/users/:id", () => {
    it("should update a user", async () => {
      const res = await request(app)
        .patch("/api/users/1")
        .send({ name: "Updated User" });
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Updated User");
    });

    it("should return 404 if user to update does not exist", async () => {
      const res = await request(app)
        .patch("/api/users/9999")
        .send({ name: "Non-existent" });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if sending invalid fields", async () => {
      const res = await request(app)
        .patch("/api/users/1")
        .send({ role: "InvalidRole" }); 

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user", async () => {
      const res = await request(app).delete("/api/users/1");
      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if user does not exist", async () => {
      const res = await request(app).delete("/api/users/9999");
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if id is invalid", async () => {
      const res = await request(app).delete("/api/users/abc");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
  
  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  })  
});
