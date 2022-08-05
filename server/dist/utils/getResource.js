"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function getResource(path, fields) {
    return (0, node_fetch_1.default)(path)
        .then(res => res.json())
        .then(data => {
        const resource = createResourceUsingFields(data, fields);
        return resource;
    })
        .catch((e) => {
        console.log(e);
        return Promise.reject(null);
    });
}
exports.default = getResource;
function createResourceUsingFields(data, fields) {
    return fields.reduce((acc, field) => {
        if (field in data) {
            acc[field] = data[field];
            return acc;
        }
        return acc;
    }, {});
}
//# sourceMappingURL=getResource.js.map