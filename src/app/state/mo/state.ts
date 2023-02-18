import { MO, PO, SWVP } from '../../model/models';

export interface MOState {
  mo: MO;
  pos: PO[];
  swvps: SWVP[];
  opened: boolean;
}

export const initialMOState = (): MOState => ({
  mo: { id: '', name: '' },
  pos: [],
  swvps: [],
  opened: false,
});
