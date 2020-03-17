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

  constructor(private service: ProductDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: Product) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteProductDetail(Id)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            console.log(err);
          })
    }
  }
}
