import {booleanAttribute, ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AutoTextarea, AvatarCircle, SvgIcon} from '@tt/common-ui';
import {Profile} from '@tt/data-access';

@Component({
  selector: 'lib-send-input',
  imports: [
    AvatarCircle,
    AutoTextarea,
    SvgIcon
  ],
  templateUrl: './send-input.html',
  styleUrl: './send-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendInput {
  profile = input<Profile>();
  isCommentInput = input<boolean>();
}
