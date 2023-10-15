export interface CommonState {
  data: string[];
}

export const initialCommonState = (): CommonState => ({
  data: [],
});
