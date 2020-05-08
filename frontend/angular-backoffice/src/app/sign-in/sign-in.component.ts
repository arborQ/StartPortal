import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  constructor(private signInService: SignInService) { }

  ngOnInit(): void {
    this.signInService.authorize('admin', 'admin').subscribe(({ isSuccess }) => {
      alert(isSuccess);
    });
  }

}
