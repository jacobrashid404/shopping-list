import { describe, test, it, expect } from "vitest";
import request from "supertest";
import app from "./app.js";

import { items } from "./fakeDb";

test("/items", async function() {
  const resp = await request(app).get("/items");
  expect(resp.text).toEqual(items);
})

test("/items", async function(){
  const resp = await request(app)
    .post("/items")
    .send({name: "testName", price: 1});
  
  expect(resp.body).toEqual({name: "testName", price: 1});
  expect(resp.statusCode).toEqual(201);
})