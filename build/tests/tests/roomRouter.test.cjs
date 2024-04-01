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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
describe('Room Router', () => {
    describe('POST /api/v1/rooms', () => {
        it('should create a new room', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {
                body: {
                    name: 'Single Deluxe',
                    description: 'Single air-conditioned room with WiFi access.',
                    capacity: 2,
                    beds: 1,
                    price: 6800,
                    amenities: 'Wifi, air conditioning and a fully functional bathroom',
                    image: 'room.jpg',
                    isAvailable: true
                }
            };
            const res = {
                status: sinon_1.default.stub().returnsThis(),
                json: sinon_1.default.spy()
            };
            yield Promise.resolve().then(() => __importStar(require('../src/controllers/roomController'))).then(({ createRoom }) => {
                createRoom(req, res);
            });
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(sinon_1.default.match({ message: 'Room created successfully' }))).to.be.true;
            expect(res.json.calledWith(sinon_1.default.match({ data: sinon_1.default.match.object }))).to.be.true;
            expect(res.json.calledWith(sinon_1.default.match({ data: sinon_1.default.match.has('name', 'Single Room') }))).to.be.true;
        }));
    });
    describe('GET /api/v1/rooms', () => {
        it('should get all rooms', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = {};
            const res = {
                status: sinon_1.default.stub().returnsThis(),
                json: sinon_1.default.spy()
            };
            yield Promise.resolve().then(() => __importStar(require('../src/services/roomService'))).then(({ getAllRooms }) => {
                getAllRooms(req, res);
            });
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(sinon_1.default.match({ data: sinon_1.default.match.array }))).to.be.true;
        }));
    });
});
//# sourceMappingURL=roomRouter.test.cjs.map