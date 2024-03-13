"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import DemoData from '@/data/templates/desktop'
import DemoDataMB from '@/data/templates/mobile'
import { MdStart } from "react-icons/md";
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { useCookies } from 'react-cookie'
const Template = () => {
    const [show, setShow] = React.useState(false);
    const [selected, setSelected] = useState(-1)
    const [isLoader, setIsLoader] = useState(true)
    const [cookies] = useCookies(['auth'])
    const router = useRouter()
    useEffect(() => {
        if (!cookies?.auth) {
            router.push('/login')
        } else {
            setIsLoader(false)
        }
    }, [cookies])

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setSelected(id)
        setShow(true)
    };

    const handleContinue = () => {
        setIsLoader(true)
        router.push(`capture/${selected}`)
    }

    return (
        <>
            {
                isLoader ? <Loader /> : <></>
            }
            <div className='alai-main'>
                <div className="alai-container">
                    {/* header  */}
                    <Header title="Please Select Your Template" />
                    <Container className='home'>
                        <Row className='desktop row'>
                            {
                                DemoData?.map((item, keys) => {
                                    return <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} key={keys}>
                                        {
                                            item?.map((curItem, index) => {
                                                return <React.Fragment key={index} >
                                                    <div className='overflow-hidden my-2 pe-col' onClick={() => handleShow(curItem.id)}>
                                                        <img src={curItem?.img} className='img-fluid' />
                                                    </div>
                                                </React.Fragment>
                                            })
                                        }
                                    </Col>
                                })
                            }
                        </Row>
                        <Row className='mobile'>
                            {
                                DemoDataMB?.map((item, keys) => {
                                    return <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} key={keys}>
                                        {
                                            item?.map((curItem, index) => {
                                                return <React.Fragment key={index}>
                                                    <div className='overflow-hidden my-2 pe-col' onClick={() => handleShow(curItem.id)}>
                                                        <img src={curItem?.img} className='img-fluid' />
                                                    </div>
                                                </React.Fragment>
                                            })
                                        }
                                    </Col>
                                })
                            }
                        </Row>
                    </Container>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <h3 className='text-center fw-bold'>Press Continue to Start</h3>
                </Modal.Body>
                <div className="d-flex mb-3 justify-content-center">
                    <button className='btn btn-dark mx-2 ' onClick={handleClose}>
                        Close
                    </button>
                    <button className='btn btn-warning mx-2' onClick={handleContinue}>
                        Continue <MdStart />
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Template