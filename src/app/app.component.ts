import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.auth.getAccessToken().then((accessToken) => {
      if(accessToken.value){
        this.router.navigate(['/friends']);
      }
    });
  }
}
