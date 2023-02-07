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

  /**
   * User registration
   * @service POST to the respective endpoint of apiUrl to register a new user
   * @function userRegistration
   * @param {any} userDetails
   * @returns a new user object in json format
   */

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  };

  /**
   * User login
   * @service POST to the respective endpoint of apiUrl to log in a new user
   * @function userLogin
   * @param {any} userDetails
   * @returns a user object in json format
   */

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  };

  /**
   * Get all movies
   * @service GET request to the respective endpoint of apiUrl to get all movies
   * @function getAllMovies
   * @returns a object with all the movies in json format
   */

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

  /**
   * Get movies by title
   * @service GET request to the respective endpoint of apiUrl to get a single movie
   * @function getSingleMovie
   * @param {string} title
   * @returns a single movie object in json
   */

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

  /**
   * Get genre info
   * @service GET request to the respective endpoint of apiUrl to get genre info
   * @function getGenre
   * @param {string} name
   * @returns a single object in json
   */

  getGenre(name:string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}genres/${name}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get director info
   * @service GET request to the respective endpoint of apiUrl to get director info
   * @function getDirector
   * @param {string} name
   * @returns a single object in json
   */

  getDirector(name:string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get user info
   * @service GET request to the respective endpoint of apiUrl to get user info
   * @function getUserInfo
   * @returns a user object in json format
   */

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update user info
   * @service POST request to the respective endpoint of apiUrl to update user info
   * @function updateUserInfo
   * @param {any} updatedInfo
   * @returns updated user object in json format
   */

  updateUserInfo(updatedInfo: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.put(`${apiUrl}users/${username}`, updatedInfo, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete user
   * @service DELETE request to the respective endpoint of apiUrl to remove user 
   * @function deleteUser
   * @returns success messgae if user gets deleted
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Add movie to favorite list
   * @service POST request to the respective endpoint of apiUrl to add movie 
   * @function addFavorite
   * @param {string} movieId
   * @returns updated user object in json format
   */

  addFavorite(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.post(`${apiUrl}users/${username}/movies/${movieId}`, movieId, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Remove movie from favorite list
   * @service DELETE request to the respective endpoint of apiUrl to remove movie 
   * @function removeFavorite
   * @param {string} movieId
   * @returns updated user object in json format
   */

  removeFavorite(movieId:any) : Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders ({
        Authorization: "Bearer " + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Get user's favorite movie from favorite list
   * @service GET request to the respective endpoint of apiUrl to get favorite movie 
   * @function getFavorites
   * @returns an object that holds favorite movie ids
   */

  getFavorites() : Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.get(`${apiUrl}users/${username}/movies`, {
      headers: new HttpHeaders ({
        Authorization: "Bearer " + token
    })
  }).pipe(
    catchError(this.handleError)
    )
  }

  // Non-typed response extraction

  /**
   * Extracts response data from HTTP response
   * @param {any} res
   * @returns response body or empty object
   */

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  // Error handling

  /**
   * Error handler
   * @param error
   * @returns error message
   */

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

