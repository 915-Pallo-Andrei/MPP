import { de, faker } from '@faker-js/faker';
import { DeviceModel, IDevice } from '../models/deviceModel';
import { BrandModel } from '../models/deviceBrand';


const medicalDeviceNames = [
    'Heart Monitor',
    'Blood Pressure Monitor',
    'Pulse Oximeter',
    'Ventilator',
    'Defibrillator',
    'Ultrasound Machine',
    'MRI Machine',
    'CT Scanner',
    'X-Ray Machine',
    'Dialysis Machine'
];


export class DevicesRepository{

    public async addDevice(deviceData: any): Promise<IDevice> { 
        const brand = await BrandModel.findOne({name: deviceData.brand});
        if (!brand) {
            throw new Error('Inexistent brand');
        }
        const device =  new DeviceModel(deviceData);
        const savedDevice = await device.save();
        return savedDevice;
    }

    public async createDevice(): Promise<IDevice> {

        const count = await BrandModel.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const existingBrand = await BrandModel.findOne().skip(randomIndex);

        const name = medicalDeviceNames[faker.number.int({ min: 0, max: medicalDeviceNames.length - 1 })];
        const price = parseFloat(faker.commerce.price());
        const brand = existingBrand?.name;
        const image = `https://source.unsplash.com/300x300/?${name}`;
        
        const deviceData = {
            name: name,
            price: price,
            brand: brand,
            image: image
        };
    
        const device =  new DeviceModel(deviceData);
        const savedDevice = await device.save();
        return savedDevice;
    }

    public async getDevices(page: number): Promise<IDevice[]> {
        try {
            const pageSize = 50;
            const skip = page * pageSize;

            const devices = await DeviceModel.find({})
                                    .skip(skip)
                                    .limit(pageSize);
            return devices;
        } catch (error) {
            console.error('Error getting devices:', error);
            return [];
        }
    }
}

