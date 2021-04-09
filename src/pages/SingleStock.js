import React, { Component } from 'react'
import {
  LineChart,
  XAxis,
  Line,
  YAxis
} from "recharts";
import { Container } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import axios from "axios";
import { Spin } from 'antd';
import moment from "moment";

export default class SingleStock extends Component {
    constructor(){
        super();
        this.state={
            data: [],
            
            loading:true
        }
    }
    componentDidMount(){
        this.getStockHistory();
    }

    async getStockHistory(){
        await axios.get('http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/stockhistory')
        .then(response=>{
            console.log(response.data);
            let ticker = String(this.props.match.params.ticker).toUpperCase();
            console.log(ticker);
            let currStock = response.data.filter(e=> e.key.ticker === ticker);
            console.log(currStock)
            this.setState({loading:false, data:currStock});
        })
        .catch(error=>{
            console.log(error);
        })
    }
    
    render() {
        
        return (
            <>
            <Navigation p={this.props}/>
            <Container>
                {this.state.loading ?
                <Spin/>:
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
                    <YAxis dataKey="close"/>
                    <Line type="monotone" dataKey="close" format={close=> `$${close}`} stroke="#ff7300" />
                    
                  </LineChart>}
            </Container>
            </>
        )
    }
}
