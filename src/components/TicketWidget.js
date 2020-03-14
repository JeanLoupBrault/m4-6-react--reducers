import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
//import Seat from '../../__solution/src/components/Seat';
import Seat from './Seat';
//import seatAvailable from `./src/assets/seat-available.svg`;
import { SeatContext } from './SeatContext';

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);
  // const numOfRows = 8; //before 6
  // const seatsPerRow = 12; //before 6
  // const seatAvailable = () => {
  //   return <img alt="Seats available" src=`${seatAvailable}` />;
  // };

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if (!hasLoaded) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];
              return (
                <SeatWrapper key={seatId}>
                  {/* TODO: Render the actual <Seat /> */}
                  <Seat
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
                    width={36}
                    height={36}
                    price={seat.price}
                    stauts={seat.isBooked ? 'unavailable' : 'available'}
                  />

                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
