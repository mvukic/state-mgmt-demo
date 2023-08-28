export interface PropertiesState {
  config: {
    api: string;
  };

  constants: {
    constant: string;
  };
}

export const initialPropertiesState = (): PropertiesState => ({
  config: {
    api: '',
  },

  constants: {
    constant: '',
  },
});
