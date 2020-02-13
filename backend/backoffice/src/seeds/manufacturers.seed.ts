import { IManufacturer, collectionName } from '../repositories/manufacturers.repository';

const manufacturers = 'Acura|Alfa-Romeo|Aston-Martin|Audi|Bentley|BMW|Bugatti|Buick|Cadillac|Chevrolet|Chrysler|Citroen|Dodge|Ferrari|Fiat|Ford|Geely|Genesis|GMC|Honda|Hyundai|Infiniti|Jaguar|Jeep|Kia|Koenigsegg|Lamborghini|Lancia|Land Rover|Lexus|Lincoln|Lotus|Maserati|Maybach|Mazda|Mclaren|Mercedes|Mini|Mitsubishi|Nissan|Opel|Pagani|Peugeot|Pontiac|Porsche|Ram|Renault|Rolls-Royce|Skoda|Smart|Subaru|Suzuki|Tesla|Toyota|Volkswagen|Volvo|Abarth|AC Cars|AC Schnitzer|Alpina|Alpine|Ariel|Arrinera Automotive|Artega|BAC|Bertone|Brabus|BYD|Callaway|Caparo|Caterham|Cupra|Dacia|Daihatsu|Datsun|Delorean Motor Company (DMC)|DeltaWing Racing Cars|De Tomaso|Donkervoort|Fiat Chrysler Automobiles|Fisker|General Motors (GM)|Ginetta|GM (General Motors)|GTA|Gumpert|Holden|Holden Special Vehicles|Hummer|Isuzu|Italdesign Giugiaro|Karma|KTM|Lynk & Co|Mahindra |Mercury|MG Motors|Mitsuoka|Morgan|Mosler|Noble|Panoz|Pininfarina|Plymouth|Polaris|Polestar|Radical Sportscars|Rezvani|Rimac Automobile|Rinspeed|Rivian|Saab|Saleen|Saturn|SCG|Scion|Seat|Shelby|Spyker|SRT|SsangYong|SSC|Tata|Tvr|Ultima|Vauxhall|Venturi|Wiesmann|Zagato|Zenvo';

const documents: Partial<IManufacturer>[] = manufacturers.split('|').map((name) => ({ name }));

export default {
    name: collectionName,
    documents
};
