import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-settings-page',
  imports: [],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {}
