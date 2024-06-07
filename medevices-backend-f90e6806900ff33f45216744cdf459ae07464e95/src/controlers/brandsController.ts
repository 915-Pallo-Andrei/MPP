import { Request, Response } from 'express';
import { DeviceModel } from '../models/deviceModel';
import { Brand } from '../models/brand';
import { BrandsRepository } from '../repositories/brandsRepository';
import { BrandModel } from '../models/deviceBrand';
import { UserDataModel } from '../models/userDataModel';


export const brands = new BrandsRepository();

// Get all brands
export const getBrands = async (req: Request, res: Response) => {
    try {
        const allBrands = await brands.getBrands();
        res.json(allBrands);
      } catch (error) {
        console.error('Error getting brands:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

// Get all devices by brand name
export const getDevicesByBrand = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 15;
    const brand_id = req.params.brandid;
    const brand = await BrandModel.findOne({ brand_id: brand_id});
    if(!brand) {
        res.status(404).send('Brand not found');
    } else {
        const devices = await DeviceModel.find({ brand: brand.name })
                                        .skip((page - 1) * pageSize)
                                        .limit(pageSize);
        if (devices.length > 0) {
            res.json(devices);
        } else {
            res.status(404).send('Devices not found');
        }
    }
}

// Get brand by id
export const getBrandById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const brand = await BrandModel.find({ brand_id: id });
    if (brand.length > 0) {
        res.json(brand);
    } else {
        res.status(404).send('Brand not found');
    }
};

// Get brands whose id's are not in the UserDataModel
export const getBrandsUnregistered = async (req: Request, res: Response) => {
    const userDataBrands = (await UserDataModel.distinct('brand_id')).map(id => id.toString());
    const brandsNotInUserData = await BrandModel.find({ brand_id: { $nin: userDataBrands } });
    res.json(brandsNotInUserData);
}

// Add a brand
export const addBrand = async (req: Request, res: Response) => {
    try {
        const {  name } = req.body;
        const newBrand = new Brand(
            name
        );
        brands.addBrand(newBrand);
        return res.status(201).json(newBrand);
    } catch (error) {
        console.error('Error adding device:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

// Delete a brand
export const deleteBrand = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const brand = await BrandModel.findOne({ brand_id: id });
    if (!brand) {
        res.status(404).send('Brand not found');
    } else {
        await brand.deleteOne();
        res.status(204).send();
    }
}

// Update a brand
export const updateBrand = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const brand: any = await BrandModel.findOne({ brand_id: id });
    if (brand.length === 0) {
        res.status(404).send('Brand not found');
    } else {
        const { name } = req.body;
        brand.name = name;

        await brand.save();
        res.json(brand);
    }
}