import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { datalist, processedDataList } from '../../recoil';

const ItemContainer: React.FC = () => {
  const setDataList = useSetRecoilState(datalist);
  const dataList = useRecoilValue(processedDataList);

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
    <>
      {dataList.map((data, i) => (
        <p key={i}>
          {data.selected && '→'} {data.name}({data.country}){' '}
          {data.start.toFormat('yyyy/MM')}-{data.end.toFormat('yyyy/MM')}
        </p>
      ))}
    </>
  );
};

export default ItemContainer;
