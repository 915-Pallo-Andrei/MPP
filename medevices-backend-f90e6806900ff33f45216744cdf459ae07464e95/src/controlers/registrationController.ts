import { UserDataModel } from "../models/userDataModel";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BrandModel } from "../models/deviceBrand";


export const validateLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await UserDataModel.findOne({ username: username, password: password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ username }, 'key', { expiresIn: '15m' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// If brandName exists, take the brand_id from the database
// If brandName does not exist, create a new brand and take the brand_id
export const validateRegister = async (req: Request, res: Response) => {
    const { username, password, brandName} = req.body;

    try {
        const brand = await BrandModel
            .findOne({ name: brandName })
            .select('brand_id');
        let brand_id;
        if (brand) {
            brand_id = brand.brand_id;
        } else {
            const newBrand = new BrandModel({ name: brandName });
            await newBrand.save();
            brand_id = newBrand.brand_id;
        }
        const user = await UserDataModel.findOne({ username: username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new UserDataModel({brand_id, username, password });
        await newUser.save();
        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}