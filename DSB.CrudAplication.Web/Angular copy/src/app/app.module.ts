import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ToastrModule} from 'ngx-toastr';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailComponent } from './product-details/product-detail/product-detail.component';
import { ProductDetailListComponent } from './product-details/product-detail-list/product-detail-list.component';
import { ProductDetailService } from './shared/product-detail.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductDetailComponent,
    ProductDetailListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ProductDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
