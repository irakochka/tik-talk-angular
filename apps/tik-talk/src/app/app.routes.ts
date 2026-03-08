import { Routes } from '@angular/router';
import {Layout} from '@tt/layout';
import {ProfilePage, ProfileSearchPage, SettingsPage} from '@tt/profile';
import {ChatPage} from '@tt/chat';
import {CommunitySearchPage} from '@tt/community';
import {canActivateAuth, canActivateGuest, LoginPage} from '@tt/auth';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {PostEffects, postFeature} from '@tt/data-access';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'profile/:id',
        component: ProfilePage,
        providers: [
          provideState(postFeature),
          provideEffects(PostEffects)
        ],
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
    ],
    canActivate: [canActivateAuth],
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [canActivateGuest],
  }
];
