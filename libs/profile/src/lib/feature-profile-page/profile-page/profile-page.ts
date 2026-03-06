import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProfileHeader} from '../../ui';
import {ProfileService} from '@tt/data-access';
import {AvatarCircle, SvgIcon} from '@tt/common-ui';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-profile-page',
  imports: [
    ProfileHeader,
    SvgIcon,
    RouterLink,
    AvatarCircle
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  profileService: ProfileService = inject(ProfileService);
  profile = this.profileService.me;

  subscribers = toSignal(this.profileService.getSubscribersShortList(6));
}
