import {Device} from '../models/device';

export type DeviceCardPropsType = {
    givenDevice: Device;
    removeMethod: (deviceId: number) => void;
};
