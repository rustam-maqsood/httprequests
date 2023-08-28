import { HttpClient , HttpHeaders, HttpParams} from "@angular/common/http";
import{Injectable} from "@angular/core";
import { product } from "../model/products";
import { map } from "rxjs";

@Injectable({providedIn:"root"})
export class ProductServices{
    constructor(private http: HttpClient){

    }
    //create product in database
    createProduct(products:{pName:string,desc:string,price:string}){
        console.log(products);
        const headers = new HttpHeaders({'myHeader':'Rustam'})
        this.http.post<{name:string}>(
          'https://angularbyrustam-default-rtdb.firebaseio.com/products.json',
           products,{headers:headers})
        .subscribe((res)=>{
          console.log(res);
          
        });
        return product;
    }
    //fetch product from database
    fetchProduct(){
      const header = new HttpHeaders()
      .set('content-type','application/json')
      .set('Access-control-Allow-origin','*')

      const params = new HttpParams().set('print','pretty');
       return this.http.get<{[key:string]:product}>('https://angularbyrustam-default-rtdb.firebaseio.com/products.json',
        {'headers':header , params:params})
        .pipe(map((res)=>{
          const products=[];
           for(const key in res){
            if(res.hasOwnProperty(key)){
              products.push({...res[key],id:key})
            }
            
           }
     return products;
          }))
       
    }
    //delete a product from database
    deleteProduct(id:string){
      let header = new HttpHeaders();
      header = header.append('myHeader1','value1');
      header = header.append('myHeader2','value2');
        this.http.delete('https://angularbyrustam-default-rtdb.firebaseio.com/products/'+id+'.json',{headers:header})
        .subscribe();
        return product;
    }
    
    //delete all products in database
    deleteAllProduct(){
        this.http.delete('https://angularbyrustam-default-rtdb.firebaseio.com/products.json')
        .subscribe();

    }
    updateProduct(id:string, value:product){
      this.http.put('https://angularbyrustam-default-rtdb.firebaseio.com/products/'+id+'.json',value)
      .subscribe();
}
}