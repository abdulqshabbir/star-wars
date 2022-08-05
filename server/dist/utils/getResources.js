"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function getResources(paths, fields) {
    return Promise
        .all([
        ...paths.map(path => (0, node_fetch_1.default)(path))
    ])
        .then(responses => {
        return Promise.all([
            ...responses.map(response => response.json())
        ]);
    })
        .then(dataArray => {
        const resources = createResourcesUsingFields(dataArray, fields);
        return resources;
    }).catch(e => {
        console.log(e);
        return null;
    });
}
exports.default = getResources;
function createResourcesUsingFields(dataArray, fields) {
    const resources = [];
    for (let data of dataArray) {
        const resource = fields.reduce((acc, field) => {
            if (field in data) {
                acc[field] = data[field];
                return acc;
            }
            return acc;
        }, {});
        resources.push(resource);
    }
    return resources;
}
//# sourceMappingURL=getResources.js.map