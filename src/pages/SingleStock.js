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
import { Col, Container, Row, Spinner, ButtonGroup } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import axios from "axios";
import { Spin } from 'antd';
import moment from "moment";
import { Button, Card, CardContent, CardHeader, Checkbox, Chip, FormControlLabel, FormLabel, IconButton } from '@material-ui/core';
import ReactWordcloud from 'react-wordcloud';
import { TwitterTweetEmbed } from "react-twitter-embed";
import TwitterIcon from '@material-ui/icons/Twitter';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default class SingleStock extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            price: '',
            fromDate: moment().subtract(1, 'year'),
            toDate: moment('2021-04-15'),
            tweetsDate: moment('2021-04-15'),
            loading: true,
            wordCount: [],
            tweets: [],
            loadingTweets: true,
            allTweets: [],
            page: 0,
            active: 'positive',
            active2: 'all',
            checked: false,
            avgSentiment: 0,
            totalTweets: 0,
            tweetsStart: moment().format('YYYY-MM-DD').toString(),
            tweetsEnd: moment().format('YYYY-MM-DD').toString()
        }
    }
    componentDidMount() {
        this.getStockHistory();
        this.getAllTweets();
        this.getWordCloud();
        this.getBest();
    }
    async getWordCloud() {
        console.log()
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/wordcount/$${this.props.match.params.ticker}`)
            .then(response => {
                console.log(response.data);
                let wordCount = [];
                for (let i = 0; i < response.data.length; i++) {
                    let count = {};
                    count.text = response.data[i].word;
                    count.value = response.data[i].value
                    wordCount.push(count);
                }
                this.setState({ wordCount: wordCount });
            })
            .catch(error => {
                console.log(error);
            })
    }
    async getWordCloudDate() {
        console.log();
        let date = this.state.tweetsDate.format("MMMDDYYYY")
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/wordcount/$${this.props.match.params.ticker}/${date}`)
            .then(response => {
                console.log(response.data);
                let wordCount = [];
                for (let i = 0; i < response.data.length; i++) {
                    let count = {};
                    count.text = response.data[i].word;
                    count.value = response.data[i].value
                    wordCount.push(count);
                }
                this.setState({ wordCount: wordCount });
            })
            .catch(error => {
                console.log(error);
            })
    }
    async getStockHistory() {
        let fromDate = this.state.fromDate.format('YYYY-MM-DD');
        let toDate = this.state.toDate.format('YYYY-MM-DD');
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/stocks/fullhistory/${this.props.match.params.ticker}/${fromDate}/${toDate}`)
            .then(response => {
                console.log(response.data);
                let temp = response.data.reverse();
                this.setState({ loading: false, data: temp, price: temp[temp.length - 1].close });
                if (temp.length > 0) {
                    this.setState({ fromDate: moment(temp[0].date) })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    async getAllTweets() {
        this.setState({ loadingTweets: true });
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/tweethistory/${this.props.match.params.ticker}`)
            .then(response => {
                console.log(response.data);
                let data = response.data;
                let total = 0;
                let avg = 0;
                for (let i = 0; i < data.length; i++) {
                    total += response.data[i].score;
                }
                avg = total / data.length;
                let start = moment(data[0].date).format('YYYY-MM-DD').toString();
                let end = moment(data[data.length - 1].date).format('YYYY-MM-DD').toString();
                console.log(end)
                this.setState({
                    allTweets: response.data,
                    avgSentiment: Number(avg).toFixed(3),
                    totalTweets: data.length,
                    tweetsStart: start,
                    tweetsEnd: end,
                    loadingTweets: false
                });

            })
            .catch(error => {
                console.log(error);
            })
    }
    async getTweets() {
        this.setState({ loadingTweets: true });
        let fromDate = this.state.tweetsDate.format('YYYY-MM-DD');
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/tweethistory/all/${this.props.match.params.ticker}/${fromDate}`)
            .then(response => {
                console.log(response.data);
                this.setState({ tweets: response.data, loadingTweets: false });

            })
            .catch(error => {
                console.log(error);
            })
    }
    async getBest() {
        this.setState({ loadingTweets: true })
        let fromDate = this.state.tweetsDate.format('YYYY-MM-DD');
        let toDate = this.state.toDate.format('YYYY-MM-DD');
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/tweethistory/best/${this.props.match.params.ticker}`)
            .then(response => {
                console.log(response.data);
                this.setState({ tweets: response.data, loadingTweets: false });

            })
            .catch(error => {
                console.log(error);
            })
    }
    async getWorst() {
        this.setState({ loadingTweets: true });
        let fromDate = this.state.tweetsDate.format('YYYY-MM-DD');
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/tweethistory/worst/${this.props.match.params.ticker}`)
            .then(response => {
                console.log(response.data);
                let tweets = [];
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].score < 0) {
                        tweets.push(response.data[i]);
                    }
                }
                this.setState({ tweets: tweets, loadingTweets: false });

            })
            .catch(error => {
                console.log(error);
            })
    }

    async getBestDate() {
        this.setState({ loadingTweets: true })
        let fromDate = this.state.tweetsDate.format('YYYY-MM-DD');
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/tweethistory/best/${this.props.match.params.ticker}/${fromDate}`)
            .then(response => {
                console.log(response.data);
                this.setState({ tweets: response.data, loadingTweets: false });

            })
            .catch(error => {
                console.log(error);
            })
    }
    async getWorstDate() {
        this.setState({ loadingTweets: true })
        let fromDate = this.state.tweetsDate.format('YYYY-MM-DD');
        await axios.get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/tweethistory/worst/${this.props.match.params.ticker}/${fromDate}`)
            .then(response => {
                console.log(response.data);
                this.setState({ tweets: response.data, loadingTweets: false });

            })
            .catch(error => {
                console.log(error);
            })
    }



    render() {

        return (
            <>
                <Navigation p={this.props} />
                <Container fluid style={{ paddingTop: 42 }}>
                    <div style={{ textAlign: 'left' }}>
                        <IconButton onClick={() => this.props.history.goBack()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <h2 style={{ display: "inline-block", marginLeft: 42 }}>{this.props.match.params.ticker}</h2>
                    </div>
                    {this.state.loading ?
                        <Spin /> :
                        <>
                            <Row >
                                <Col xs={8} sm={8} md={8} lg={8} style={{ minHeight: '50vh' }}>
                                    <div style={{ paddingBottom: 20 }}>
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <DatePicker value={this.state.fromDate} format="MMM Do, YYYY" onChange={(e) => this.setState({ fromDate: e })} />
                                            <DatePicker value={this.state.toDate} format="MMM Do, YYYY" onChange={(e) => this.setState({ toDate: e })} />
                                        </MuiPickersUtilsProvider>
                                        <Button onClick={() => this.getStockHistory()}>Go</Button>
                                    </div>
                                    <ResponsiveContainer width="100%" height="90%" >
                                        <LineChart
                                            width={1000}
                                            height={400}
                                            data={this.state.data}
                                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                        >
                                            <XAxis
                                                dataKey="date"
                                                tickFormatter={timeStr => moment(timeStr).format('MM/D/YY')}

                                            />
                                            <YAxis dataKey="close" domain={['dataMin', 'dataMax']} />
                                            <Line type="monotone" dataKey="close" format={close => `$${close}`} stroke="#028C6A" />

                                        </LineChart>
                                    </ResponsiveContainer>
                                </Col>
                                <Col style={{ paddingTop: 22 }}>
                                    <Card>
                                        <CardHeader
                                            title={
                                                <h4 style={{ marginBottom: 0 }}>Price</h4>
                                            }
                                        />
                                        <CardContent>
                                            <span style={{ fontSize: 22 }}>${this.state.price}</span>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader
                                            title={
                                                <h5 style={{ marginBottom: 0 }}>Average Sentiment</h5>
                                            }
                                        />
                                        <CardContent>
                                            <span style={{ fontSize: 22 }}>{this.state.avgSentiment}</span>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader
                                            title={
                                                <h5 style={{ marginBottom: 0 }}>Total Tweets</h5>
                                            }
                                        />
                                        <CardContent>
                                            <span style={{ fontSize: 22 }}>{this.state.totalTweets}</span>
                                        </CardContent>
                                    </Card>
                                    <Card style={{ borderBottom: 'none', boxShadow: "none" }}>
                                        <CardHeader
                                            title={
                                                <h5 style={{ marginBottom: 0 }}>Tweet Range</h5>
                                            }
                                        />
                                        <CardContent>
                                            <span style={{ fontSize: 22 }}>
                                                {this.state.tweetsStart} - {this.state.tweetsEnd}
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{ textAlign: "left", padding: 20, paddingTop: 30 }}>
                                    <ButtonGroup aria-label="Basic example" style={{marginRight:22}}>
                                    <Button
                                            style={this.state.active2 === 'all' ? { backgroundColor: "black", color: "white" } : {backgroundColor:"rgba(0,0,0,0.1)"}}
                                            variant="secondary"
                                            onClick={() => {
                                                this.getWordCloud();
                                                if (this.state.active === "positive") {
                                                    this.getBest();
                                                }
                                                else if (this.state.active === "negative") {
                                                    this.getWorst();
                                                }
                                                this.setState({ active2: 'all' });
                                            }} >
                                            All
                                                  </Button>
                                        <Button
                                            style={this.state.active2 === 'date' ? { backgroundColor: "black", color: "white" } : {backgroundColor:"rgba(0,0,0,0.1)"}}
                                            variant="secondary"
                                            onClick={() => {
                                                this.getWordCloudDate();
                                                if (this.state.active === "positive") {
                                                    this.getBestDate();
                                                }
                                                else if (this.state.active === "negative") {
                                                    this.getWorstDate();
                                                }
                                                this.setState({ active2: 'date' });
                                            }} >
                                            By Date
                                                  </Button>
                                       
                                    </ButtonGroup>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DatePicker
                                        hidden={this.state.active2==="all"}
                                            value={this.state.tweetsDate}
                                            format="MMM Do, YYYY"
                                            onChange={(e) => this.setState({ tweetsDate: e })} />
                                    </MuiPickersUtilsProvider>
                                    <Button
                                    hidden={this.state.active2==="all"}
                                        onClick={() => {
                                            if (this.state.active === "positive") {
                                                this.getBestDate();
                                            }
                                            else if (this.state.active === "negative") {
                                                this.getWorstDate();
                                            }
                                            else if (this.state.active === "combined") {
                                                this.getTweets();
                                            }

                                        }}
                                    >
                                        Go
                                        </Button>
                                </div>

                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center' }}>

                                    <ReactWordcloud
                                        words={this.state.wordCount}
                                        options={{ fontSizes: [16, 36], padding: 6 }}
                                        minSize={[400, 200]}

                                    />
                                </Col>
                            </Row>
                            {this.state.loadingTweets ?
                                <>
                                    Loading tweets...
                                    <br />
                                    <Spinner />
                                </> :
                                <Container fluid style={{ marginTop: 20 }}>
                                    <h2 style={{ textAlign: 'left' }}>Tweets <TwitterIcon style={{ color: '#1DA1F2' }} /></h2>
                                    <div style={{ textAlign: 'left', marginBottom:22 }}>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button
                                                style={this.state.active === 'positive' ? { backgroundColor: "#1DA1F2", color: "white" } : {}}
                                                variant="secondary"
                                                onClick={() => {
                                                    this.getBest();
                                                    this.setState({ active: 'positive' });
                                                }} >
                                                Best
                                                  </Button>
                                            <Button
                                                style={this.state.active === 'negative' ? { backgroundColor: "#1DA1F2", color: "white" } : {}}
                                                variant="secondary"
                                                onClick={() => {
                                                    if (this.state.active2 === "date")
                                                        this.getWorstDate();
                                                    else
                                                        this.getWorst();
                                                    this.setState({ active: 'negative' });
                                                }}>
                                                Worst
                                                  </Button>
                                            <Button
                                                style={this.state.active === 'combined' ? { backgroundColor: "#1DA1F2", color: "white" } : {}}
                                                variant="secondary"
                                                hidden={this.state.active2 === "all"}
                                                onClick={() => {
                                                    this.getTweets();
                                                    this.setState({ active: 'combined' });
                                                }}>
                                                Combined
                                                  </Button>
                                        </ButtonGroup>
                                    </div>

                                    <Row>
                                        {this.state.tweets.sort((a, b) => {
                                            if (a.score > b.score) {
                                                return -1
                                            } else if (a.score < b.score) {
                                                return 1;
                                            } else {
                                                return 0;
                                            }
                                        }).map(e => (
                                            <Col>
                                                <div style={{ textAlign: 'left' }}>
                                                    <Chip
                                                        style={e.score >= 0 ? { backgroundColor: "#028C6A", color: 'white' } : { backgroundColor: 'red', color: 'white' }}
                                                        label={`Sentiment Score: ${e.score}`}
                                                    />
                                                </div>
                                                <TwitterTweetEmbed
                                                    style={{ maxWidth: 1000, width: '100%' }}
                                                    tweetId={e.key.tweetID}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            }
                        </>
                    }
                </Container>
            </>
        )
    }
}
