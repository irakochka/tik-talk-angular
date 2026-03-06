import { HttpClient } from "@angular/common/http";
import {inject, Injectable, signal} from "@angular/core";
import {Profile} from '../interfaces/profile.interface';
import {map, Observable, tap} from "rxjs";
import {GlobalStoreService, Pageable} from "../../shared";

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl = '/yt-course';
  #globalStoreService: GlobalStoreService = inject(GlobalStoreService);

  me = signal<Profile | null>(null);

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`).pipe(
      tap((res) => {
        this.me.set(res);
        console.log(1)
        this.#globalStoreService.me.set(res);
      })
    );
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<Pageable<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }
}
