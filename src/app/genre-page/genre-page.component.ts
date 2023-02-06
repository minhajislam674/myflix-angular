import { Component, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }
}
