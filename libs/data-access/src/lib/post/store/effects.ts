import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postActions } from './actions';
import {Store} from '@ngrx/store';
import {PostService} from '../services/post.service';
import {map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  store = inject(Store);
  postService = inject(PostService);
  actions$ = inject(Actions);

  filterPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.filterEvents),
      switchMap(({ filters }) =>
        this.postService
          .fetchPosts(filters)
          .pipe(map((posts) => postActions.postsLoaded({ posts })))
      )
    );
  });
}
