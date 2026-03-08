import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {GlobalStoreService, Post, Profile} from '@tt/data-access';
import {AvatarCircle, SvgIcon} from '@tt/common-ui';
import {SendInput} from '../../ui';

@Component({
  selector: 'lib-post-card',
  imports: [
    AvatarCircle,
    SvgIcon,
    SendInput
  ],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCard {
  post = input.required<Post>();
  profile = input.required<Profile>();

  me = inject(GlobalStoreService).me;
}
