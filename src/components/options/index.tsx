import React from 'react';
import styled from 'styled-components';
import Filter from './Filter';
import Sort from './Sort';

const OptionsContainer: React.FC = () => {
  return (
    <OptionBox>
      <Filter />
      <Sort />
    </OptionBox>
  );
};

const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 10px;
  border: 1px solid black;
  width: 80%;
  justify-content: center;
`;

export default OptionsContainer;
