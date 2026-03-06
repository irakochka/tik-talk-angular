import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  baseApiUrl = '/yt-course';

  transform(value: string | null): string | null {
    if (!value) return null;
    return `${this.baseApiUrl}/${value}`;
  }
}
