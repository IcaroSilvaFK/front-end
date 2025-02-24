import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { LOCALSTORAGE_KEYS } from '../../common/constants';
import { AuthService } from '../../services/auth.service';
import { PersistenceService } from '../../services/persistence.service';
import { UserService } from '../../services/user.service';
import { FILL_USER } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.reducer';


@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinner
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });
  isLoading = false

  constructor(
    private readonly userService: UserService,
    private readonly store: Store<{ user: UserState }>,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly persistenceService: PersistenceService,
    private toast: HotToastService,
    private cdr: ChangeDetectorRef
  ) { }

  errorMessage = signal('');
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  async onSubmit() {
    if (this.form.invalid) return
    try {

      this.isLoading = true
      await this.userService.createUser({
        email: this.form.value.email || "",
        password: this.form.value.password || "",
        username: this.form.value.username || ""
      });

      const sigin = await this.authService.signIn({ email: this.form.value.email || "", password: this.form.value.password || "" })
      this.persistenceService.set(LOCALSTORAGE_KEYS.TOKEN, sigin.accessToken)
      this.store.dispatch(FILL_USER({ user: sigin.user }))
      this.router.navigate(["/tasks"])
    } catch (err) {
      this.toast.error("Tivemos um problema ao criar sua conta, tente novamente")
    } finally {
      this.isLoading = false
      this.cdr.detectChanges()
    }
  }
}
