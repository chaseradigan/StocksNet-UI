import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FavoritesCard from '../components/FavoritesCard';
import Navigation from '../components/Navigation'
import axios from 'axios';
import cookie from 'react-cookies';
import { Spin } from 'antd';
import { Typography } from '@material-ui/core';
export default class FavoriteStocks extends Component {
    constructor() {
        super();
        this.state = {
            favorites: [],
            stocks: [],
            loading: true
        }
    }
    componentDidMount() {
        this.getStocks();
        this.getUsersFavorites();
    }

    async getUsersFavorites() {
        this.setState({ loading: true })
        await axios
            .get(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/favoritestock/${cookie.load('username')}`)
            .then(response => {
                console.log(response);
                this.setState({ favorites: response.data })
            }).catch(error => {
                console.log(error);
            });
    }
    async toggleOwnerShip(ticker){
        await axios.post(`http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/favoritestock/toggleown`,{
            uid:cookie.load('username'),
            ticker:ticker
        })
        .then(response=>{
            console.log(response.data)
            let favorites = this.state.favorites;
            for(let i = 0; i < favorites.length; i++){
                if(favorites[i].key.ticker === ticker){
                    favorites[i].owned = !favorites[i].owned
                    break;
                }
            }
            this.setState({favorites:favorites})
        }).catch(error=>{
            console.log(error)
        })
    }
    async getStocks() {
        this.setState({ loading: true })
        await axios.get('http://sp21-cs411-29.cs.illinois.edu:8080/api/v1/stocks').then(response => {
            console.log(response.data);
            this.setState({ stocks: response.data, loading: false })
        }).catch(error => {
            console.log(error);
        })
    }
    render() {
        return (
            <>
                <Navigation p={this.props} />
                <Container fluid style={{ paddingLeft: 72, paddingRight: 72, paddingTop: 42 }}>
                    {this.state.loading ?
                        <Spin /> :
                        <>
                            <Typography style={{ textAlign: 'left' }} variant="h5" component="h5">
                                Favorite stocks you own
                            </Typography>
                            <Row>
                                {this.state.favorites.filter(e => { return e.owned === true }).map((favorite) => (
                                    <Col sm={12} md={6} lg={4} xl={3} >
                                        <FavoritesCard
                                            p={this.props}
                                            favorite={favorite}
                                            stock={this.state.stocks.filter(e => e.ticker === favorite.key.ticker)[0]}
                                            toggleOwnerShip={(ownership)=>this.toggleOwnerShip(ownership)}
                                        />
                                    </Col>
                                ))
                                }
                            </Row>
                            <Typography style={{ textAlign: 'left', marginTop:32 }} variant="h5" component="h5">
                                Favorite unowned stocks
                            </Typography>
                            <Row>
                                {this.state.favorites.filter(e => { return e.owned === false }).map((favorite) => (
                                    <Col key={favorite.key.ticker} sm={12} md={6} lg={4} xl={3} >
                                        <FavoritesCard
                                            p={this.props}
                                            favorite={favorite}
                                            stock={this.state.stocks.filter(e => e.ticker === favorite.key.ticker)[0]}
                                            toggleOwnerShip={(ticker)=>this.toggleOwnerShip(ticker)}
                                        />
                                    </Col>
                                ))
                                }
                            </Row>
                        </>
                    }
                </Container>
            </>
        )
    }
}
