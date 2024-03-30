import sinon from 'sinon';

describe('Room Router', () => {
  describe('POST /api/v1/rooms', () => {
    it('should create a new room', async () => {
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
      } as any;

      const { createRoom } = await import('../src/controllers/room.controller.ts');
      await createRoom(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(sinon.match({ message: 'Room created successfully' }))).to.be.true;

      expect(res.json.calledWith(sinon.match({ data: sinon.match.object }))).to.be.true;
      expect(res.json.calledWith(sinon.match({ data: sinon.match.has('name', 'Single Room') }))).to.be.true;
    });
  });

  describe('GET /api/v1/rooms', () => {
    it('should get all rooms', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      } as any;

      const { getAllRooms } = await import('../src/services/index.service.ts');
      await getAllRooms(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match({ data: sinon.match.array }))).to.be.true;
    });
  });
});
