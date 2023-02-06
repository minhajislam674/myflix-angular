import { Component, OnInit, Input } from '@angular/core';
import { FetchDataService } from '../fetch-api-data.service';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit  {

  @Input() updatedUserData = {Username: '', Password: '', Email: ''};

  //Variable named "user" is declared as an array. This is where the movies returned from the API call will be kept.
  user: any={}


  constructor(
    public fetchUserData: FetchDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getUserData();
  }


  getUserData(): void {
    this.fetchUserData.getUserInfo().subscribe((resp: any) => {
      this.user = resp;
      console.log (this.user);
      return this.user;
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.snackBar.open('Your account has been deleted.', 'OK', {
          duration: 3000
        });

      });

    }
    this.fetchUserData.deleteUser().subscribe(res=>{
      console.log('deleteAccountRes:', res);
    })
  }


  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px'
    });
  }
}
