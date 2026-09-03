import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') target = 0;
  @Input() duration = 1800;
  @Input() suffix = '';
  @Input() prefix = '';
  @Input() decimals = 0;

  private host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private started = false;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    el.textContent = this.format(0);

    if (!('IntersectionObserver' in window)) {
      this.animate();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.started) {
          this.started = true;
          this.animate();
        }
      },
      { threshold: 0.35 },
    );
    this.observer.observe(el);
  }

  private animate(): void {
    const el = this.host.nativeElement;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / this.duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = this.format(eased * this.target);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  private format(value: number): string {
    const fixed = value.toFixed(this.decimals);
    const [whole, frac] = fixed.split('.');
    const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${this.prefix}${frac ? `${withCommas}.${frac}` : withCommas}${this.suffix}`;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
