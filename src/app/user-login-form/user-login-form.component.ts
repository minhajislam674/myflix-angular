import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


// We'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created
import { FetchDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {

  @Input() userData = {Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }
    

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
     this.fetchApiData.userLogin(this.userData).subscribe((response) => {
        // Logic for a successful user login goes here!
        this.dialogRef.close(); //close the modal on success
        console.log(response);
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.router.navigate(['movies']);
        this.snackBar.open('Logged in successfully!', 'OK', {
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





