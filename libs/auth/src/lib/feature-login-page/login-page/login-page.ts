import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {}
