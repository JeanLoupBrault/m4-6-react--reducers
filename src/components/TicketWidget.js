import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
//import UnstyledButton from './UnstyledButton';
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
//import Seat from '../../__solution/src/components/Seat';
import Seat from './Seat2';
//import seatAvailable from `./src/assets/seat-available.svg`;
import { SeatContext } from './SeatContext';

function TicketWidget() {
  // TODO: use values from Context
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);
  // const numOfRows = 8; //before 6
  // const seatsPerRow = 12; //before 6
  // const seatAvailable = () => {
  //   return <img alt="Seats available" src={seatAvailable} />;
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
                    status={seat.isBooked ? 'unavailable' : 'available'}
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
  /* &:hover :disabled img{filter: grayscale(100%)}; */
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  transform: translateX(calc(-100% - 30px));
  font-size: 14px;
  color: white;
  font-weight: bold;
  line-height: 46px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  /* postition: relative; */
/* &:hover :disabled img{filter: grayscale(100%)}; */
`;



export default TicketWidget;
