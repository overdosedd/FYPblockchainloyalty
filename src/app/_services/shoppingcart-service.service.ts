import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Product, Cart, User } from 'src/app/_models';
import { LoginService } from './login.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})
export class ShoppingcartServiceService {
  Cart: any[] = [];

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: HttpClient, private userService: LoginService ) {
    // this.Cart = {};
  }
  // getProduct(): Observable<any[]> {
  //   return Observable.of(this.Carts).delay(100);
  // }

  getColumns(): any {
    return [{ name: 'product' }, { name: 'price' }, { name: 'quantity' }];
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.getCartProducts.length; i++) {
      if (this.getCartProducts[i].price) {
        total += this.getCartProducts[i].price * this.getCartProducts[i].quantity;
        this.getCartProducts[i].totalamount = total;
      }
    }
    return total;
  }
  getCartProducts(): Observable<Cart[]> {
    const url = `${apiUrl}carts`;
    return this.http.get<Cart[]>(url)
      .pipe(
        tap(data => console.log('fetched products ')),
        catchError(this.handleError('getCartProducts', []))
      );
  }

  getCartProductsByUserID(userid): Observable<Cart> {
    const url = `${apiUrl}carts/` + userid;
    return this.http.get<Cart>(url)
      .pipe(
        tap(data => console.log(`fetched by user id=${userid}`)),
        catchError(this.handleError<Cart>(`getAddress user id=${userid}`))
      );
  }

  getCartProduct(customer_basket_id): Observable<Cart> {
    const url = `${apiUrl}carts?customer_id=` + customer_basket_id;
    console.log(customer_basket_id);
    return this.http.get<Cart>(url).pipe(
      tap(_ => console.log(`fetched cartid=${customer_basket_id}`)),
      catchError(this.handleError<Cart>(`getCartProduct id=${customer_basket_id}`))
    );
  }

  addCartProduct(products): Observable<Cart> {
    console.log(`${apiUrl}carts`);
    // // tslint:disable-next-line:prefer-const
    // let user = this.userService.getCurrentUser().id;
    // console.log(user);
    const json = {
      'customer_id': this.userService.getCurrentUser().id ,
      'product': products
    };
    return this.http.post<Cart>(`${apiUrl}carts`, json, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((products: Cart) => console.log(`added cart product w/ id=${products.product}`)),
      catchError(this.handleError<Cart>('addCartProduct'))
    );
  }

  updateCartProduct(customer_basket_id, cart): Observable<any> {
    const url = `${apiUrl}carts` + customer_basket_id;
    return this.http.put(url, cart, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${customer_basket_id}`)),
      catchError(this.handleError<any>('updateCartProduct'))
    );
  }

  deleteCartProduct(customer_basket_id): Observable<Cart> {
    console.log(customer_basket_id);
    const url = `${apiUrl}carts/${customer_basket_id}`;

    return this.http.delete<Cart>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cart id=${customer_basket_id}`))
    );
  }


  insert(product: any) {
    // tslint:disable-next-line:prefer-const
    let item = JSON.parse(JSON.stringify(product));
    // tslint:disable-next-line:prefer-const
    let result = this.checker(product);
    if (result === -1) {
      this.Cart.push(item);
    } else {
      this.Cart[result].quantity += 1;
    }
  }

  // getCartbyId(userId) {
  //   // tslint:disable-next-line:max-line-length
  //   return new Promise (resolve => {this.http.get(apiUrl + '/customer_basket?userId =' + userId).subscribe(
  //     data => {
  //       resolve(data);
  //     },
  //     err => console.log(err));
  //   });
  // }

  checker(product): number {
    for (let i = 0; i < this.Cart.length; i++) {
      const item = JSON.parse(JSON.stringify(this.Cart[i]));
      item.quantity = 1;

      if (JSON.stringify(item) === JSON.stringify(product)) {
        return i;
      }
      return -1;
    }
  }


}
