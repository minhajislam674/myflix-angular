import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {

  @Input() updatedUser = {Username: '', Password: '', Email: ''};

  constructor(
    public fetchUserData: FetchDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {}


    updateUserData(): void {
      this.fetchUserData.updateUserInfo(this.updatedUser).subscribe((res: any) => {
        this.dialogRef.close(); //close the modal on success
        this.snackBar.open('User updated successfully!', 'OK', {
          duration: 2000
        });
        
        const user = localStorage.getItem('user');
        if (user !== res.Username) {
          localStorage.setItem('user', res.Username);
          setTimeout(function(){
            window.location.reload();
         }, 2000);
        }
      });
    }
}

