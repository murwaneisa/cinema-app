import React from "react";
import "../style/movieCard.css";
import { Button, Container, Stack, Badge, Card } from "react-bootstrap";

function MovieCard() {
  return (
    <Card className="bg-dark p-3" style={{ color: "#ffffff" }}>
      <Card.Img variant="top" src="/images/hero3.jpg" />
      <Card.Body className="p-0 mt-3 mb-2">
        <Card.Title> Black Panther: Wakanda Forever 2022</Card.Title>
        <Card.Text>Some quick example text to</Card.Text>
        <Stack gap={3} direction="horizontal">
          <Button className="btn-movie-card " variant="primary">
            Get Tickets
          </Button>
          <Button className="btn-movie-card " variant="outline-light">
            Get Tickets
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;

/* <div class="card bg-dark col-3 col-md-6" style={{ color: "#ffffff" }}>
<div className="container w-100">
  <div style={{ height: "50%" }}>
    <img
      class="card-img mt-2 rounded"
      src="/images/hero3.jpg"
      alt="Card image cap"
      style={{ height: "100%" }}
    />
  </div>
  <div class="card-body p-0 mt-3 mb-2">
    <h5 class="card-title" style={{ fontSize: "0.8rem" }}>
      Black Panther: Wakanda Forever 2022
    </h5>
    <p class="card-text-s">Some quick example text to</p>
    <Button
      href="#"
      className="btn-movie-card"
      class="btn btn-primary btn-sm"
    >
      Get Tickets
    </Button>
  </div>
</div>
</div> */