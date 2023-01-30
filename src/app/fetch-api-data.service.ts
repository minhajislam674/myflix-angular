import { Injectable } from '@angular/core';
import { catchError, ObservedValueOf } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { Token } from '@angular/compiler';

//Declaring the api url that will provide data for the client app

const apiUrl = 'https://myflix-movies.onrender.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService  {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {

  }

  // Making the api call for the USER REGISTRATION endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  };

  // USER LOGIN
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  };

  // GET ALL MOVIES
   getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  };

  // GET MOVIE BY TITLE
  getSingleMovie(title:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  };

  // GET GENRE INFO
  getGenre(name:string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}genres/${name}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  // GET DIRECTOR INFO
  getDirector(name:string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  // GET USER INFO
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  // UPDATE USER INFO
  updateUserInfo(updatedInfo: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.put(`${apiUrl}users/${username}`, updatedInfo, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  // DELETE USER 
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  // ADD MOVIE TO FAVORITES
  addFavorite(movieId: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer" + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  // REMOVE MOVIE FROM FAVORITES 
  removeFavorite(movieId:any) : Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders ({
        Authorization: "Bearer" + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  // GET FAVORITES
  getFavorites() : Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.get(`${apiUrl}users/${username}/movies`, {
      headers: new HttpHeaders ({
        Authorization: "Bearer" + token
    })
  }).pipe(
    catchError(this.handleError)
    )
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  // Error handling

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  } 
}

