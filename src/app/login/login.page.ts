/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { alertController } from '@ionic/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
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
        this.authService.setRefreshToken(data.refreshToken);
        this.authService.setAccessToken(data.accessToken).then(() => this.router.navigate(['/friends']));
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
