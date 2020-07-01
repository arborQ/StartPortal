import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ICarBrand } from './brand.models';
import { BrandsServiceService } from '../brands-service.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.less']
})
export class BrandListComponent implements OnInit {

  constructor(private brandsServiceService: BrandsServiceService) { }
  displayedColumns = ['name', 'modelCount'];
  dataSource: ICarBrand[] = [{ id: '1', name: 'Toyota', modelCount: 10 }, { id: '2', name: 'Volvo', modelCount: 210 }];

  $brands: Observable<any[]> = of([]);

  ngOnInit(): void {
    this.$brands = this.brandsServiceService.loadManufacturers();
  }
}
