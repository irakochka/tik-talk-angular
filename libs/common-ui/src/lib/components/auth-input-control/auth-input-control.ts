import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChild,
  DestroyRef,
  ElementRef,
  inject,
  input,
  Optional,
  Self
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, FormsModule, NgControl, NgForm} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'lib-auth-input-control',
  imports: [
    FormsModule
  ],
  templateUrl: './auth-input-control.html',
  styleUrl: './auth-input-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthInputControl implements ControlValueAccessor {
  destroyRef = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);

  type = input.required<'text' | 'number' | 'email' | 'password'>();
  labelText = input.required<string>();
  placeholder = input.required<string>();
  icon = contentChild('[icon]', { read: ElementRef });

  value = '';

  constructor(
    @Optional() @Self() public ngControl: NgControl | null,
    @Optional() private formGroupDir: FormGroupDirective,
    @Optional() private ngForm: NgForm,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    (this.formGroupDir?.ngSubmit ?? this.ngForm?.ngSubmit ?? EMPTY)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string) {
    this.value = value ?? '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onInput(value: string) {
    this.value = value;
    this.onChange(value);
  }
}
