import { createAction, props } from '@ngrx/store';

export type User = {
  email: string,
  id: string,
  username: string
}



export const FILL_USER = createAction('[User] Fill User', props<{ user: User }>());
