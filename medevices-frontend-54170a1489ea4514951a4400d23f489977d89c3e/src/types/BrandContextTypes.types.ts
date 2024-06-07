import { Brand } from "../models/brand";

export type BrandsContextType = {
    brands: Brand[];
    addBrand: (brand: Brand) => void;
    removeBrand: (brandId: number) => void;
};

export type BrandProviderType = {
    brandContext: BrandsContextType;
    children: React.ReactNode;
};