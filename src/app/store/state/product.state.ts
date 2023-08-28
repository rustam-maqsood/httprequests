import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { product } from "src/app/model/products";
import { AddProduct, DeleteProduct, GetProduct } from "../actions/product.action";
import { ProductServices } from "src/app/Service/products.service";
import { map, tap } from "rxjs";

//state Model
export class ProductStateModel{
    products : product[];
    productLoaded: boolean
}

//state
@State<ProductStateModel>({
    name: "products",
    defaults:{
       products:[],
       productLoaded:false

    }
})

@Injectable()
export class ProductState{
    constructor (private  _prodService:ProductServices){

    }

    //selector has logic to get state data

    // Get Employee list from state
    @Selector()
    static getProductList(state:ProductStateModel){
        return state.products
    }

      // Get loaded product info
      @Selector()
      static productLoaded(state:ProductStateModel){
          return state.productLoaded;
      }

    @Action(GetProduct)
    getProducts({getState,setState}:StateContext<ProductStateModel>){

     return this._prodService.fetchProduct().pipe(tap(res=>{

        const state = getState();

        setState({
            ...state,
            products:res,
            productLoaded:true
        })
     }))

    }


   //Add data to state
    @Action(AddProduct)
    addproduct({getState,patchState}:StateContext<ProductStateModel>,{payload}:AddProduct){
         return this._prodService.createProduct(payload).pipe(tap((res:product)=>{
            const state = getState();
            patchState({
                products:[...state.products,res]
            })
         }))
    }
 
    //Delete data from state
    @Action(DeleteProduct)
    deleteProduct({getState,setState}:StateContext<ProductStateModel>,{id}:DeleteProduct){
        return this._prodService.deleteProduct(id).pipe(tap((res:product)=>{
            const state = getState();
            const filteredProducts = state.products.filter(prod=>prod.id !== id);

            setState({
                ...state,
                products:filteredProducts
            })
        }))
    }
}













