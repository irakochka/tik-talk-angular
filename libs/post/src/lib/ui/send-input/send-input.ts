import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AutoTextarea, AvatarCircle, SvgIcon} from '@tt/common-ui';
import {Profile} from '@tt/data-access';
import {NgClass} from '@angular/common';

@Component({
  selector: 'lib-send-input',
  imports: [
    AvatarCircle,
    AutoTextarea,
    SvgIcon,
    NgClass
  ],
  templateUrl: './send-input.html',
  styleUrl: './send-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendInput {
  profile = input.required<Profile>();
  isCommentInput = input<boolean>(false);
}
