const request = require("supertest");
const express = require("express");
const app = express();
const User = require("../src/models/user.model");

describe("users endpoint", () => {

    it ("gets all users if not logged in", async() => {
        const response = await request(app).get("/users").send().expect(401);
    })
});
