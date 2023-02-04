import { Component, OnInit, Input } from '@angular/core';

// We'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created
import { FetchDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {Username: '', Password: '', Email: ''};

  constructor(
    public fetchApiData: FetchDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
     this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); //close the modal on success
        console.log(response);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000 
        });
     }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000 
        });
     })
  }
}


