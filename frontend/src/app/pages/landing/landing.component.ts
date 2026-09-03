import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { AppLogoComponent } from '../../core/components/app-logo.component';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { CountUpDirective } from '../../core/directives/count-up.directive';
import { TiltDirective } from '../../core/directives/tilt.directive';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, AppLogoComponent, RevealDirective, CountUpDirective, TiltDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  auth = inject(AuthService);

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Onboarding was ridiculously smooth. G-AI feels like using a product from the future — polished, fast, obvious.',
      name: 'Maya Kapoor',
      role: 'Senior Product Designer, Lumen Labs',
      initials: 'MK',
      rating: 5,
    },
    {
      quote:
        "Our engineering team ditched three separate services after we tried G-AI. It's the calmest UX I've used in years.",
      name: 'Alex Rivera',
      role: 'Engineering Lead, Northbeam',
      initials: 'AR',
      rating: 5,
    },
    {
      quote:
        'The attention to detail is unreal. Every animation, every state transition — it all feels intentional and premium.',
      name: 'Priya Shah',
      role: 'CTO, Beacon Analytics',
      initials: 'PS',
      rating: 5,
    },
  ];

  private readonly _testimonialIndex = signal(0);
  readonly testimonialIndex = this._testimonialIndex.asReadonly();
  readonly activeTestimonial = computed(() => this.testimonials[this._testimonialIndex()]);

  selectTestimonial(i: number): void {
    this._testimonialIndex.set(i);
  }
}
