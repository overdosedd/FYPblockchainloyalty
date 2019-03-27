import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BigChainDBService } from '../_services/big-chain-db.service';

import { User } from 'src/app/_models';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

import { DatePipe } from '@angular/common';
// import { exists } from 'fs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Detail: any;
  Details: any[];
  key = this.bigchainService.getKeypair();

  loggedIn = false;
  cartItemCount: number = 0;


  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // tslint:disable-next-line:max-line-length
  constructor(private datePipe: DatePipe, private http: HttpClient, private router: Router, public bigchainService: BigChainDBService, private sharedService: SharedService) {
    // this.Detail = {};
    // // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // // this.currentUser = this.currentUserSubject.asObservable();
  }



  getUsers(): Observable<User[]> {
    const url = `${apiUrl}users`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(data => console.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(userid): Observable<User> {
    const url = `${apiUrl}users/` + userid;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${userid}`)),
      catchError(this.handleError<User>(`getUser id=${userid}`))
    );
  }


  Register(user): Observable<User> {
    console.log(`${apiUrl}users`);
    const json = {
      'username': user.username,
      'email': user.email,
      'password': user.password,
      'firstName': user.firstName,
      'lastName': user.lastName,
      'dob': '',
      'gender': '',
      'defaultBillingAddress': 0,
      'defaultShippingAddress': 0,
      'key': this.key

    };
    return this.http.post<User>(`${apiUrl}users`, json, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((user: User) => console.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('Register'))
    );
  }

  updateUser(userid, user): Observable<any> {
    const url = `${apiUrl}users` + userid;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${userid}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }


  deleteUser(userid): Observable<User> {
    const url = `${apiUrl}/users` + userid;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${userid}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  getCurrentUser() {
    console.log(this.Detail);
    return this.Detail;
  }

  checkedLoggedin() {
    if (this.Detail) {
      return this.loggedIn = true;
    }

  }
  getCurrentUserName() {
    if (this.Detail) {
      return this.Detail.firstName;
    }
  }

  loggedout() {
    this.Detail = null;
    this.sharedService.updateCartCount(this.cartItemCount);
    return this.loggedIn = false;

  }

  async login(email: string, password: string) {

    await this.getUsers().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        console.log(data);
        // console.log(data[i].email, , data[i].password);
        if (data[i].email === email && data[i].password === password) {
          this.Detail = data[i];

          console.log(this.Detail);
          this.router.navigate(['home', this.Detail.id]);
          this.loggedIn = true;
          console.log(this.Detail);
          console.log(this.loggedIn);
          // break;
        } else {
          // this.Detail = null;
          this.loggedIn = false;
          console.log(this.loggedIn);
        }
      }

      let legends: any = [];
      // tslint:disable-next-line:no-shadowed-variable
      this.bigchainService.searchTransaction('"' + 'TrolleeLegend' + '"').subscribe(data => {
        const result: any = data;
        legends = result[0].data.loyaltySystem.action;
      });

      let counter = 0;
      console.log('=============== ADD TO CART START =================');
      const email2 = this.Detail.email;
      this.bigchainService.searchTransaction('"' + email2 + '"').subscribe(data2 => {
        // tslint:disable-next-line:prefer-const
        let result: any = data2;
        // console.log(result);
        const todayDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
        for (let i = 0; i < result.length; i++) {
          // tslint:disable-next-line:quotemark
          if (result[i].data.email === email2 && result[i].data.type === "testLoyalty6") {
            const actionDate = this.datePipe.transform(result[i].data.date, 'yyyy-MM-dd');
            if (result[i].data.action === 'Sign in' && todayDate === actionDate) {
              counter++;
            }
            // this.loyaltyDetails.push(result[i].data);
          }
        }
        if (counter < 5) {
          let pointsAllocated: number = 0;
        // tslint:disable-next-line:prefer-const
        legends.forEach(legend => {
          if (legend.action_name === 'Sign in') {
            pointsAllocated = legend.action_point;
          }
          console.log(pointsAllocated);
          console.log(counter);
        });
        console.log(counter);
        // tslint:disable-next-line:prefer-const
        let json = {
          'email': this.Detail.email,
          'action': 'Sign in',
          'type': 'testLoyalty6',
          'date': Date.now(),
          'points': pointsAllocated

        };
          this.bigchainService.createPurchase(json, this.getCurrentUser().key).subscribe(res => {
          });
        } else {
          // tslint:disable-next-line:prefer-const
          let json = {
            'email': this.Detail.email,
            'action': 'Sign in',
            'type': 'testLoyalty6',
            'date': Date.now(),
            'points': 0

          };
          this.bigchainService.createPurchase(json, this.getCurrentUser().key).subscribe(res => {
          });
        }

    });
    return this.Detail;
  });
 }

}
