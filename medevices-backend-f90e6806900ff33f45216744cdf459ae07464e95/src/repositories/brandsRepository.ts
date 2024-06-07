import { faker } from "@faker-js/faker";
import { BrandModel, IBrand } from "../models/deviceBrand";


export class BrandsRepository {

    public async getBrands(): Promise<IBrand[]> {
        try {
            const brands = await BrandModel.find({});
            return brands;
        } catch (error) {
            console.error('Error getting brands:', error);
            return [];
        }
    }

    public async addBrand(brandData: any): Promise<IBrand> {
        const brand = new BrandModel(brandData);
        const savedBrand = await brand.save();
        return savedBrand;
    }

    public async createBrand(): Promise<IBrand> {
        const name = faker.company.name();
        const brandData = {
            name: name
        };
        const brand = new BrandModel(brandData);
        const savedBrand = await brand.save();
        return savedBrand;
    }
}