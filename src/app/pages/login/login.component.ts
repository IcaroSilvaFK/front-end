import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { LOCALSTORAGE_KEYS } from '../../common/constants';
import { AuthService } from '../../services/auth.service';
import { PersistenceService } from '../../services/persistence.service';
import { FILL_USER } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.reducer';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  errorMessage = signal('');
  hide = signal(true);
  isLoading = false

  constructor(
    private readonly store: Store<{ user: UserState }>,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly persistenceService: PersistenceService
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Este campo precisa ser preenchido');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Email invalido');
    } else {
      this.errorMessage.set('');
    }
  }

  async onSubmit() {
    if (this.email.invalid) return

    this.isLoading = true
    const sigin = await this.authService.signIn({ email: this.email.value || "", password: this.password.value || "" })
    this.persistenceService.set(LOCALSTORAGE_KEYS.TOKEN, sigin.accessToken)
    this.store.dispatch(FILL_USER({ user: sigin.user }))
    this.isLoading = false
    this.router.navigate(["/tasks"])
  }

}
