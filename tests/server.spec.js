const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafés", () => {

    it("Validando que la ruta Get/cafés responda un 200", async () => {
        const results = await request(server).get("/cafes").send();
        expect(results.body.length).toBeGreaterThanOrEqual(1);
        expect(results.statusCode).toBe(200);
    });

    it("Validando que la ruta delete/cafés responda un 404", async () => {
        const jwt = "token";
        const idCoffee = 6
        const results = await request(server)
            .delete(`/cafes/${idCoffee}`)
            .set("Authorization", jwt)
            .send();
        expect(results.statusCode).toBe(404)
    });
    it("Validando que la ruta post/cafés responda un 201", async () => {
        const coffee = { id: 5, nombre: "Guayoyo" };
        const results = await request(server)
            .post("/cafes")
            .send(coffee);
        expect(results.statusCode).toBe(201)
        expect(results.body).toContainEqual(coffee);
    });
    it("Validando que la ruta put/cafés responda un 400", async () => {
        const coffee = { id: 6, nombre: "Mocaccino"};
        const idCoffee = 6;
        const results = await request(server)
            .put(`/cafes/${idCoffee}`)
            .send(coffee);
        expect(results.statusCode).toBe(400);
    });
});
