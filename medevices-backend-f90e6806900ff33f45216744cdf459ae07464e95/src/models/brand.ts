export class Brand {
    private static nextId = 1;
    private brand_id: number;
    private name: string;

    public constructor(name: string) {
        this.brand_id = Brand.nextId++;
        this.name = name;
    }

    public getId(): number {
        return this.brand_id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}