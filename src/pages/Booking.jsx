import React, { useEffect, useState } from "react";
import Section from "../components/lib/Section";
import {
  Row,
  Col,
  Card,
  Container,
  Image,
  Button,
  FormControl,
  Stack,
} from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import "../style/booking.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/lib/loading";
import { seats } from "../components/lib/seats";
import Ticket from "../components/lib/Ticket";
import { toast } from "react-toastify";

function Booking() {
  const { id, auditoriumId } = useParams();
  const data = useSelector((state) => state.data);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const movieInfo = data.movies.find((movie) => movie.id == id);
  const auditorium = data.screens.find((audi) => audi.movieId == id);
  const auditoriumSeats = seats.filter(
    (seat) => seat.auditoriumId == auditoriumId
  );
  /*   const seats = data.seats; */
  console.log("the seats auditorium seats", auditoriumSeats);

  const [ticketQuantities, setTicketQuantities] = useState({
    adult: 1,
    senior: 0,
    child: 0,
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Your provided seats array
  const totalAudience =
    ticketQuantities.adult + ticketQuantities.senior + ticketQuantities.child;

  const handleSeatClick = (clickedSeatId) => {
    const clickedSeat = auditoriumSeats.find(
      (seat) => seat.id === clickedSeatId
    );

    if (!clickedSeat.isAvailable) {
      return;
    }

    // Check if the clicked seat is already selected
    if (selectedSeats.some((seat) => seat.id === clickedSeatId)) {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat.id !== clickedSeatId)
      );
    } else {
      const rowNumber = clickedSeat.rowNumber;
      const seatNumber = clickedSeat.seatNumber;

      // Calculate the range of seats to select
      const selectedSeatsArray = [];
      for (let i = seatNumber; i < seatNumber + totalAudience; i++) {
        const seatToSelect = auditoriumSeats.find(
          (seat) => seat.rowNumber === rowNumber && seat.seatNumber === i
        );

        if (!seatToSelect || !seatToSelect.isAvailable) {
          toast.info(
            `The selected audiences is ${totalAudience} and the next seat is unavailable! `,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          // If any seat in the range is unavailable, break the loop
          break;
        }

        selectedSeatsArray.push({
          id: seatToSelect.id,
          rowNumber: seatToSelect.rowNumber,
          seatNumber: seatToSelect.seatNumber,
        });
      }

      if (selectedSeatsArray.length === totalAudience) {
        setSelectedSeats([...selectedSeats, ...selectedSeatsArray]);
      }
    }
  };

  const seatsByRows = {};
  auditoriumSeats.forEach((seat) => {
    if (!seatsByRows[seat.rowNumber]) {
      seatsByRows[seat.rowNumber] = [];
    }
    seatsByRows[seat.rowNumber].push(seat);
  });

  const handleQuantityChange = (type, value) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: Math.max(prevQuantities[type] + value, 0), // Ensure quantity doesn't go below 1
    }));
  };

  if (
    !movieInfo ||
    Object.keys(movieInfo).length === 0 ||
    !seats ||
    Object.keys(seats).length === 0
  ) {
    return <Loading />; //loading status until the the useSelector hook get the data
  }

  /* console.log("first", auditorium); */
  const ticketSum =
    ticketQuantities.adult * 85 +
    ticketQuantities.senior * 75 +
    ticketQuantities.child * 65;
  console.log("the selected seats ", selectedSeats);

  const handleShow = () => {
    if (selectedSeats.length !== 0 && totalAudience === selectedSeats.length) {
      setShow(true);
    }

    if (selectedSeats.length === 0) {
      return toast.info("You have to select a seat!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (totalAudience !== selectedSeats.length) {
      return toast.info("You selected more seats then the audience number!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Section>
      <Container className="pt-5">
        <Row>
          {/* the ticket type section */}
          <Col lg={5} md={6} xs={12}>
            {/* the movie info section */}
            <Stack direction="horizontal" gap={3}>
              <div className="image-container">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
                  fluid
                />
              </div>
              <Col>
                <p className="movie-info-title">{movieInfo.title}</p>
                <p className="movie-info-subtitle">{auditorium.time}</p>
                <p className="movie-info-subtitle">
                  Sal number : {auditorium.auditoriumId}
                </p>
              </Col>
            </Stack>
            {/* the ticket selection section  */}
            <Stack gap={3} className="mt-5">
              <h4 className="ticket-selection-title">
                Select the number of tickets
              </h4>
              <Stack direction="horizontal">
                <Col className="ticket-type">
                  Adult <p className="ticket-price-line">1 adult is 85 kr </p>
                </Col>

                <Col className="d-flex align-items-center">
                  <Button
                    variant="link"
                    className="increment-button"
                    onClick={() => handleQuantityChange("adult", -1)}
                  >
                    <AiOutlineMinus color="#ffffff" />
                  </Button>
                  <span className="selected-number">
                    {ticketQuantities.adult}
                  </span>
                  <Button
                    variant="link"
                    className="increment-button"
                    onClick={() => handleQuantityChange("adult", 1)}
                  >
                    <AiOutlinePlus color="#ffffff" />
                  </Button>
                </Col>
              </Stack>
              <Stack direction="horizontal">
                <Col className="ticket-type">
                  Senior
                  <p className="ticket-price-line">
                    1 senior ( + 65 ) is 75 kr{" "}
                  </p>{" "}
                </Col>
                <Col className="d-flex align-items-center">
                  <Button
                    variant="link"
                    className="increment-button"
                    onClick={() => handleQuantityChange("senior", -1)}
                  >
                    <AiOutlineMinus color="#ffffff" />
                  </Button>
                  <span className="selected-number">
                    {ticketQuantities.senior}
                  </span>
                  <Button
                    variant="link"
                    className="increment-button"
                    onClick={() => handleQuantityChange("senior", 1)}
                  >
                    <AiOutlinePlus color="#ffffff" />
                  </Button>
                </Col>
              </Stack>
              <Stack direction="horizontal">
                <Col className="ticket-type">
                  children
                  <p className="ticket-price-line">
                    1 child (- 12 ) is 65 kr{" "}
                  </p>{" "}
                </Col>
                <Col className="d-flex align-items-center">
                  <Button
                    variant="link"
                    className="increment-button"
                    onClick={() => handleQuantityChange("child", -1)}
                  >
                    <AiOutlineMinus color="#ffffff" />
                  </Button>
                  <span className="selected-number">
                    {ticketQuantities.child}
                  </span>
                  <Button
                    variant="link"
                    className="increment-button"
                    onClick={() => handleQuantityChange("child", 1)}
                  >
                    <AiOutlinePlus color="#ffffff" />
                  </Button>
                </Col>
              </Stack>
              <p className="ticket-selection-title">
                Total sum : {ticketSum} kr
              </p>
            </Stack>
          </Col>
          <Col>
            <Stack className="align-items-center  justify-content-center">
              <Image
                src="/images/screen.png"
                alt="Screen Image"
                className="screen-image-container"
              />
              <Container>
                {Object.keys(seatsByRows).map((rowNumber) => {
                  const numColumns = seatsByRows[rowNumber].length;
                  return (
                    <Col key={rowNumber} className="seat-col">
                      <div
                        className="seat-container"
                        style={{
                          gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
                        }}
                      >
                        {seatsByRows[rowNumber].map((seat) => (
                          <div
                            key={seat.id}
                            className={`seat ${
                              selectedSeats.some(
                                (selectedSeat) => selectedSeat.id === seat.id
                              )
                                ? "selected"
                                : seat.isAvailable
                                ? "available"
                                : "unavailable"
                            }`}
                            onClick={() =>
                              totalAudience === 0
                                ? toast.info(
                                    "You have to select the audience first!",
                                    {
                                      position: toast.POSITION.TOP_CENTER,
                                    }
                                  )
                                : handleSeatClick(seat.id)
                            }
                          ></div>
                        ))}
                      </div>
                    </Col>
                  );
                })}
                <Stack className="align-items-center">
                  <Stack
                    direction="horizontal"
                    className="mt-4 mb-4 align-items-center justify-content-center"
                  >
                    <div className="d-flex align-items-center  ">
                      <div className="seat available"></div>
                      <span style={{ color: "#ffffff" }}>Available</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="seat selected"></div>
                      <span style={{ color: "#ffffff" }}>Selected</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="seat unavailable"></div>
                      <span style={{ color: "#ffffff" }}>Unavailable</span>
                    </div>
                  </Stack>
                  <Button
                    onClick={handleShow}
                    size="md"
                    className="btn-booking"
                  >
                    Bok tickets
                  </Button>
                </Stack>
              </Container>
              <Ticket
                show={show}
                handleClose={handleClose}
                seats={selectedSeats}
                date={auditorium.time}
                sal={auditorium.auditoriumId}
                title={movieInfo.title}
                price={ticketSum}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default Booking;
