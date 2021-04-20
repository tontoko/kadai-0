import { atom, selector } from 'recoil';
import appData from './data';
import { IAppData, IAppOptions, allowedFilterKeys } from './types';

export const datalist = atom<IAppData[]>({
  key: 'datalist/default',
  default: appData.map((data, i) =>
    i === 0
      ? { ...data, location: [...data.location], selected: true }
      : { ...data, location: [...data.location], selected: false }
  ),
});

export const listOptions = atom<IAppOptions<allowedFilterKeys>>({
  key: 'datalist/options',
  default: {
    sort: {
      type: 'time',
      desc: false,
    },
  },
});

export const processedDataList = selector<IAppData[]>({
  key: 'datalist/processed',
  get: ({ get }) => {
    const options = get(listOptions);
    const currentList = [...get(datalist)];
    const filteredList = options.filter
      ? currentList.filter(
          (data) => data[options.filter!.key] === options.filter!.value
        )
      : currentList;
    const sortedList = filteredList.sort((a, b) => {
      if (options.sort.type === 'time') {
        const result = a.start.toMillis() - b.start.toMillis();
        return options.sort.desc ? -result : result;
      }
      if (options.sort.type === 'name') {
        const result = a.name > b.name ? 1 : -1;
        return options.sort.desc ? -result : result;
      }
      return 0;
    });

    return sortedList;
  },
});
