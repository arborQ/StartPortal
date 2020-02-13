namespace StartPortal.Car {
    interface IManufacturer {
        id: string;
        name: string;
    }

    interface IManufacturerDetails extends IManufacturer {

    }
    
    interface IIManufacturerResponse {
        brands: IManufacturer[];
        totalCount: number;
        err?: any;
    }
}