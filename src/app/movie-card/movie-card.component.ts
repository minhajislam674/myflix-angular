import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  //Variable named "movies" is declared as an array. This is where the movies returned from the API call will be kept.
  movies: any[] = [];

  constructor(public fetchMovies: FetchDataService) { }

  // Once the component has fully been mountedm getMovies() function gets called 
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }
}

