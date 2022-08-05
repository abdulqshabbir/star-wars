"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const getResource_1 = __importDefault(require("./utils/getResource"));
const getResources_1 = __importDefault(require("./utils/getResources"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
exports.BASE_URL = "https://swapi.dev/api";
process.env.NODE_ENV = "development";
app.get("/api/person/:name", (req, res) => {
    const personName = req.params.name;
    (0, node_fetch_1.default)(`${exports.BASE_URL}/people/?search=${personName}`)
        .then(res => res.json())
        .then(async (data) => {
        if (data.count !== 1) {
            return res.status(400).json({
                error: `Could not find a unique person with name ${personName}`
            });
        }
        const person = data.results[0];
        return res.status(200).json({
            name: person.name,
            gender: person.gender,
            eyeColor: person.eye_color,
            birthYear: person.birth_year,
            homeworld: await (0, getResource_1.default)(person.homeworld, ["name"]),
            films: await (0, getResources_1.default)(person.films, ["title", "episode_id"]),
        });
    })
        .catch(e => {
        console.log(e);
        return res.status(500).json({
            error: "Internal Server Error."
        });
    });
});
app.get("/api/people/:searchParams", (req, res) => {
    const params = new URLSearchParams(req.params.searchParams);
    const pageNumber = params.get("pageNumber");
    const name = params.get("name");
    (0, node_fetch_1.default)(`${exports.BASE_URL}/people?search=${name}&page=${pageNumber}`)
        .then(res => res.json())
        .then((data) => {
        if (data.count === 0) {
            return res.status(400).json({ error: "No search results matching your criterion.", count: 0, previous: null, next: null, results: [] });
        }
        return res.status(200).json(data);
    })
        .catch(e => {
        console.log(e);
        return res.status(500).json({
            error: "Internal Server Error."
        });
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map