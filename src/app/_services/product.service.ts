import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Product, Cart } from '../_models';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {
    const url = `${apiUrl}products`;
    return this.http.get<Product[]>(url)
      .pipe(
        tap(data => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProductsbyCategoryId(productid): Observable<Product> {
    const url = `${apiUrl}products?categoryId=` + productid;
    console.log(productid);
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched user id=${productid}`)),
      catchError(this.handleError<Product>(`getProductbyCategory id=${productid}`))
    );
  }

  getProduct(productid): Observable<Product> {
    const url = `${apiUrl}products/` + productid;
    console.log(productid);
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched user id=${productid}`)),
      catchError(this.handleError<Product>(`getProduct id=${productid}`))
    );
  }

  addProduct(product): Observable<Product> {
    console.log(`${apiUrl}`);
    return this.http.post<Product>(`${apiUrl}products`, product, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((product: Product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(productid, product): Observable<any> {
    const url = `${apiUrl}products` + productid;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${productid}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(productid): Observable<Product> {
    const url = `${apiUrl}/products` + productid;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${productid}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }


}
