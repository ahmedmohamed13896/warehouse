import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../product.service';
import { FormControl ,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productData :any = {};
  selectedWarhouse :any = {};
  classifications : string = "all"
  productTypes :any =[];


  filteredData:any= {};




  // Reactiveform
  formData = new FormGroup({
          warehouse : new FormControl({value:'',disabled: false},Validators.required),
          type : new FormControl({value:'',disabled: true},Validators.required),
          showZeroBalance : new FormControl({value:true,disabled: true}),
          classification : new FormControl({value:'allProducts',disabled: true},Validators.required),
          products : new FormControl({value:[]},Validators.required),
        });

  constructor(private _ProductService:ProductService) {

  }
  ngOnInit(): void {
    this._ProductService.getProductData().subscribe({
      next:(data:any)=>{
        this.productData = data;
      },
      error:(error)=>{
        console.log(error)
      },
    });
  }

  setWarhouse(select:any){
    this.selectedWarhouse = this.productData.warhouses?.filter((wh:any)=>{
      return select?.target?.value == wh?.warhouse?.name
    })[0]?.warhouse || null;

    this.formData.controls.type.patchValue('');
    if(this.selectedWarhouse !== null){
        this.formData.controls.type.enable();
        this.formData.controls.showZeroBalance.enable();
      }
    else{
        this.formData.controls.type.disable();
        this.formData.controls.showZeroBalance.disable();
      }
  }


  setCurrentTypes(type:any){
     this.productTypes = this.selectedWarhouse?.types?.filter((t:any)=>{
        return t?.type == type?.target?.value
        })[0]?.products || null;

    if(this.productTypes !== null){
      this.formData.controls.classification.enable()
      this.formData.controls.products.patchValue(this.productTypes);
    }
    else{
      this.formData.controls.classification.disable();
      this.formData.controls.products.patchValue([]);
    }
    this.formData.controls.classification.patchValue('allProducts');


  }

  showData(){
    this.filteredData = this.formData.value;
    console.log(this.formData.value);
  }

  checkIfNotSingle():boolean{
    if(this.formData.controls.type.value != null && this.formData.controls.classification.value == 'specificProducts'){
      return true;
    }
    if(this.formData.controls.classification.value == 'allProducts'){
      return false
    }
    return false
  }

  handleClassChange(){
    this.checkIfNotSingle() ?
    this.formData.controls.products.patchValue(this.productTypes):
    this.formData.controls.products.patchValue([]);
  }

  public compareFn(a: any, b: any): boolean {
    return a == b;
  }


}
