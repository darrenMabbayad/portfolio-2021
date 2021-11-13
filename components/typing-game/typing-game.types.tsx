export type RandomWords = Array<string>;

export type Score = {
  correct: number;
  incorrect: number;
  extra: number;
  total: number;
};

export type ScoreWithTimeStamp = {
  correct: number;
  incorrect: number;
  extra: number;
  total: number;
  second: number;
};

export type ChartDataSet = {
  timeSet: Array<string>;
  rawWpmSet: Array<number>;
  netWpmSet: Array<number>;
  errorSet: Array<number>;
};

export type ScoreToolTipState = {
  accuracy: boolean;
  characters: boolean;
};
