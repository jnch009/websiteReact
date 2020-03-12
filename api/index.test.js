const index = require("./index.js");

test("Get Access Token Not Null", async () => {
  const res = await index.getAccessToken("", "", () => {});
  expect(process.env.AUTH0_ACCESS_TOKEN).not.toBe("");
});
