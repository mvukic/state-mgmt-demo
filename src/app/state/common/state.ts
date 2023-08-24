export interface CommonState {
  config: {
    api: string;
  };

  constants: {
    constant: string;
  };
}

export const initialCommonState = (): CommonState => ({
  config: {
    api: '',
  },

  constants: {
    constant: '',
  },
});
