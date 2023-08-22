export interface AuthState {
  name: string;
  loggedIn: boolean;
}

export const initialAuthState = (): AuthState => ({
  name: '',
  loggedIn: false,
});
