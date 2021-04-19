import { DateTime } from 'luxon';

export type IAppData = {
  name: string;
  country: 'Japan' | 'Germany' | 'Austria';
  study: boolean;
  start: DateTime;
  end: DateTime;
  selected: boolean;
};

export type IAppOptions<T extends allowedFilterKeys> = {
  sort: {
    type: allowedSortKeys;
    desc: boolean;
  };
  filter?: {
    key: T;
    value: IAppData[T];
  };
};

export type allowedFilterKeys = keyof Pick<IAppData, 'country' | 'study'>;

export type allowedSortKeys = 'time' | 'name';
