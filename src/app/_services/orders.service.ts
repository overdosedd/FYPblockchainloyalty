import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Product, Cart, User, Orders } from 'src/app/_models';
import { LoginService } from './login.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  // Orders: any[] = [
  //   {
  //     productno: '#2100',
  //     img: 'assets/images/products/a2.jpg',
  //     product: 'Iphone 8s',
  //     price: 1000,
  //     quantity: 1,
  //     totalamount: '',
  //     status: 'In Progress',
  //   },
  //   {
  //     productno: '#2101',
  //     img: 'assets/images/products/a4.jpg',
  //     product: 'Iphone 7s',
  //     price: 400,
  //     quantity: 1,
  //     totalamount: '',
  //     status: 'Completed',
  //   },
  //   {
  //     productno: '#2102',
  //     img: 'assets/images/products/a5.jpg',
  //     product: 'Iphone 6s',
  //     price: 600,
  //     quantity: 1,
  //     totalamount: '',
  //     status: 'Cancelled',
  //   },
  //   {
  //     productno: '#2103',
  //     img: 'assets/images/products/a6.jpg',
  //     product: 'Iphone 6',
  //     price: 200,
  //     quantity: 1,
  //     totalamount: '',
  //     status: 'In Progress',
  //   },
  //   {
  //     productno: '#2104',
  //     img: 'assets/images/products/a7.jpg',
  //     product: 'Iphone 5',
  //     price: 800,
  //     quantity: 1,
  //     totalamount: '',
  //     status: 'In Progress',
  //   },
  // ];

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  constructor(private http: HttpClient, public loginService: LoginService) {
    // this.Order = {};
  }

  // getOrderByStatus(filterVar) {
  //   const result = [];
  //   this.Orders.forEach(order => {
  //     if (order.status === filterVar) {
  //       result.push(order);
  //     }

  //   });
  //   return result;
  // }

  // getOrder(): Observable<any[]> {
  //   return Observable.of(this.Orders).delay(100);
  // }
  getColumns(): any {
    return [{ name: 'product' }, { name: 'price' }, { name: 'quantity' }];
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.getOrderProducts.length; i++) {
      if (this.getOrderProducts[i].price) {
        total += this.getOrderProducts[i].price * this.getOrderProducts[i].quantity;
        this.getOrderProducts[i].totalamount = total;
      }
    }
    return total;
  }

  getOrderProducts(): Observable<Orders[]> {
    const url = `${apiUrl}orders`;
    return this.http.get<Orders[]>(url)
      .pipe(
        tap(data => console.log('fetched products')),
        catchError(this.handleError('getOrderProducts', []))
      );
  }

  getOrderProduct(order_id): Observable<Orders> {
    const url = `${apiUrl}orders/` + order_id;
    console.log(order_id);
    return this.http.get<Orders>(url).pipe(
      tap(_ => console.log(`fetched cartid=${order_id}`)),
      catchError(this.handleError<Orders>(`getOrderProduct id=${order_id}`))
    );
  }

  getOrderProductsByUserID(userid): Observable<Orders> {
    const url = `${apiUrl}orders/` + userid;
    return this.http.get<Orders>(url)
      .pipe(
        tap(data => console.log(`fetched by user id=${userid}`)),
        catchError(this.handleError<Orders>(`getOrders user id=${userid}`))
      );
  }

  deleteOrderProduct(order_id): Observable<Orders> {
    console.log(order_id);
    const url = `${apiUrl}orders/${order_id}`;

    return this.http.delete<Orders>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cart id=${order_id}`))
    );
  }

  proceedtoOrder(order): Observable<Orders> {
    console.log(`${apiUrl}orders`);

    const json = {
      'userId': this.loginService.getCurrentUser().id,
      'date': Date.now(),
      'status': 'Delivering',
      'products': order,

    };
    return this.http.post<Orders>(`${apiUrl}orders`, json, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((order: Orders) => console.log(`added orderproduct w/ id=${order.products}`)),
      catchError(this.handleError<Orders>('proceedCheckout'))
    );

  }




  getStatus() {
    // tslint:disable-next-line:prefer-const
    let allOrder = [];
    // tslint:disable-next-line:prefer-const
    let inprogress = [];
     // tslint:disable-next-line:prefer-const
    let completed = [];
     // tslint:disable-next-line:prefer-const
     let cancelled = [];
    for (let i = 0; i < this.getOrderProducts.length; i++) {
      if (this.getOrderProduct[i].status.value = 'In Progress') {
        inprogress.push(this.getOrderProduct[i]);
      }
      if (this.getOrderProduct[i].status.value = 'Completed') {
        completed.push(this.getOrderProduct[i]);
      }
      if (this.getOrderProduct[i].status.value = 'Cancelled') {
        cancelled.push(this.getOrderProduct[i]);
      }
    }

    allOrder.push({
      status: 'In Progress',
      data: inprogress
    },

    {
      status: 'Completed',
      data: completed
    },
    {
      status: 'Cancelled',
      data: cancelled
    },
    );
    return allOrder;
  }

//   getStatus() {
//     // tslint:disable-next-line:prefer-const
//     let inprogress = [];
//     // tslint:disable-next-line:prefer-const
//     let completed = [];
//     // tslint:disable-next-line:prefer-const
//     let cancelled = [];
//     for (let i = 0; i < this.Orders.length; i++) {

//       if (this.Orders[i].status === 'In Progress') {
//         inprogress.push(this.Orders[i]);
//         return inprogress;
//       }
//       if (this.Orders[i].status === 'Completed') {
//         completed.push(this.Orders[i]);
//         return completed;
//       }
//       if (this.Orders[i].status === 'Cancelled') {
//         cancelled.push(this.Orders[i]);
//         return cancelled;
//       }
//     }

//   }

}
