import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { listOptions } from '../../recoil';
import { allowedSortKeys } from '../../types';

const sort: allowedSortKeys[] = ['time', 'name'];

const Sort: React.FC = () => {
  const setOptions = useSetRecoilState(listOptions);

  const handleSortSelect = useCallback(
    (e) => {
      const {
        target: { value },
      } = e as {
        target: { value: allowedSortKeys };
      };

      setOptions((current) => ({
        ...current,
        sort: {
          ...current.sort,
          type: value,
        },
      }));
    },
    [setOptions]
  );

  const handleDescCheck = useCallback(
    (e) => {
      const {
        target: { checked },
      } = e as {
        target: { checked: boolean };
      };

      setOptions((current) => ({
        ...current,
        sort: {
          ...current.sort,
          desc: checked,
        },
      }));
    },
    [setOptions]
  );
  return (
    <>
      <label htmlFor="sort-key">Sort</label>
      <select id="sort-key" onChange={handleSortSelect}>
        {sort.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
      <label htmlFor="sort-desc">desc</label>
      <input type="checkbox" id="sort-desc" onChange={handleDescCheck} />
    </>
  );
};

export default Sort;
