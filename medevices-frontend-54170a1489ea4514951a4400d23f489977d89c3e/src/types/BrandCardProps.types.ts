import { Brand } from "../models/brand";

export type BrandCardPropsType = {
    givenBrand: Brand;
    removeMethod: (brandId: number) => void;
};