import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { processedDataList, datalist } from '../../recoil';

const ButtonsContainer: React.FC = () => {
  const processedList = useRecoilValue(processedDataList);
  const [defaultList, setDefaultList] = useRecoilState(datalist);

  const beforeHandler = useCallback(() => {
    const currentSelectedIndex = processedList.findIndex(
      (data) => data.selected
    );
    if (currentSelectedIndex === 0) return;
    const nextSelectedData = { ...processedList[currentSelectedIndex - 1] };
    const newDefaultList = [...defaultList];
    defaultList.map((data, i) => {
      if (data.name === nextSelectedData.name) {
        return newDefaultList.splice(i, 1, {
          ...defaultList[i],
          selected: true,
        });
      }
      newDefaultList.splice(i, 1, { ...defaultList[i], selected: false });
    });
    setDefaultList(newDefaultList);
  }, [defaultList, processedList, setDefaultList]);

  const nextHandler = useCallback(() => {
    const currentSelectedIndex = processedList.findIndex(
      (data) => data.selected
    );
    if (currentSelectedIndex + 1 === processedList.length) return;
    const nextSelectedData = { ...processedList[currentSelectedIndex + 1] };
    const newDefaultList = [...defaultList];
    defaultList.map((data, i) => {
      if (data.name === nextSelectedData.name) {
        return newDefaultList.splice(i, 1, {
          ...defaultList[i],
          selected: true,
        });
      }
      newDefaultList.splice(i, 1, { ...defaultList[i], selected: false });
    });
    setDefaultList(newDefaultList);
  }, [defaultList, processedList, setDefaultList]);

  return (
    <ButtonsBox>
      <button onClick={beforeHandler}>before</button>
      <button onClick={nextHandler}>next</button>
    </ButtonsBox>
  );
};

const ButtonsBox = styled.div`
  margin: 10px;
  width: 50%;
  display: flex;
  justify-content: space-around;
`;

export default ButtonsContainer;
