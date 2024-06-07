import { Brand } from "../models/brand";

export type BrandFormProps = {
    idInput: React.RefObject<HTMLInputElement>;
    nameInput: React.RefObject<HTMLInputElement>;
    givenBrand?: Brand;
};