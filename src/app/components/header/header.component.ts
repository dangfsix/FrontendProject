import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/app.interfaces';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public searchText: string = '';
  public showResult: boolean = false;
  public searchResults: Product[] = [];
  public totalProduct:number = 0

  constructor(
    private router: Router,
    private filterPipe: FilterPipe,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.totalProduct$.subscribe(totalProduct => this.totalProduct = totalProduct)
    console.log(this.totalProduct)
  }

  public onChange(): void {
    this.searchResults = this.filterPipe.transform(this.productService.getList(), this.searchText).slice(0, 8);
  }

  public onFocus(): void {
    this.showResult = true;
  }

  public onBlur(): void {
    this.showResult = false;
  }

  public onSubmit(): void {
    if (this.searchText !== '') {
      this.router.navigate(['/search'], { queryParams: { keyword: this.searchText } });
    }
  }
}
