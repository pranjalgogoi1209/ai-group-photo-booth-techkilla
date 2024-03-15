import React, { useEffect, useState } from "react";
import { Modal, Card, Col, Container, Row, Button } from "react-bootstrap";
import Preview from "@/components/Preview";
import FaceList from "@/components/FaceList";
import { BiArrowFromLeft } from "react-icons/bi";
import axios from "axios";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
const SwapFace = ({ temp, data, setIsLoader }) => {
  const router = useRouter();
  const [faceList, setFaceList] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [result, setResult] = useState("");
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 5);
  useEffect(() => {
    let selectList = {};
    data?.first?.map((_d, key) => {
      selectList[`${key}`] = -1;
    });
    setFaceList(selectList);
  }, []);

  const handleGetResult = async () => {
    try {
      setIsLoader(true);
      const res = await axios.post(
        "https://aada-103-17-110-127.ngrok-free.app/send",
        {
          image: temp?.choice.split(",")[1],
          choice: temp?.image.split(",")[1],
          map: Object.values(faceList),
        }
      );
      setResult("data:image/png;base64," + res?.data?.result);
      setIsLoader(false);
      setModalShow(true);
    } catch (error) {
      setIsLoader(false);
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      router.push(`/result/${small_id}`);
    }, 5000);
  };

  return (
    <>
      <Row className="sp-section align-items-center justify-content-center">
        <Col xxl={6} xl={6} lg={6} sm={12} xs={12} className="p-5">
          <Card className="overflow-hidden">
            <Preview file={temp.image} />
          </Card>
        </Col>

        <Col xxl={5} xl={5} lg={5} sm={12} xs={12} className="pt-5">
          <div className="sp-get-face">
            <h3>Face</h3>
            <div className="sp-face-section">
              {/* ---------------  */}
              {data?.first?.map((item, keys, arr) => {
                return (
                  <FaceList
                    setFaceList={setFaceList}
                    faceList={faceList}
                    item={item}
                    key={keys}
                    keys={keys}
                    data={data?.second}
                  />
                );
              })}
              {/* ------------ */}
            </div>
            <div className="d-flex justify-content-center sp-submit align-items-center">
              <button className="btn swap-btn" onClick={handleGetResult}>
                <span className="px-2">Swap Faces</span>
                <BiArrowFromLeft />
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <div className="sp-result">
            <img src={result} alt="techkilla" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={handleSave}>Save</Button> */}
          <a
            href={result}
            download={`${small_id}`}
            onClick={handleRedirect}
            target="_blank"
            rel="noopener noreferrer"
            className="btn wt-border btn-warning start-btn"
          >
            Save
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SwapFace;
