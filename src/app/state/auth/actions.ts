import {createActionGroup, emptyProps, props} from "@ngrx/store";

export const actionsAuth = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ name: string }>(),
    logout: emptyProps(),
  },
});
