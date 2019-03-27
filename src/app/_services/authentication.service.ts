import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from 'src/app/_models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
const apiUrl = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


    email: string;
    loggedIn = false;


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.loggedIn = !!localStorage.getItem('authToken');
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    Login(email: string, password: string) {
        console.log(`${apiUrl}users`);
        return this.http.post<any>(`${apiUrl}users`, { email, password }, httpOptions)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    console.log(user);
                }

                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}
