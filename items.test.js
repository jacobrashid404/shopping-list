import { describe, test, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

import { items } from "./fakeDb";

describe("GET /items ", function () {

  test("returns all items in 'db'", async function () {
    const resp = await request(app).get("/items");
    expect(resp.text).toEqual(items);
  });
});

describe("POST /items", function () {
  test("adding adding an item to the DB", async function () {
    const resp = await request(app)
      .post("/items")
      .send({ name: "testName", price: 1 });

    expect(resp.body).toEqual({ name: "testName", price: 1 });
    expect(resp.statusCode).toEqual(201);
  });

  test("Test that we throw an NotFound err when we send incorrect URL params",
    async function () {
      const resp = await request(app)
        .post("/items")
        .send({ random: "testName", bad: 1 });

      expect(resp.statusCode).toEqual(404);
    });
});
