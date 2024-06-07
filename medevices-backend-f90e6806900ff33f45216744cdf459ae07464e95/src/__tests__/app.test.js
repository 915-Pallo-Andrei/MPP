const request = require("supertest");
const app = require("../app");

const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI || 
'mongodb+srv://goiararesdan:ZqJAiP3zFsyna0Qk@medicaldatabase.kkiup4i.mongodb.net/?retryWrites=true&w=majority&appName=MedicalDatabase';;

beforeAll(async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error disconnecting from MongoDB Atlas:', error);
  }
});


describe('API Tests', () => {
    let createdDeviceId;

    test('should return a list of devices', async () => {
        const response = await request(app).get('/api/devices');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should create a new device', async () => {
        const newDevice = {
            name: 'Test Device',
            price: 100,
            brand: 'test',
            image: 'test.jpg',
        };

        const response = await request(app).post('/api/addDevice').send(newDevice);
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty('id');
        createdDeviceId = response.body.id;
    });

    test('should get a specific device by ID', async () => {
        const response = await request(app).get(`/api/devices/${createdDeviceId}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual('Test Device');
        expect(response.body.price).toEqual(100);
        expect(response.body.brand).toEqual('test');
        expect(response.body.image).toEqual('test.jpg');
      });

    test('should update an existing device', async () => {
        const updatedDevice = {
            name: 'Updated Device',
            price: 100,
            brand: 'test',
            image: 'test1.jpg',
        };

        const response = await request(app)
            .put(`/api/devices/${createdDeviceId}`)
            .send(updatedDevice);
        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual('Updated Device');
        expect(response.body.price).toEqual(100);
        expect(response.body.brand).toEqual('test');
        expect(response.body.image).toEqual('test1.jpg');
    });

    test('should delete an existing device', () => {
        return request(app)
            .delete(`/api/devices/${createdDeviceId}`)
            .then(response => {
                expect(response.statusCode).toEqual(204);
            });
    });
    
    test('should return 404 for non-existing test', () => {
        const nonExistingId = '11111';
        return request(app)
            .get(`/api/devices/${nonExistingId}`)
            .then(res => {
                expect(res.statusCode).toEqual(404);
            });
    });
}); 
