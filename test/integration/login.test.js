require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);

    await User.deleteMany();

    await User.create({
      email: "testUser1@gmail.com",
      password: "12345678",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
  });

  test("should return status 200", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "testUser1@gmail.com",
      password: "12345678",
    });

    expect(response.statusCode).toBe(200);
  });

  test("should return user token", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "testUser1@gmail.com",
      password: "12345678",
    });

    expect(response.body.data.token).toBeTruthy();
    expect(typeof response.body.data.token).toBe("string");
  });

  test("should return correct user object", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "testUser1@gmail.com",
      password: "12345678",
    });

    expect(response.body.data.user).toBeDefined();
    expect(typeof response.body.data.user.email).toBe("string");
    expect(typeof response.body.data.user.subscription).toBe("string");
  });
});
