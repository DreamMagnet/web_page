import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <span class="gai-logo" [style.width.px]="size" [style.height.px]="size" [class.gai-logo-glow]="glow">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient [attr.id]="'gaiGrad' + uid" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#6366f1" />
            <stop offset="0.55" stop-color="#a855f7" />
            <stop offset="1" stop-color="#ec4899" />
          </linearGradient>
          <radialGradient [attr.id]="'gaiSpark' + uid" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stop-color="#fef3c7" />
            <stop offset="1" stop-color="#fbbf24" />
          </radialGradient>
        </defs>
        <rect width="48" height="48" rx="12" [attr.fill]="'url(#gaiGrad' + uid + ')'" />
        <path
          d="M32.5 18.5c-1.7-3-4.9-5-8.5-5-5.5 0-10 4.5-10 10s4.5 10 10 10c4.5 0 8.3-3 9.5-7h-7"
          stroke="#ffffff"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
        <circle cx="37" cy="12" r="3" [attr.fill]="'url(#gaiSpark' + uid + ')'" />
        <circle cx="37" cy="12" r="6" fill="#fbbf24" opacity="0.25" />
        <path d="M37 6v2M37 16v2M31 12h2M41 12h2" stroke="#fbbf24" stroke-width="1.6" stroke-linecap="round" opacity="0.85" />
      </svg>
    </span>
  `,
  styles: [
    `
      :host { display: inline-flex; }
      .gai-logo { display: inline-block; line-height: 0; }
      .gai-logo svg { width: 100%; height: 100%; display: block; }
      .gai-logo-glow svg {
        filter: drop-shadow(0 6px 18px rgba(168, 85, 247, 0.45));
      }
    `,
  ],
})
export class AppLogoComponent {
  @Input() size = 36;
  @Input() glow = false;
  // Unique-per-instance suffix so multiple logos on the same page don't share gradient ids.
  readonly uid = Math.random().toString(36).slice(2, 8);
}
