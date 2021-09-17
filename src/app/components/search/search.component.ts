import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/app.interfaces';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public keyword: string = '';
  public products: Product[] = [];
  public pageOfItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private filterPipe: FilterPipe
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.keyword = this.route.snapshot.queryParamMap.get('keyword')!;
    this.products = this.filterPipe.transform(this.productService.getList(), this.keyword);
    this.productService.sortByTotalBuy(this.products);
    registerLocaleData(vi);
  }

  public onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }
}
