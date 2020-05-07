import React from 'react';

import GlobalStyles from './GlobalStyles';
import { SeatContext } from './SeatContext';
import TicketWidget from './TicketWidget';
import styled from 'styled-components';
import PurchaseModal from './PurchaseModal';

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      // .then(data => console.log(data));
      .then(receiveSeatInfoFromServer);
  }, [receiveSeatInfoFromServer]);

  return (
    <>
      <GlobalStyles />
      TODO: write code
      This venue has {numOfRows} rows!
      <Centered>
        <TicketWidget />
      </Centered>

      <PurchaseModal />
    </>
  );
}

const Centered = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
