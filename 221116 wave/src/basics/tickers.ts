import { Ticker } from "./ticker";

export function tickers() {
  const tickers: Ticker[] = [];

  return {
    tickers,
    tick: (deltaTime: number) => {
      const sortedTickers = [...tickers].sort(
        (x, y) => ("order" in x ? x.order : 0) - ("order" in y ? y.order : 0)
      );

      for (const ticker of sortedTickers) {
        if ("tick" in ticker) {
          ticker.tick(deltaTime);
        } else {
          ticker(deltaTime);
        }
      }
    },
  };
}
