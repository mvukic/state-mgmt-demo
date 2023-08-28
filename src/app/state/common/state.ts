export interface CommonState {
  common: string[];
}

export const initialCommonState = (): CommonState => ({
  common: [],
});
