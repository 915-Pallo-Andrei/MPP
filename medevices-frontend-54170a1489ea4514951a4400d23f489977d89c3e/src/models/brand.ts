export class Brand {
    private brand_id: number;
    private name: string;

    public constructor(id:number, name: string) {
        this.brand_id = id;
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