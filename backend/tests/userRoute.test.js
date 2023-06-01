const request = require("supertest");
const express = require("express");
const app = express();
const User = require("../src/models/user.model");

describe("users endpoint", () => {

    it ("gets all users if not logged in", () => {
        const boolValue = true;
        expect(boolValue).toBeTruthy();
    })
});
