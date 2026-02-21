import {ChangeDetectionStrategy, Component, inject, signal, WritableSignal} from '@angular/core';
import {SvgIcon} from '@tt/common-ui';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@tt/data-access';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'lib-login-page',
  imports: [
    SvgIcon,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  authService = inject(AuthService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  isPasswordVisible = signal<boolean>(false);
  authError = signal<string | null>(null);

  form: FormGroup = new FormGroup({
    username: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    password: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe({
        next: () => {
          this.toastr.error('Вы успешно авторизовались в системе!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err?.status === 401 || err?.status === 403) {
            this.toastr.error('Неверный логин или пароль.');
          } else {
            this.toastr.error('Ошибка сервера. Попробуйте позже.');
          }
        },
      });
    }
  }
}
