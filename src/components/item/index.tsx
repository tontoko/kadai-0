import React, { useCallback, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { datalist, processedDataList } from '../../recoil';
import { IAppData } from '../../types';

const ItemContainer: React.FC = () => {
  const [defaultDataList, setDefaultDataList] = useRecoilState(datalist);
  const dataList = useRecoilValue(processedDataList);

  useEffect(() => {
    if (dataList.every((data) => !data.selected)) {
      setDefaultDataList((current) => {
        const targetIndex = current.findIndex(
          (data) => data.name === dataList[0].name
        );
        return current.map((data, i) => ({
          ...data,
          selected: i === targetIndex,
        }));
      });
    }
  }, [dataList, setDefaultDataList]);

  const handleItemClick = useCallback(
    (clicked: IAppData) => {
      if (clicked.selected) return;
      const newDataList = [...defaultDataList];
      newDataList.forEach((data, i) => {
        if (data.selected)
          return newDataList.splice(i, 1, {
            ...newDataList[i],
            selected: false,
          });
        if (data.name === clicked.name)
          newDataList.splice(i, 1, { ...newDataList[i], selected: true });
      });
      setDefaultDataList(newDataList);
    },
    [defaultDataList, setDefaultDataList]
  );

  return (
    <>
      {dataList.map((data, i) => (
        <div key={i}>
          {i !== 0 && <Divider />}
          <Item onClick={() => handleItemClick(data)}>
            {data.selected && '→'} {data.name}({data.country}){' '}
            {data.start.toFormat('yyyy/MM')}-{data.end.toFormat('yyyy/MM')}
          </Item>
        </div>
      ))}
    </>
  );
};

const Item = styled.p`
  cursor: pointer;
  margin: 5px;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
`;

export default ItemContainer;
