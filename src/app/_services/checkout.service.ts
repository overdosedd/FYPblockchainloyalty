import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Product, Cart, User, Addresses, Checkout } from 'src/app/_models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getCheckoutProducts(): Observable<Checkout[]> {
    const url = `${apiUrl}checkout`;
    return this.http.get<Checkout[]>(url)
      .pipe(
        tap(data => console.log('fetched products')),
        catchError(this.handleError('getCartProducts', []))
      );
  }

  getCheckoutAddresses():  Observable<Checkout[]> {
    const url = `${apiUrl}checkout`;
    return this.http.get<Checkout[]>(url)
      .pipe(
        tap(data => console.log('fetched addresses')),
        catchError(this.handleError('getAddresses', []))
      );
  }

  // nextAddress(address): Observable<Checkout> {
  //   console.log(`${apiUrl}checkout`);
  //   // // tslint:disable-next-line:prefer-const
  //   // let user = this.userService.getCurrentUser().id;
  //   // console.log(user);
  //   const json = {
  //     // 'customer_id': 1,
  //     // 'product': ,
  //     // 'paymentoption': [],
  //     'address': address

  //   };
  //   return this.http.post<Checkout>(`${apiUrl}checkout`, json, httpOptions).pipe(
  //     // tslint:disable-next-line:no-shadowed-variable
  //     tap((address: Checkout) => console.log(`added checkout cart address w/ id=${address.address}`)),
  //     catchError(this.handleError<Checkout>('nextAddress'))
  //   );

  // }
  getColumns(): any {
    return [{ name: 'product' }, { name: 'price' }, { name: 'quantity' }];
  }

  deleteCheckoutProduct(checkout_id): Observable<Checkout> {
    console.log(checkout_id);
    const url = `${apiUrl}checkout/${checkout_id}`;

    return this.http.delete<Checkout>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted checkout id=${checkout_id}`))
    );
  }

  proceedCheckout(checkout): Observable<Checkout> {
    console.log(`${apiUrl}checkout`);
    // // tslint:disable-next-line:prefer-const
    // let user = this.userService.getCurrentUser().id;
    // console.log(user);
    const json = {
      'cartproduct': checkout,
      'paymentoption': [],
      'address': []

    };
    return this.http.post<Checkout>(`${apiUrl}checkout`, json, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((checkout: Checkout) => console.log(`added checkout cart product w/ id=${checkout.cartproduct}`)),
      catchError(this.handleError<Checkout>('proceedCheckout'))
    );

  }



}
