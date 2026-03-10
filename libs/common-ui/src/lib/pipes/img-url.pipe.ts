import {inject, Pipe, PipeTransform} from '@angular/core';
import {BASE_API_URL} from '@tt/data-access';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  baseApiUrl = inject(BASE_API_URL);

  transform(value: string | null): string | null {
    if (!value) return null;
    return `${this.baseApiUrl}/${value}`;
  }
}
