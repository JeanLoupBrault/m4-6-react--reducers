import React from 'react';
import styled from 'styled-components';
import { BookingContext } from './BookingContext';
import { SeatContext } from './SeatContext';
import Modal from './Modal';
import { decodeSeatId } from '../helpers';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

const PurchaseModal = () => {
    const {
        selectedSeatId,
        status,
        error,
        price,
        actions: {
            cancelBookingProcess,
            purchaseTicketRequest,
            purchaseTicketSuccess,
            purchaseTicketFailure,
        },
    } = React.useContext(BookingContext);
    const {
        actions: { markSeatAsPurchased },
    } = React.useContext(SeatContext);

    const { rowName, seatNum } = decodeSeatId(selectedSeatId);

    return (
        <Modal
            isOpen={!!selectedSeatId}
            onClose={cancelBookingProcess}
            aria-label="Ticket purchasing flow"
        >
            <Title>Purchase ticket</Title>
            <p>
                You're purchasing <strong>1</strong> ticket for the price of ${price}.
      </p>

            <TicketTable aria-label="ticket information">
                <TableHead>
                    <TableRow>
                        <TableCell>Row</TableCell>
                        <TableCell>Seat</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{rowName}</TableCell>
                        <TableCell>{seatNum}</TableCell>
                        <TableCell>${price}</TableCell>
                    </TableRow>
                </TableBody>
            </TicketTable>

            <Form
                onSubmit={ev => {
                    ev.preventDefault();

                    purchaseTicketRequest();

                    fetch('/api/book-seat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            creditCard,
                            expiration,
                            seatId: selectedSeatId,
                        }),
                    })
                        .then(res => res.json())
                        .then(json => {
                            if (json.success) {
                                purchaseTicketSuccess();
                                markSeatAsPurchased(selectedSeatId);
                            } else {
                                purchaseTicketFailure(json.message);
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            purchaseTicketFailure('An unknown error has occurred');
                        });
                }}
            >
            </Form>
        </Modal>
    )
}

const Title = styled.h1`
  margin-bottom: 16px;
`;

const Form = styled.form`
  margin-left: -32px;
  margin-right: -32px;
  padding: 32px;
  background: #eee;
`;

const TicketTable = styled(Table)`
  width: 75% !important;
  margin-top: 16px;
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
`;

export default PurchaseModal;