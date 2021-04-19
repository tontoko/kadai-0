import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { listOptions } from '../../recoil';
import { allowedFilterKeys, IAppData } from '../../types';

const filter: { [key: string]: IAppData[allowedFilterKeys][] } = {
  country: ['Japan', 'Germany', 'Austria'],
  study: [true, false],
};

const Filter: React.FC = () => {
  const [options, setOptions] = useRecoilState(listOptions);

  const handleFilterKeySelect = useCallback(
    (e) => {
      const {
        target: { value },
      } = e as {
        target: { value: allowedFilterKeys & 'none' };
      };
      setOptions((current) => ({
        ...current,
        filter:
          value !== 'none'
            ? { key: value, value: filter[value][0] }
            : undefined,
      }));
    },
    [setOptions]
  );

  const handleFilterValueSelect = useCallback(
    (e) => {
      const {
        target: { value },
      } = e as {
        target: { value: IAppData[allowedFilterKeys] & 'true' & 'false' };
      };

      setOptions((current) => ({
        ...current,
        filter: {
          ...current.filter!,
          value:
            value === 'true' || value === 'false' ? value === 'true' : value,
        },
      }));
    },
    [setOptions]
  );

  return (
    <>
      <label htmlFor="filter-key">Filter</label>
      <select id="filter-key" onChange={handleFilterKeySelect}>
        <option key="none">none</option>
        {Object.keys(filter).map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
      {options.filter && (
        <>
          <label htmlFor="filter-value">{options.filter?.key}</label>
          <select
            id="filter-value"
            onChange={handleFilterValueSelect}
            value={options.filter!.value as string}>
            {filter[options.filter!.key].map((val, i) => (
              <option key={i} value={String(val)}>
                {String(val)}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
};

export default Filter;
