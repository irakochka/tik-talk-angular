import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Sidebar} from '../sidebar/sidebar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'lib-layout',
  imports: [
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}
