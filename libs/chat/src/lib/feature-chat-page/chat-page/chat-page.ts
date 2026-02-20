import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-chat-page',
  imports: [],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {}
