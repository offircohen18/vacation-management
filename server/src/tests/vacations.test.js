import app from "../app.js";
import request from "supertest";
import { setupDB, teardownDB } from "./setup.js";

beforeAll(async () => {
  await setupDB();
});

afterAll(async () => {
  await teardownDB();
});

describe("Vacations API", () => {
  describe("POST /api/vacations", () => {
    it("should create a vacation request", async () => {
      const res = await request(app)
        .post("/api/vacations")
        .send({
          userId: 1,
          startDate: "2025-11-01",
          endDate: "2025-11-05",
          reason: "Holiday",
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/vacations").send({
        userId: 1,
        startDate: "2025-11-01",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if startDate > endDate", async () => {
      const res = await request(app).post("/api/vacations").send({
        userId: 1,
        startDate: "2025-11-10",
        endDate: "2025-11-05",
        reason: "Invalid date",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 404 if userId does not exist", async () => {
      const res = await request(app).post("/api/vacations").send({
        userId: 9999,
        startDate: "2025-11-01",
        endDate: "2025-11-05",
        reason: "Unknown user",
      });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /api/vacations", () => {
    it("should get all vacations", async () => {
      const res = await request(app).get("/api/vacations");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/vacations/user/:id", () => {
    it("should get vacations by user", async () => {
      const res = await request(app).get("/api/vacations/user/1");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should return 404 if user does not exist", async () => {
      const res = await request(app).get("/api/vacations/user/9999");
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if user id is invalid", async () => {
      const res = await request(app).get("/api/vacations/user/abc");
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("PATCH /api/vacations/:id/status", () => {
    it("should update vacation status", async () => {
      const res = await request(app)
        .patch("/api/vacations/1/status")
        .send({ status: "Approved", comments: "Enjoy!" });
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("Approved");
    });

    it("should return 404 if vacation does not exist", async () => {
      const res = await request(app)
        .patch("/api/vacations/9999/status")
        .send({ status: "Approved" });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if status is invalid", async () => {
      const res = await request(app)
        .patch("/api/vacations/1/status")
        .send({ status: "NotAStatus" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if vacation id is invalid", async () => {
      const res = await request(app)
        .patch("/api/vacations/abc/status")
        .send({ status: "Approved" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});
