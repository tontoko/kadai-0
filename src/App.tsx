import React from 'react';
import styled from 'styled-components';
import ButtonsContainer from './components/button';
import ItemContainer from './components/item';
import MapContainer from './components/map';
import OptionsContainer from './components/options';

const App: React.FC = () => {
  return (
    <Container>
      <ItemContainer />
      <OptionsContainer />
      <ButtonsContainer />
      <MapContainer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  height: 100%;
  width: 80%;
  align-items: center;
  flex-direction: column;
`;

export default App;
