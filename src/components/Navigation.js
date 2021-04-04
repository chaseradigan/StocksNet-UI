import React, { Component } from 'react'
import { Button } from 'antd';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
export default class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            scrollingDown: false,
            active: "/"
        }
        //#D1EDE1, #7BC5AE, #028C6A
    }
    componentDidMount() {
        document.addEventListener("wheel", (event) => {
            if (event.deltaY > 0) {
                this.setState({ scrollingDown: true })
            } else {
                this.setState({ scrollingDown: false })
            }
        });
        this.setState({active:this.props.location.pathname})
    }
    onClick(location) {
        this.setState({ active: location });
        this.props.history.push(location);
    }
    render() {
        return (
            <AppBar color="transparent" className={this.state.scrollingDown ? "shadowBottom" : ""} style={{ boxShadow: "none", backgroundColor: "white", color: "black", paddingTop: 24, paddingLeft: 54 }} position="sticky">
                <Toolbar>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        StocksNet
                    </Typography>
                    <Button
                        style={{ marginLeft: 50 }}
                        size="large"
                        type="text"
                        className="btn-hover"
                        onClick={() => this.onClick("/")}
                    >
                        Home
                    </Button>
                    <Button
                        style={{ marginLeft: 50 }}
                        size="large"
                        type="text"
                        className="btn-hover"
                        onClick={() => this.onClick("/allstocks")}
                    >
                        Stocks
                    </Button>
                    <Button
                        style={{ marginLeft: 50 }}
                        size="large"
                        type="text"
                        className="btn-hover"
                        onClick={() => this.onClick("/favorites")}
                    >
                        Favorites
                    </Button>
                    <Button
                        size={"large"}
                        style={{ marginLeft: "auto", backgroundColor: "#028C6A", color: "white", border: 'none' }}
                        onClick={() => this.props.history.push("/login")}>
                        Log in
                    </Button>
                    <Button
                        size="large"
                        style={{ marginLeft: 20, backgroundColor: "black", color: 'white', border: 'none' }}
                        onClick={() => this.props.history.push("/signup")}
                    >
                        Sign up
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}
