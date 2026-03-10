import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  Post,
} from '../interfaces/post.interface';
import {BASE_API_URL} from '@tt/data-access';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  baseApiUrl = inject(BASE_API_URL);

  fetchPosts(params: Record<string, any>) {
    return this.http.get<Post[]>(`${this.baseApiUrl}/post/`, {params});
  }
}
