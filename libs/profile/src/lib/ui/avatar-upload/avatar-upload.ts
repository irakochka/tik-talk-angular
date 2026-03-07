import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AvatarCircle, DndDirective, SvgIcon} from '@tt/common-ui';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'lib-avatar-upload',
  imports: [
    AvatarCircle,
    SvgIcon,
    DndDirective,
    FormsModule
  ],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarUpload {
  previewUrl = input<string | null>();

  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file: File | undefined = (event.target as HTMLInputElement)
      ?.files?.[0];

    if (!file || !file.type.match('image')) return;

    this.processFile(file);
  }

  onFileDropped(file: File): void {
    this.processFile(file);
  }

  processFile(file: File | null | undefined): void {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      // this.previewUrl.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }
}
