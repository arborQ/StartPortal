namespace StartPortal.Car {
    interface IManufacturer {
        id: string;
        name: string;
    }
    
    interface IIManufacturerResponse {
        brands: IManufacturer[];
        totalCount: number;
        err?: any;
    }
}