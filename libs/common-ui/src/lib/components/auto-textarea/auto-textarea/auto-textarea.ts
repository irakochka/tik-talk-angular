import {ChangeDetectionStrategy, Component, forwardRef, inject, input, Renderer2} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'lib-auto-textarea',
  imports: [
    FormsModule
  ],
  templateUrl: './auto-textarea.html',
  styleUrl: './auto-textarea.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AutoTextarea),
    },
  ],
})
export class AutoTextarea {
  r2 = inject(Renderer2);

  labelText = input<string>();
  placeholder = input.required<string>();

  value = '';

  onTextAreaInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
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
