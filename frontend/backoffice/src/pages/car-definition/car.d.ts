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
    
    interface ICarModel {
        id: string;
        name: string;
        fromYear: number;
        toYear: number;
        FuelType: number;
    }
}