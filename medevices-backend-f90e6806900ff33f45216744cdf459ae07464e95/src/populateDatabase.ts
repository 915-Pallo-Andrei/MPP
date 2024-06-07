import { BrandsRepository } from "./repositories/brandsRepository";
import { DevicesRepository } from "./repositories/deviceRepository";

export async function populateDatabase(devicesRepository: DevicesRepository, 
                                        brandsRepository: BrandsRepository ) {
    for (let i = 0; i < 1000; i++) {
        const brand = await brandsRepository.createBrand();
        brandsRepository.addBrand(brand);
        console.log("#" +  i.toString() + " " + brand.name.toString() + " was created!\n");
    }

    for (let i = 0; i < 10000; i++) {
        const device = await devicesRepository.createDevice();
        devicesRepository.addDevice(device);
        console.log("#" +  i.toString() + " " + device.name.toString() + " was created for " + device.brand.toString() + "!\n");
    }
    
}
