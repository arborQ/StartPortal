declare namespace StartApp.Manufacturers {
    interface IManufacturer {
        id: string;
        name: string;
    }

    interface IManufacturersResponse {
        brands : IManufacturer[]
    }
}
