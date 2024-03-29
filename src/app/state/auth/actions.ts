import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const actionsAuth = createActionGroup({
  source: 'Auth',
  events: {
    setUser: props<{ name: string }>(),
    login: props<{ name: string }>(),
    loginSuccess: props<{ name: string }>(),
    loginFailure: props<{ message: string }>(),
    logout: emptyProps(),
  },
});
