"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
let app;
// Importing the app module asynchronously
Promise.resolve().then(() => __importStar(require('../src/server.ts'))).then((serverModule) => {
    app = serverModule.default;
    (0, mocha_1.describe)('Server', () => {
        (0, mocha_1.it)('should respond with status 200 for /api/v1 endpoint', (done) => {
            chai_1.default.request(app)
                .get('/api/v1')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
        (0, mocha_1.it)('should respond with status 404 for non-existing endpoint', (done) => {
            chai_1.default.request(app)
                .get('/non-existing-endpoint')
                .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });
});
//# sourceMappingURL=server.test.js.map