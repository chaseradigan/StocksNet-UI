import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export default class StockList extends Component {
    constructor(){
        super();
        this.state={
            loading:false
        }
    }
    render() {
       
        return (
            <Card className="shadow" style={{borderRadius:10}}>
                <Card.Body>
                    <Card.Title style={{textAlign:'left'}}>{this.props.title}</Card.Title>
                    <ListGroup variant="flush" style={{textAlign:'left'}}>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}
