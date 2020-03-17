import { Component, OnInit } from '@angular/core';
import { ProductDetailService } from 'src/app/shared/product-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {

  constructor(private service:ProductDetailService,private toastr: ToastrService) { }

  ngOnInit() {
    this.limpiarForm();
  }

  limpiarForm(form?: NgForm){
    if(form!=null)
    form.form.reset();
    this.service.formData ={
      Id :0,
      Nombre :'',
      Descripcion:''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.Id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postProductDetail().subscribe(
      res => {
        debugger;
        this.limpiarForm(form);
        this.toastr.success('Envio Satisfactorio', 'Producto');
        this.service.refreshList();
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putProductDetail().subscribe(
      res => {
        this.limpiarForm(form);
        this.toastr.info('Envio Satisfactorio', 'Producto');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
