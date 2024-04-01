import chai from 'chai';
import sinon from 'sinon';
import RoomType from '../models/RoomType';
import roomTypeController from '../controllers/roomTypeController';

const { expect } = chai;

describe('RoomType Controller', () => {
    describe('createRoomType', () => {
        it('should create a new room type', async () => {
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
                status: sinon.stub().returnsThis(),
                json: sinon.spy()
            };
            await roomTypeController.createRoomType(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(sinon.match({ message: 'Room type created successfully... yay' }))).to.be.true;
        });
    });
});
