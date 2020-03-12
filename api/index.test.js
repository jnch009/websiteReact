const index = require("./index.js");
const supertest = require("supertest");
const request = supertest(index.app);

test("Get Access Token Not Null", async () => {
  await index.getAccessToken({}, {}, () => {
    expect(process.env.AUTH0_ACCESS_TOKEN).not.toBe("");
  });
});

test("Testing getUsers", async done => {
  const get = await request.get("/getUsers");
  expect(get.status).toBe(200);
  done();
});

test("Test fail getting user", async done => {
  const id = "123";
  const get = await request.get("/getUsers/" + id);
  expect(get.status).toBe(404);
  done();
});
