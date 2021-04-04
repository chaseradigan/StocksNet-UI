import React, { Component } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { StarFill, Star } from 'react-bootstrap-icons';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';
export default class AllStocks extends Component {
    constructor() {
        super();
        this.state = {
            stocks: [],
            loading:true
        }
    }
    componentDidMount() {
        this.getStocks();
    }
    async getStocks() {
        await axios.get('http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/stocks').then(response => {
            console.log(response.data);
            this.setState({ stocks: response.data, loading:false })
        }).catch(error => {
            console.log(error);
        })
    }
    render() {
        return (
            <Container fluid style={{ paddingLeft: 72, paddingRight: 72, paddingTop: 42 }}>
                {this.state.loading ?
                    <Spinner /> :
                    <Table style={{ backgroundColor: "rgba(255,255,255,0.5)" }} className="shadow" hover={true}>
                        <TableHead style={{ backgroundColor: 'white' }}>
                            <TableRow>
                                <TableCell style={{ borderTopLeftRadius: 10 }}>Symbol</TableCell>
                                <TableCell style={{ borderTopRightRadius: 10 }}>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.stocks.map(stock => (
                                <TableRow>
                                    <TableCell>{stock.ticker}</TableCell>
                                    <TableCell>{stock.companyName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </Container>
        )
    }
}
