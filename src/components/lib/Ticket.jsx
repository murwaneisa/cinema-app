import React from "react";
import { Button, Col, Image, Modal, Row, Stack } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";

function Ticket({ show, handleClose, seats, title, date, sal, price }) {
  console.log("Ticket seats", seats);
  return (
    <>
      <Modal
        size="md"
        centered
        show={show}
        onHide={handleClose}
        animation={false}
        /*    dialogClassName="custom-modal" */
      >
        <Modal.Header closeButton>
          <Modal.Title>Movie: {title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
          <Stack className="px-2 mb-4">
            <p className="ticket-sec-title">Date and time</p>
            <h5 className="ticket-sec-info">{date}</h5>
          </Stack>
          <Row style={{ width: "100%" }}>
            <Col style={{ width: "33%" }}>
              <div className="d-flex  flex-column">
                <p className="ticket-sec-title">Sal</p>
                <p className="ticket-sec-info">{sal}</p>
              </div>
              <Stack className="mt-4">
                <p className="ticket-sec-title">Ticket No</p>
                <p className="ticket-sec-info">DH923Y4KJSD9</p>
              </Stack>
            </Col>
            <Col style={{ width: "33%" }}>
              <Stack>
                <p className="ticket-sec-title">Row</p>
                <p className="ticket-sec-info">
                  {Array.from(new Set(seats.map((seat) => seat.rowNumber))).map(
                    (rowNumber) => (
                      <span key={rowNumber}>{rowNumber} </span>
                    )
                  )}
                </p>
              </Stack>
              <Stack className="mt-4">
                <p className="ticket-sec-title">Movie Screen</p>
                <p className="ticket-sec-info">3D</p>
              </Stack>
            </Col>
            <Col style={{ width: "33%" }}>
              <Stack>
                <p className="ticket-sec-title">Seat</p>
                <p className="ticket-sec-info">
                  {seats.map((seat) => {
                    return <span>{seat.seatNumber} </span>;
                  })}
                </p>
              </Stack>
              <Stack className="mt-4">
                <p className="ticket-sec-title">Price</p>
                <p className="ticket-sec-info">{price} kr </p>
              </Stack>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Image src={"/images/barcode.png"} style={{ width: "100%" }} />

            <Button style={{ width: "100%" }} className="btn-download">
              Download your ticket
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Ticket;
