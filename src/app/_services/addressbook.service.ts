import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Addresses } from 'src/app/_models';
import { tap, catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AddressbookService {
  defaultAddress: any;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // Address_: any[] = [
  //   {
  //     id: '#1',
  //     firstname: 'yi han',
  //     lastname: 'lim',
  //     address: 'Blk 410 Tampines Avenue  Street 1',
  //     postalcode: '521212',
  //     state: 'Singapore',
  //     default: 'Yes',
  //   },
  //   {
  //     id: '#2',
  //     firstname: 'yi han',
  //     lastname: 'lim',
  //     address: 'Blk 410 Hougang Avenue  Street 1',
  //     postalcode: '512291',
  //     state: 'Singapore',
  //     default: 'No',
  //   },


  // ];

  constructor(private userService: LoginService, private http: HttpClient) { }

  // getAddress(): Observable<any[]> {
  //   return Observable.of(this.Address_).delay(100);
  // }

  getAddress(): Observable<Addresses[]> {
    const url = `${apiUrl}addresses`;
    return this.http.get<Addresses[]>(url)
      .pipe(
        tap(data => console.log('fetched addresses')),
        catchError(this.handleError('getAddresses', []))
      );
  }

  getAddressbyUserID(id): Observable<Addresses> {
    const url = `${apiUrl}addresses?userId=` + id;
    console.log(id);
    return this.http.get<Addresses>(url).pipe(
      tap(_ => console.log(`fetched by user id=${id}`)),
      catchError(this.handleError<Addresses>(`getAddress user id=${id}`))
    );
  }

  // getDefaultAddressbyId() {
  //  this. getAddressbyUserID(id).subscribe(data=> {
  //     for (let i = 0; i < data.length; i++){
  //       if(data[i].default === 'Yes'){
  //         this.defaultAddress = data[i];
  //       }
  //     }
  //  });
  // }


  getAddressbyID(addressid): Observable<Addresses> {
    const url = `${apiUrl}addresses/` + addressid;
    console.log(addressid);
    return this.http.get<Addresses>(url).pipe(
      tap(_ => console.log(`fetched address id=${addressid}`)),
      catchError(this.handleError<Addresses>(`getAddress id=${addressid}`))
    );
  }

  addAddress(address): Observable<Addresses> {
    console.log(`${apiUrl}`);
    return this.http.post<Addresses>(`${apiUrl}addresses`, address, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((address: Addresses) => console.log(`added product w/ id=${address.id}`)),
      catchError(this.handleError<Addresses>('addAddresses'))
    );
  }

  updateAddress(addressid, address): Observable<any> {
    const url = `${apiUrl}addresses/` + addressid;
    return this.http.put(url, address, httpOptions).pipe(
      tap(_ => console.log(`updated address id=${addressid}`)),
      catchError(this.handleError<any>('updateAddress'))
    );
  }

  deleteAddress(addressid): Observable<Addresses> {
    const url = `${apiUrl}addresses/` + addressid;

    return this.http.delete<Addresses>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted address id=${addressid}`)),
      catchError(this.handleError<Addresses>('deleteProduct'))
    );
  }

  getColumn(): any {
    return [{ name: 'ID' }, { name: 'Full Name' }, { name: 'Address' }, { name: 'Postalcode' }, { name: 'State' }];
  }


  // deleteAddress(id){
  //   this.deleteAddress(id).subscribe(result => {console.log('deleted'} );
  // }
}
