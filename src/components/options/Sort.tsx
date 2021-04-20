import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
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
    <SortBox>
      <label htmlFor="sort-key" style={{ marginRight: 5 }}>
        Sort
      </label>
      <select
        id="sort-key"
        onChange={handleSortSelect}
        style={{ marginRight: 5 }}>
        {sort.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
      <label htmlFor="sort-desc" style={{ marginRight: 5 }}>
        desc
      </label>
      <input type="checkbox" id="sort-desc" onChange={handleDescCheck} />
    </SortBox>
  );
};

const SortBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
  margin-right: 10px;
`;

export default Sort;
