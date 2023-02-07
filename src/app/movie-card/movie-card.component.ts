import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { GenrePageComponent } from '../genre-page/genre-page.component';
import { SynopsisPageComponent } from '../synopsis-page/synopsis-page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{

  //Variable named "movies" is declared as an array. This is where the movies returned from the API call will be kept.
  movies: any[] = [];
  favorites: any [] = [];

  constructor(
    public fetchMovies: FetchDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

    ) { }

  // Once the component has fully been mountedm getMovies() function gets called 
  ngOnInit(): void {
    this.getMovies();
    this.getfavorites();
  }

  /**
   * Fetch all movies via API service
   * @function getMovies
   * @returns array holding movies objects
   */

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Fetch user's favorite movies via API service
   * @function getfavorites
   * @returns array holding IDs of favorite movies
   */

  getfavorites() : void {
    this.fetchMovies.getUserInfo().subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   * Checks if a movie is included in a user's favorite movies
   * @function isFavorite
   * @param {string} id
   * @returns boolean
   */

  isFavorite(id: string) : boolean {
    return this.favorites.includes(id);
  }

  /**
   * Add movie to user's favorite list via API service
   * @function addToFavorites
   * @param {any} id
   */

  addToFavorites(id: any): void {
    console.log(id);
    this.fetchMovies.addFavorite(id).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000
      });  
      this.ngOnInit();
    });
  }

  /**
   * Remove movie from user's favorite list via API service
   * @function removeFromFavorites
   * @param {any} id
   */

  removeFromFavorites(id: any): void {
    console.log(id);
    this.fetchMovies.removeFavorite(id).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
  }

  /**
   * Opens dialog to show director information from director-page
   * @function openDirectorDialog
   * @param {string} name
   * @param {string} bio
   */

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorPageComponent, {
      data: 
        {
          Name: name,
          Bio: bio
        },
      width: '580px',
      height: '400px',
    });
  }

  /**
   * Opens dialog to show genre information from genre-page
   * @function openDirectorDialog
   * @param {string} name
   * @param {string} description
   */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenrePageComponent, {
      data: 
        {
          Name: name,
          Description: description
        },
      width: '580px',
      height: '400px',
    });
  }

  /**
   * Opens dialog to show movie synopsis from synopsis-page
   * @function openSynopsisDialog
   * @param {string} title
   * @param {string} description
   */

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisPageComponent, {
      data: 
        {
          Title: title,
          Description: description
        },
      width: '580px',
      height: '400px',
    });
  }
}

