import React, { Component } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Table, TableBody, TableCell, IconButton, TableHead, TableRow, TextField } from '@material-ui/core';
import FavoriteIcon from "@material-ui/icons/Favorite"
import AddCircle from "@material-ui/icons/AddCircleOutline"
import Navigation from '../components/Navigation';
import cookie from 'react-cookies';
import axios from 'axios';
import { matchSorter } from 'match-sorter';
export default class AllStocks extends Component {
    constructor() {
        super();
        this.state = {
            originalStocks: [],
            stocks: [],
            loading: true,
            favorites: []
        }
    }
    componentDidMount() {
        this.getStocks();
        if (cookie.load('username') !== undefined) {
            this.getUsersFavorites();
        }
    }
    async getStocks() {
        await axios.get('http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/stocks').then(response => {
            console.log(response.data);
            this.setState({ originalStocks: response.data, stocks: response.data, loading: false })
        }).catch(error => {
            console.log(error);
        })
    }
    
    async getUsersFavorites() {
        this.setState({ loading: true })
        await axios
            .get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/favoritestock/${cookie.load('username')}`)
            .then(response => {
                console.log(response);
                this.setState({ favorites: response.data, loading: false })
            }).catch(error => {
                console.log(error);
            });
    }
    async addFavorite(ticker) {
        let payload = {
            "key": {
                "uid": cookie.load('username'),
                "ticker": ticker
            },
            "owned": false
        }
        await axios.post(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/favoritestock`, payload).then(response => {
            console.log(response.data);
            let favorites = this.state.favorites;
            favorites.push(payload);
            this.setState({ favorites: favorites })

        }).catch(error => {
            console.log(error);
        });

    }
    async removeFavorite(ticker) {
        await axios.delete(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/favoritestock/${cookie.load('username')}/${ticker}`)
            .then(response => {
                console.log(response);
                let favorites = [];
                for (let i = 0; i < this.state.favorites.length; i++) {
                    if (this.state.favorites[i].key.ticker !== ticker) {
                        favorites.push(this.state.favorites[i]);
                    }
                }
                this.setState({ favorites: favorites })
            }).catch(error => {
                console.log(error);
            })
    }
    handleSearch(searchValue) {
        //console.log(searchValue)
        let sorted = matchSorter(this.state.originalStocks, searchValue, {
            keys: ["ticker", "companyName"]
        });
        this.setState({ stocks: sorted });
    }
    render() {
        return (
            <>
                <Navigation p={this.props} />
                <Container fluid style={{ paddingLeft: 72, paddingRight: 72, paddingTop: 42 }}>
                    {this.state.loading ?
                        <Spinner /> :
                        <>
                            <div style={{ textAlign: 'left', marginBottom:20 }}>
                                <TextField style={{width:400}} autoComplete="off" name="search" label="Search" onChange={(e) => this.handleSearch(e.target.value)} />
                            </div>
                            <Table style={{ backgroundColor: "rgba(255,255,255,0.5)" }} className="shadow" hover="true">
                                <TableHead style={{ backgroundColor: 'white' }}>
                                    <TableRow>
                                        <TableCell style={{ borderTopLeftRadius: 10 }}>Symbol</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell hidden={cookie.load("username") === undefined} style={{ borderTopRightRadius: 10 }}>Favorite</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.stocks.map(stock => (
                                        <TableRow key={stock.ticker}>
                                            <TableCell>{stock.ticker}</TableCell>
                                            <TableCell>{stock.companyName}</TableCell>
                                            <TableCell hidden={cookie.load("username") === undefined}>
                                                <IconButton
                                                    onClick={() =>
                                                        this.state.favorites.filter(e => { return e.key.ticker === stock.ticker }).length > 0 ? this.removeFavorite(stock.ticker):
                                                        this.addFavorite(stock.ticker)}
                                                >
                                                    {
                                                        this.state.favorites.filter(e => { return e.key.ticker === stock.ticker }).length > 0 ?
                                                            <FavoriteIcon style={{ color: 'pink' }} />
                                                            :
                                                            <AddCircle style={{ color: "rgb(123,197,174, 0.7)" }} />
                                                    }
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    }
                </Container>
            </>
        )
    }
}
