import { createReducer, on } from "@ngrx/store"
import { FILL_USER, User } from "./user.actions"

export interface UserState {
  user?: User
}

export const userReducer = createReducer<UserState>(
  {
    user: undefined
  },
  on(FILL_USER, (state, { user }) => {
    return {
      ...state,
      ...user,
    }
  })
)

