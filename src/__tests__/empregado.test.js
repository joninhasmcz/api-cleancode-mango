const request = require("supertest");
const app = require("../app");
const  { MongoMemoryServer } = require("mongodb-memory-server");
const Empregado = require("../models/Empregado");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Empregado.deleteMany({});
});

describe("Empregado Rotas Api", () => {
    it("Deve criar um novo empregado", async () => {
        const res = await request(app).post("/api/empregados").send({
                nome: "João",
                cargo: "Diarista",
                salario: "5000",
            });
        expect(res.statusCode). toBe(201);
        expect(res.body.nome).toBe("João");
    });
    it("Deve listar todos os empregados", async () => {
        await Empregado.create({
            nome: "Maria",
            cargo: "Gerente",
            salario: "7000",
        });
        await Empregado.create({
            nome: "Pedro",
            cargo: "Diarista",
            salario: "6000",
        });

        const res = await request(app).get("/api/empregados");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body[0].nome).toBe("Maria");
    });
});