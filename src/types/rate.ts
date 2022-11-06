// TODO: change to Record<>
export interface Rate {
  [key: string]: number;
}

export interface Rates {
  [key: string]: Rate;
}
