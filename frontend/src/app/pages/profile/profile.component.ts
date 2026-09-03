import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';
import { UpdateProfilePayload } from '../../core/models/user.model';
import { CountUpDirective } from '../../core/directives/count-up.directive';
import { RevealDirective } from '../../core/directives/reveal.directive';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, CountUpDirective, RevealDirective],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  auth = inject(AuthService);

  readonly submitting = signal(false);
  readonly errorMsg = signal<string | null>(null);
  readonly successMsg = signal<string | null>(null);
  readonly showPassword = signal(false);
  readonly profileLoadBlocked = signal(false);

  readonly initials = computed(() => {
    const name = this.auth.currentUser()?.full_name ?? '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  });

  readonly daysActive = computed(() => {
    const created = this.auth.currentUser()?.created_at;
    if (!created) return 0;
    const ms = Date.now() - new Date(created).getTime();
    return Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)));
  });

  readonly securityScore = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return 0;
    let score = 60; // baseline for bcrypt-hashed password
    if (user.full_name) score += 10;
    if (user.phone) score += 15;
    if (user.email?.includes('@')) score += 10;
    return Math.min(100, score);
  });

  readonly securityLabel = computed(() => {
    const s = this.securityScore();
    if (s >= 90) return 'Excellent';
    if (s >= 75) return 'Strong';
    if (s >= 55) return 'Good';
    return 'Fair';
  });

  readonly form = this.fb.nonNullable.group({
    full_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
    phone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    new_password: [''],
  });

  constructor() {
    effect(() => {
      const user = this.auth.currentUser();
      if (user) {
        if (!user.phone) {
          this.profileLoadBlocked.set(true);
          this.errorMsg.set('Profile load failed: phone number is missing from registration data.');
          this.form.disable({ emitEvent: false });
          return;
        }

        this.profileLoadBlocked.set(false);
        this.errorMsg.set(null);
        this.form.enable({ emitEvent: false });
        this.form.patchValue(
          { full_name: user.full_name, phone: user.phone, new_password: '' },
          { emitEvent: false },
        );
      }
    });
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  submit(): void {
    if (this.profileLoadBlocked()) {
      this.errorMsg.set('Profile load failed: phone number is missing from registration data.');
      return;
    }
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.errorMsg.set(null);
    this.successMsg.set(null);

    const raw = this.form.getRawValue();
    const payload: UpdateProfilePayload = { full_name: raw.full_name, phone: raw.phone };
    if (raw.new_password && raw.new_password.length > 0) {
      if (raw.new_password.length < 6) {
        this.submitting.set(false);
        this.errorMsg.set('New password must be at least 6 characters.');
        return;
      }
      payload.new_password = raw.new_password;
    }

    this.auth.updateProfile(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.successMsg.set('Profile updated successfully.');
        this.form.patchValue({ new_password: '' });
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.errorMsg.set(err.error?.detail ?? 'Update failed. Please try again.');
      },
    });
  }
}
