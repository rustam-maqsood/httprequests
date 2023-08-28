import { product } from "src/app/model/products";

export class AddProduct{
    static readonly type='[products] Add';
    constructor(public payload:product){}
}
export class GetProduct{
    static readonly type='[products] Get';
}
export class DeleteProduct{
    static readonly type='[products] Delete';
    constructor(public id:string){}
}
export class updateProduct{
    static readonly type='[products] Add';
    constructor(public payload:product){}
}