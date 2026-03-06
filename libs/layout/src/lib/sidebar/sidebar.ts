import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AvatarCircle, SvgIcon} from '@tt/common-ui';
import {ProfileService} from '@tt/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    SvgIcon,
    AvatarCircle
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnInit {
  profileService: ProfileService = inject(ProfileService);

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: '/chat',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
    {
      label: 'Сообщества',
      icon: 'community',
      link: '/community',
    },
  ];

  me = this.profileService.me;

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
