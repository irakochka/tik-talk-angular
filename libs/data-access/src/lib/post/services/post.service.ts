import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  Post,
} from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl: string = '/yt-course';

  fetchPosts(params: Record<string, any>) {
    return this.http.get<Post[]>(`${this.baseApiUrl}/post/`, {params});
  }
}
