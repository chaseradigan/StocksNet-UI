import React, { Component } from 'react'
import { Avatar, Card, CardContent, CardActions, CardHeader, Collapse, IconButton, Typography, Button } from '@material-ui/core'
import FavoriteIcon from "@material-ui/icons/Favorite"
import FullscreenIcon from "@material-ui/icons/Fullscreen"
import { Col, Row } from 'react-bootstrap';
import cookie from "react-cookies";
import axios from "axios";

export default class FavoritesCard extends Component {
    constructor() {
        super();
        this.state = {
            expanded: false,
            favorite: false
        }
    }
    removeFavorite() {
        console.log("ADD REMOVE ENDPOINT")
    }

    render() {
        // {
        //     "key": {
        //         "uid": 1,
        //         "ticker": "AAPL"
        //     },
        //     "owned": true
        // }
        return (
            <Card
                style={{
                    borderRadius: 2, borderColor: 'rgba(0,0,0,0.1)', borderStyle: "solid", marginTop: 10
                }}
            >
                <CardHeader
                    style={{
                        borderBottomColor: 'rgba(0,0,0,0.8)', borderBottomStyle: "solid"
                    }}
                    avatar={
                        <Avatar aria-label="ticker"
                            style={{ fontSize: 12, color: 'white', backgroundColor: 'rgba(0,0,0,0.85)' }}
                        >
                            {this.props.favorite.key.ticker}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => this.props.p.history.push(`/stock/${this.props.favorite.key.ticker}`)}>
                            <FullscreenIcon />
                        </IconButton>
                    }
                    title={
                        <h5>
                            {this.props.stock.companyName}
                        </h5>
                    }

                />
                <CardContent style={{ paddingBottom: 0 }}>
                    <Row style={{ textAlign: 'center', marginBottom: 10 }}>
                        <Col>
                            <Typography style={{ margin: 'auto' }} className="textGreen" variant="h4" color="textSecondary" component="h4">
                                ${this.props.favorite.price}
                            </Typography>
                        </Col>
                        <Col>
                            <Typography style={{ margin: 'auto' }} variant="h4" color="textSecondary" component="h4">
                                {0.9}
                            </Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography style={{ fontSize: 12 }}>
                                24h +/-
                            </Typography>
                            <Typography variant="p" color="textSecondary" component="p">
                                ${this.props.favorite.price}
                            </Typography>
                        </Col>

                        <Col>
                            <Typography style={{ fontSize: 12 }}>
                                24h +/-
                            </Typography>
                            <Typography variant="p" color="textSecondary" component="p">
                                ${this.props.favorite.price}
                            </Typography>
                        </Col>
                    </Row>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={() => this.removeFavorite()} aria-label="add to favorites">
                        <FavoriteIcon style={{ color: "pink" }} />
                    </IconButton>

                    <Button
                        style={{ marginLeft: 'auto' }}
                        onClick={() => this.props.toggleOwnerShip(this.props.favorite.key.ticker)} aria-label="add to favorites">
                        {this.props.favorite.owned ? 'Unown' : 'Own'}
                    </Button>
                </CardActions>
                <Collapse
                    in={this.state.expanded}
                    onClick={() => this.setState({ expanded: true })}
                    timeout="auto"
                    unmountOnExit
                >
                    <CardContent>
                        <Typography paragraph>Tweets</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}
