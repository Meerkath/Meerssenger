/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { alertController } from '@ionic/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailOrUserName: string;
  password: string;
  alertController = alertController;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }

  submit(){
    if (!this.emailOrUserName || !this.password){
      this.showAlert('Can\'t validate', 'Please provide all required data.');
      return;
    }
    this.userService.loginUser(this.emailOrUserName, this.password).subscribe(
    {
      next:(data) => {
        
        // this.storage.set({key: 'id', value: data._id});
        // this.storage.set({key: 'firstName', value: data.firstName});
        // this.storage.set({key: 'lastName', value: data.lastName});
        // this.storage.set({key:'userName', value: data.userName});
        // this.storage.set({key:'email', value: data.email});
        // this.storage.set({key:'refreshToken', value: data.refreshToken});
        // this.storage.set({key:'accessToken', value: data.accessToken}).then(() => this.router.navigate(['/friends']));
        this.authService.saveTokenLocally(data.accessToken).then(() => this.router.navigate(['/friends']))
        
      },
      error: (err) => {
      console.error(err);
      this.showAlert('Can\'t connect to your account.', err.error);
    }
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
  }

}
