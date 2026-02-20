import { Routes } from '@angular/router';
import {Layout} from '@tt/layout';
import {ProfilePage, ProfileSearchPage, SettingsPage} from '@tt/profile';
import {ChatPage} from '@tt/chat';
import {CommunitySearchPage} from '@tt/community';
import {LoginPage} from '../../../../libs/auth/src/lib/feature-login-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'profile/me',
        component: ProfilePage,
      },
      {
        path: 'chat',
        component: ChatPage,
      },
      {
        path: 'search',
        component: ProfileSearchPage,
      },
      {
        path: 'community',
        component: CommunitySearchPage,
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
    ]
  },
  {
    path: 'login',
    component: LoginPage
  }
];
