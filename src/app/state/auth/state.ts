export interface AuthState {
  name: string;
  loggedIn: boolean;
}

export const initialAuthState = (): AuthState => ({
  name: '@user_name',
  loggedIn: true,
});
