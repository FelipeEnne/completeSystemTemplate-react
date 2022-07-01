const supertest = require("supertest");
const app_test_communication = require("../../index.ts");
const request = supertest(app_test_communication);

describe("Routes: communication", () => {
  beforeAll(() => {
    return app_test_communication.db.migrate
      .rollback()
      .then(() => app_test_communication.db.migrate.latest());
  });

  afterAll(function (done) {
    done();
  });

  describe("POST /communication", () => {
    test("Post a invalid communication", async () => {
      const response = await request
        .post("/communication")
        .send(
          JSON.stringify({
            sender: "sender",
            receiver: "receiver",
            communicationMessage: "message",
            deliveryDate: "2030-03-25",
            communicationFormat: ["sms", "ema"],
          })
        )
        .set("Content-type", "application/json");

      expect(response.status).toEqual(400);
    });

    test("Post a communication", async () => {
      const response = await request
        .post("/communication")
        .send(
          JSON.stringify({
            sender: "sender",
            receiver: "receiver",
            communicationMessage: "message",
            deliveryDate: "2030-03-25T01:29:21Z",
            communicationFormat: ["sms", "email"],
          })
        )
        .set("Content-type", "application/json");

      expect(response.status).toEqual(204);
    });
  });

  describe("GET /communication", () => {
    test("Should return array of communications", async () => {
      const response = await request.get("/communication");
      expect(response.headers["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(response.status).toEqual(200);
    });
  });

  describe("Delete /communication/:id", () => {
    test("Delete the fist communication", async () => {
      const response = await request.delete("/communication/1");

      expect(response.status).toEqual(204);
    });

    test("Try to delete a communication that does not exist", async () => {
      const response = await request.delete("/communication/1000");

      expect(response.status).toEqual(400);
    });
  });
});
