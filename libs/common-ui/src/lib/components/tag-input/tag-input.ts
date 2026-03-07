import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef, forwardRef, HostListener,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {SvgIcon} from '@tt/common-ui';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'lib-tag-input',
  imports: [
    FormsModule,
    SvgIcon,
    AsyncPipe
  ],
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TagInput),
    },
  ],
})
export class TagInput implements ControlValueAccessor {
  labelText = input.required<string>();
  placeholder = input.required<string>();
  icon = contentChild('[icon]', {read: ElementRef});

  value$ = new BehaviorSubject<string[]>([]);
  innerInput = '';

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onAddTag(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const value = this.innerInput.trim();
    if (!value) return;

    this.value$.next([...this.value$.value, value]);
    this.innerInput = '';
    this.onChange(this.value$.value);
  }

  onDelete(i: number) {
    const next = this.value$.value.filter((_, idx) => idx !== i);
    this.value$.next(next);
    this.onChange(this.value$.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value$.next([]);
      return;
    }

    this.value$.next(stack);
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onChange(value: string[] | null) {
  }

  onTouched() {
  }
}
