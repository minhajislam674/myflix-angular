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
export class MovieCardComponent {

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

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  getfavorites() : void {
    this.fetchMovies.getUserInfo().subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  isFavorite(id: string) : boolean {
    return this.favorites.includes(id);
  }

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

