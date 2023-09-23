import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "./Particle";
import Type from "./Type";
import { Button } from "react-bootstrap";

import styles from "./css/NewHome.module.css";

const Home = () => {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1
                style={{
                  paddingBottom: 15,
                }}
                className="heading"
              >
                Welcome to{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋
                </span>
              </h1>

              <h1 className="heading-name">
                <strong className="main-name"> Auction Platform</strong>
              </h1>
              <div
                style={{
                  padding: 50,
                  textAlign: "left",
                }}
              >
                <Type />
              </div>
              <div className="button">
                <Button
                  className="button"
                  size="lg"
                  variant="primary"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Get Started
                </Button>
              </div>
            </Col>
            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};
