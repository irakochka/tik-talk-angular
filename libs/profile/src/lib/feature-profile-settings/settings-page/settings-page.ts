import {ChangeDetectionStrategy, Component, effect, inject, viewChild} from '@angular/core';
import {AutoTextarea, InputControl, SvgIcon, TagInput} from '@tt/common-ui';
import {ProfileService} from '@tt/data-access';
import {AvatarUpload, ProfileHeader} from '../../ui';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {catchError, EMPTY, firstValueFrom, from, switchMap, tap} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'lib-settings-page',
  imports: [
    SvgIcon,
    ProfileHeader,
    InputControl,
    ReactiveFormsModule,
    RouterLink,
    AutoTextarea,
    AvatarUpload,
    TagInput
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  profileService: ProfileService = inject(ProfileService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  profile = this.profileService.me;

  avatarUploader = viewChild<AvatarUpload>(AvatarUpload);

  form: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', {validators: Validators.required}),
    lastName: new FormControl<string>('', {validators: Validators.required}),
    username: new FormControl<string>({value: '', disabled: true}),
    description: new FormControl<string>('', {validators: Validators.required}),
    stack: new FormControl<string>('', {validators: Validators.required}),
  });

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileService.me(),
      });
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    const avatarUploader = this.avatarUploader();

    if (avatarUploader && avatarUploader.avatar) {
      firstValueFrom(
        this.profileService.uploadAvatar(avatarUploader.avatar)
      );
    }

    this.profileService.updateProfile(this.form.getRawValue())
      .pipe(
        tap(() => {
          this.toastr.success('Данные профиля успешно обновлены!');
        }),
        switchMap(() => from(this.router.navigate(['/profile/me']))),
        catchError(() => {
          this.toastr.error('Ошибка сервера. Попробуйте позже.');
          return EMPTY;
        })
      )
      .subscribe();
  }
}
