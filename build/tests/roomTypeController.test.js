"use strict";
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
const chai_1 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const roomType_controller_ts_1 = __importDefault(require("../controllers/roomType.controller.ts"));
const { expect } = chai_1.default;
describe('RoomType Controller', () => {
    describe('createRoomType', () => {
        it('should create a new room type', () => __awaiter(void 0, void 0, void 0, function* () {
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
            yield roomType_controller_ts_1.default.createRoomType(req, res);
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(sinon_1.default.match({ message: 'Room type created successfully... yay' }))).to.be.true;
        }));
    });
});
//# sourceMappingURL=roomTypeController.test.js.map