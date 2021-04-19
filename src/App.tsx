import React, { useCallback, useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { datalist, listOptions, processedDataList } from './recoil';
import { IAppData, allowedFilterKeys, allowedSortKeys } from './types';

const filter: { [key: string]: IAppData[allowedFilterKeys][] } = {
  country: ['Japan', 'Germany', 'Austria'],
  study: [true, false],
};

const sort: allowedSortKeys[] = ['time', 'name'];

const App: React.FC = () => {
  const setDataList = useSetRecoilState(datalist);
  const dataList = useRecoilValue(processedDataList);
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

  useEffect(() => {
    if (dataList.every((data) => !data.selected)) {
      setDataList((current) => {
        const targetIndex = current.findIndex(
          (data) => data.name === dataList[0].name
        );
        return current.map((data, i) => ({
          ...data,
          selected: i === targetIndex,
        }));
      });
    }
  }, [dataList, setDataList]);

  return (
    <Container>
      {dataList.map((data, i) => (
        <p key={i}>
          {data.selected && '→'} {data.name}({data.country}){' '}
          {data.start.toFormat('yyyy/MM')}-{data.end.toFormat('yyyy/MM')}
        </p>
      ))}
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 40px;
  height: 100%;
  width: 80%;
  align-items: center;
  flex-direction: column;
`;

export default App;
