require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { app } = require("../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);

    await User.deleteMany().exec();

    const testPassword = "12345678";

    const hashPassword = await bcrypt.hash(testPassword, 10);

    await User.create({
      email: "testUser1@gmail.com",
      password: hashPassword,
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

    expect(response.body.token).toBeTruthy();
    expect(typeof response.body.token).toBe("string");
  });

  test("should return correct user object", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "testUser1@gmail.com",
      password: "12345678",
    });

    expect(response.body.user).toBeDefined();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
