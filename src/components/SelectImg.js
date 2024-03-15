"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Capture from "@/components/cupture";
import axios from "axios";

const SelectImg = ({ setResult, setIsLoader, setTemp, id }) => {
  const [state, setState] = useState({
    choice: "",
    image: "",
  });

  useEffect(() => {
    setIsLoader(true);
    axios
      .post(`/api/templates`, { id: id })
      .then(res => {
        setState({
          ...state,
          image: res.data?.encode,
        });
        console.log(res.data?.encode);
        setIsLoader(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async () => {
    console.log("state", state);
    try {
      setIsLoader(true);
      console.log(state.image);
      const res = await axios.post(
        "https://aada-103-17-110-127.ngrok-free.app/rec",
        {
          choice: state.choice.split(",")[1],
          image: state.image.split(",")[1],
        }
      );
      setResult(res?.data); // store result
      setTemp(state); // store template Image
      setIsLoader(false); // set Loader
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };

  return (
    <Row className="sp-section align-items-center justify-content-center">
      <Col
        xxl={6}
        xl={6}
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className="d-flex justify-content-center"
      >
        <Capture
          setImgFile={setState}
          file={state}
          handleSubmit={handleSubmit}
        />
      </Col>
    </Row>
  );
};

export default SelectImg;
