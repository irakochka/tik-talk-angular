import {ChangeDetectionStrategy, Component, inject, input, signal, Signal} from '@angular/core';
import {ProfileHeader} from '../../ui';
import {Post, postActions, ProfileService, selectPosts} from '@tt/data-access';
import {AvatarCircle, SvgIcon} from '@tt/common-ui';
import {RouterLink} from '@angular/router';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {PostFeed} from '@tt/post';
import {Store} from '@ngrx/store';
import {switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'lib-profile-page',
  imports: [
    ProfileHeader,
    SvgIcon,
    RouterLink,
    AvatarCircle,
    PostFeed,
    AsyncPipe,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  store = inject(Store);
  profileService: ProfileService = inject(ProfileService);

  posts: Signal<Post[]> = this.store.selectSignal(selectPosts);
  subscribers = toSignal(this.profileService.getSubscribersShortList(6));
  id = input.required<string>();
  isMyPage = signal(false);

  me$ = toObservable(this.profileService.me);

  profile$ = toObservable(this.id).pipe(
    switchMap((id) => {
      const meId = this.profileService.me()?.id;
      this.isMyPage.set(id === 'me' || (!!meId && +id === meId));

      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    }),
    tap((profile) => {
      if (!profile) return;

      this.store.dispatch(
        postActions.filterEvents({ filters: { user_id: profile.id } })
      );
    })
  );
}
