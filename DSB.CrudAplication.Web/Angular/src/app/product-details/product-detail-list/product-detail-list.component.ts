import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailService } from 'src/app/shared/product-detail.service';
import { Product } from 'src/app/shared/product-detail.model';

@Component({
  selector: 'app-product-detail-list',
  templateUrl: './product-detail-list.component.html',
  styles: []
})
export class ProductDetailListComponent implements OnInit {

  constructor(public service: ProductDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    debugger;
    this.service.refreshList();
    console.log(this.service);
  }

  populateForm(pd: Product) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(Id) {
    debugger;
    if (confirm('¿Esta seguro de eliminar el item?')) {
      this.service.deleteProductDetail(Id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Eliminacion Satisfactoria', 'Producto');
        },
          err => {
            console.log(err);
          })
    }
  }
}
