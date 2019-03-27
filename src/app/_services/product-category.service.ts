import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Product } from 'src/app/_models';
import { Category } from 'src/app/_models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';




@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }


  getCategories(): Observable<Category[]> {
    const url = `${apiUrl}categories`;
    return this.http.get<Category[]>(url)
      .pipe(
        tap(data => console.log('fetched categories')),
        catchError(this.handleError('getCategories', []))
      );
  }


  getCategory(id: number): Observable<Category> {
    const url = `${apiUrl}categories/` + id;
    return this.http.get<Category>(url).pipe(
      tap(_ => console.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  AddCategory(category): Observable<Category> {
    console.log(`${apiUrl}categories`);
    return this.http.post<Category>(`${apiUrl}product_category/productcatPOST`, category, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((category: Category) => console.log(`added user w/ id=${category.menu[0].id}`)),
      catchError(this.handleError<Category>('Register'))
    );
  }

  updateCategory(id, category): Observable<any> {
    const url = `${apiUrl}categories` + id;
    return this.http.put(url, category, httpOptions).pipe(
      tap(_ => console.log(`updated category id=${id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  deleteCategory(id): Observable<Category> {
    const url = `${apiUrl}/categories` + id;


    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted category id=${id}`)),
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }
}
