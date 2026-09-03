import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  @Input() tiltAmount = 8;
  @Input() tiltGlare = true;

  private host = inject(ElementRef<HTMLElement>);

  constructor() {
    const el = this.host.nativeElement;
    el.style.transformStyle = 'preserve-3d';
    el.style.transition = 'transform 0.15s ease-out';
    el.style.willChange = 'transform';
  }

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    // Skip effect on touch/pointer-coarse devices via feature detection at hover time.
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = this.host.nativeElement;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform =
      `perspective(900px) rotateY(${x * this.tiltAmount}deg) rotateX(${-y * this.tiltAmount}deg) translateY(-3px)`;
    if (this.tiltGlare) {
      el.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`);
      el.style.setProperty('--glare-y', `${(y + 0.5) * 100}%`);
    }
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.host.nativeElement.style.transform = '';
  }
}
