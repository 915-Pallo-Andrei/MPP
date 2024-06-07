import {Device} from '../models/device';

export type DevicesContextType = {
    devices: Device[];
    addDevice: (device: Device) => void;
    removeDevice: (deviceId: number) => void;
};

export type ProviderType = {
    deviceContext: DevicesContextType;
    children: React.ReactNode;
};
