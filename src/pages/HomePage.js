import React, { Component } from 'react'
import { Col, Layout, Button, Row } from 'antd';
import { Card, CardContent, Typography } from '@material-ui/core';
import { ArrowRightOutlined } from '@ant-design/icons';
import stocklottie from '../images/stocklottie.json';
import Lottie from 'lottie-react';
import Navigation from '../components/Navigation';
const {  Content } = Layout;
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            backgroundUrl: "",
            theposition: 0,
            scrollingDown: false
        }
    }
    componentDidMount() {
        document.addEventListener("wheel", (event) => {
            if (event.deltaY > 0) {
                this.setState({ scrollingDown: true })
            } else {
                this.setState({ scrollingDown: false })
            }
        });
    }

    render() {
        return (
            <Layout style={{ backgroundColor: "white" }}>
                <Navigation p={this.props}/>
                <Row style={{ height: "80vh" }}>
                    <Col span={14}>

                        <Content className="valign">
                            <Card style={{ boxShadow: 'none', marginLeft: 74, position: "absolute", top: "40%" }}>
                                <CardContent >
                                    <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "left" }}>
                                        Stay ahead of your investments.
                                        </Typography>
                                    <Typography variant="h4" style={{ textAlign: "left" }}>
                                        Start tracking stocks and stay up to date.
                                    </Typography>
                                    <Button onClick={() => this.props.history.push('/signup')} style={{ float: "right", color: "#028C6A" }} size="large" type="text">
                                        Get Started
                                        <ArrowRightOutlined />
                                    </Button>
                                </CardContent>
                            </Card>
                        </Content>
                    </Col>
                    <Col span={10}>
                    
                            <div style={{margin:'auto', marginTop:"10%"}}>
                                <Lottie animationData={stocklottie} style={{ maxHeight:750, maxWidth:750 }} />
                            </div>
                       
                    </Col>
                </Row>
            </Layout >
        )
    }
}
