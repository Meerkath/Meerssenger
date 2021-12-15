/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { alertController } from '@ionic/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User';
import { Router } from '@angular/router';

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
      // this.storageService.set('id', data._id);
      // this.storageService.set('firstName', data.firstName);
      // this.storageService.set('lastName', data.lastName);
      // this.storageService.set('userName', data.userName);
      // this.storageService.set('email', data.email);
      // this.storageService.set('refreshToken', data.refreshToken);
      // this.storageService.set('accessToken', data.accessToken);
      this.router.navigate(['/friends']);
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
