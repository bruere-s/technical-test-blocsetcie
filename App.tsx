import React from 'react';
import styled from 'styled-components'
import Home from "./components/Home";

function App() {
  return (
    <AppContainer>
      <Home />
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.section`
  padding: 10px;
`;
