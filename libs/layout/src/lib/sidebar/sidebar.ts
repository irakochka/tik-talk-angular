import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SvgIcon} from '@tt/common-ui';

@Component({
  selector: 'lib-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    SvgIcon
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
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
}
