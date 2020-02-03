namespace StartPortal.Car {
    interface ICarBrand {
        id: string;
        name: string;
    }
    
    interface ICarDefinitionResponse {
        brands: ICarBrand[];
        totalCount: number;
        err?: any;
    }
}