import { Request, Response } from 'express';
import { DevicesRepository } from '../repositories/deviceRepository';
import { Device } from '../models/device';
import { DeviceModel } from '../models/deviceModel';
import { BrandModel } from '../models/deviceBrand';
import { UserDataModel } from '../models/userDataModel';



export const devices = new DevicesRepository();

export const getDevices = async (req: Request, res: Response) => {
    try{
        const page = parseInt(req.query.page as string) || 0;
        const allDevices = await devices.getDevices(page);
        res.json(allDevices);
    }
    catch(error){
        console.error('Error getting devices:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getDeviceById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const device = await DeviceModel.find({ id: id });
    if (device.length > 0) {
        return res.status(200).json(device);
    } else {
        res.status(404).send('Device not found');
    }
};

// Get Devices by user_id (in the url i'll pass the username)
export const getDevicesByUser = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 0;
    const pageSize = 10;
    const username = req.params.username;
    const user = await UserDataModel.findOne({username: username});
    if (!user) {
        const allDevices = await devices.getDevices(page);
        res.json(allDevices);
    } else {
        const brand = await BrandModel.findOne({ brand_id: user.brand_id });
        if (!brand) {
            res.status(404).send('Brand not found');
        }
        else {
            const devices = await DeviceModel.find({ brand: brand.name })
            .skip(page * pageSize)
            .limit(pageSize);
            if (devices.length > 0) {
                res.json(devices);
            } else {
                res.status(404).send('Devices not found');
            }
        }
    }
}

export const addDevice = async (req: Request, res: Response) => {
    try {
        const { name, price, brand, image } = req.body;
        const newDevice = new Device(
            name,
            price,
            brand,
            image
        );
        devices.addDevice(newDevice);
        return res.status(201).json(newDevice);
    } catch (error) {
        console.error('Error adding device:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const deleteDevice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const device = await DeviceModel.findOne({ id: id });
    if (!device) {
        res.status(404).send('Device not found');
    } else {
        await device.deleteOne();
        res.status(204).send();
    }
}

export const updateDevice = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const device: any = await DeviceModel.findOne({ id: id });
    if (device.length === 0) {
        res.status(404).send('Device not found');
    } else {
        const newBrand = await BrandModel.findOne({name: req.body.brand});
        if (!newBrand) {
            const addBrand = new BrandModel({ name: req.body.brand });
            await addBrand.save();;
        }

        const { name, price, brand, image } = req.body;
        device.name = name;
        device.price = price;
        device.brand = brand;
        device.image = image;

        await device.save();
        res.json(device);
    }
}