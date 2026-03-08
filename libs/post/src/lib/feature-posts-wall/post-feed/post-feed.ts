import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  Renderer2,
  viewChild
} from '@angular/core';
import {GlobalStoreService, Post, Profile} from '@tt/data-access';
import {SendInput} from '../../ui';
import {Store} from '@ngrx/store';
import {PostCard} from '@tt/post';
import {debounceTime, fromEvent} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-post-feed',
  imports: [
    SendInput,
    PostCard
  ],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeed implements AfterViewInit {
  store = inject(Store);
  r2 = inject(Renderer2);
  me = inject(GlobalStoreService).me;

  profile = input.required<Profile>();
  posts = input<Post[]>();

  canPost = computed(() => {
    const profile = this.profile();

    return profile?.id === this.me()?.id;
  });

  feedWrapperRef = viewChild<ElementRef<HTMLDivElement>>('feedWrapper');

  ngAfterViewInit(): void {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(500),
        takeUntilDestroyed())
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  resizeFeed(): void {
    const feedWrapperRef = this.feedWrapperRef();
    if (!feedWrapperRef) return;

    const {top} = feedWrapperRef.nativeElement.getBoundingClientRect();
    const height: number = window.innerHeight - top - 24;
    this.r2.setStyle(feedWrapperRef.nativeElement, 'height', `${height}px`);
  }
}
