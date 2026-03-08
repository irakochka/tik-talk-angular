import { createActionGroup, props } from '@ngrx/store';
import {Post} from '../interfaces/post.interface';

export const postActions = createActionGroup({
  source: 'posts',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'posts loaded': props<{ posts: Post[] }>(),
  },
});
