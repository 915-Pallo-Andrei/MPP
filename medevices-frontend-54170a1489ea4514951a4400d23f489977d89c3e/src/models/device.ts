export class Device {
    private id: number;
    private name: string;
    private price: number;
    private brand: string;
    private image: string;

    public constructor(id:number, name: string, price: number, brand: string, image: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.image = image;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getBrand(): string {
        return this.brand;
    }

    public getImage(): string {
        return this.image;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public setBrand(brand: string): void {
        this.brand = brand;
    }

    public setImage(image: string): void {
        this.image = image;
    }
}
