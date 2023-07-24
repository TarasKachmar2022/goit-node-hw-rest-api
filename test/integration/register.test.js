require("dotenv").config();

const supertest = require("supertest");
const mongoose = require("mongoose");
const { app } = require("./../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_HOST } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);

    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/api/auth/register").send({
      email: "testUser1@gmail.com",
      password: "12345678",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.data.user.email).toBe("testUser1@gmail.com");
  });

  it("should not register the same user 2 times", async () => {
    await supertest(app).post("/api/auth/register").send({
      email: "testUser2@gmail.com",
      password: "12345678",
    });

    const response = await supertest(app).post("/api/auth/register").send({
      email: "testUser2@gmail.com",
      password: "12345678",
    });

    expect(response.statusCode).toBe(409);
  });
});
