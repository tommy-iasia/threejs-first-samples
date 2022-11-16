export type Ticker =
  | ((deltaTime: number) => void)
  | {
      tick: (deltaTime: number) => void;
      order: number;
    };
