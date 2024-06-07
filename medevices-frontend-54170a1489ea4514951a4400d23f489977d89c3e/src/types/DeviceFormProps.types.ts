import {Device} from '../models/device';

export type DeviceFormProps = {
    idInput: React.RefObject<HTMLInputElement>;
    nameInput: React.RefObject<HTMLInputElement>;
    priceInput: React.RefObject<HTMLInputElement>;
    brandInput: React.RefObject<HTMLInputElement>;
    imageInput: React.RefObject<HTMLInputElement>;
    givenDevice?: Device;
};
