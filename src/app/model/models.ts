export interface MO {
  id: string;
  name: string;
}

export interface PO {
  id: string;
  name: string;
  designation: string;
}

export interface SWVP {
  id: string;
  name: string;
  designation: string;
  pos: PO[];
}
