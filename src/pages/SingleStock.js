import React, { Component } from 'react';
import MomentUtils from '@date-io/moment';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
    LineChart,
    XAxis,
    Line,
    YAxis,
    ResponsiveContainer
} from "recharts";
import { Col, Container, Row } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import axios from "axios";
import { Spin } from 'antd';
import moment from "moment";
import { Button } from '@material-ui/core';

export default class SingleStock extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            fromDate: moment().subtract(1, 'week'),
            toDate: moment(),
            loading: true
        }
    }
    componentDidMount() {
        this.getStockHistory();
    }

    async getStockHistory() {
        let fromDate = this.state.fromDate.format('YYYY-MM-DD');
        let toDate = this.state.toDate.format('YYYY-MM-DD');
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/stockhistory/ticker/${this.props.match.params.ticker}/${toDate}/${fromDate}`)
            .then(response => {
                console.log(response.data);
                this.setState({ loading: false, data: response.data });
                if (response.data.length > 0) {
                    this.setState({ fromDate: moment(response.data[0].key.date) })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        return (
            <>
                <Navigation p={this.props} />
                <Container fluid style={{  paddingTop: 42 }}>
                    {this.state.loading ?
                        <Spin /> :
                        <Row>
                            <Col xs={12} sm={12}  md={12} lg={8} style={{minHeight:'80vh'}}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker value={this.state.fromDate} format="MMM Do, YYYY" onChange={(e) => this.setState({ fromDate: e })} />
                                    <DatePicker value={this.state.toDate} format="MMM Do, YYYY" onChange={(e) => this.setState({ toDate: e })} />
                                </MuiPickersUtilsProvider>
                                <Button onClick={() => this.getStockHistory()}>Go</Button>
                                <ResponsiveContainer width="100%" height="90%">
                                    <LineChart
                                        width={1000}
                                        height={400}
                                        data={this.state.data}
                                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                    >
                                        <XAxis
                                            dataKey="key.date"
                                            tickFormatter={timeStr => moment(timeStr).format('MM/D/YY')}

                                        />
                                        <YAxis dataKey="close" />
                                        <Line type="monotone" dataKey="close" format={close => `$${close}`} stroke="#028C6A" />

                                    </LineChart>
                                </ResponsiveContainer>
                            </Col>
                            <Col >

                            </Col>
                        </Row>
                    }
                </Container>
            </>
        )
    }
}
