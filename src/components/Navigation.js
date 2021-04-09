import React, { Component } from 'react'
import { Button } from 'antd';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import cookie from 'react-cookies'
export default class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            scrollingDown: false,
            active: "/",
            loggedIn: false
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
        this.setState({
            loggedIn: cookie.load('username') === undefined ? false:true
        })

    }
    onClick(location) {
        this.setState({ active: location });
        this.props.p.history.push(location);
    }
    handleLogout(){
        cookie.remove('username', {path:'/'});
        this.setState({loggedIn:false})
        this.props.p.history.push("/");
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
                        hidden={cookie.load('username') === undefined || !this.state.loggedIn}
                    >
                        Favorites
                    </Button>
                    <Button
                        size={"large"}
                        style={{ marginLeft: "auto", backgroundColor: "#028C6A", color: "white", border: 'none' }}
                        onClick={() => this.props.p.history.push("/login")}
                        hidden={cookie.load('username') !== undefined || this.state.loggedIn}
                    >
                        Log in
                    </Button>
                    <Button
                        size="large"
                        style={{ marginLeft: 20, backgroundColor: "black", color: 'white', border: 'none' }}
                        onClick={() => this.props.p.history.push("/signup")}
                        hidden={cookie.load('username') !== undefined || this.state.loggedIn}
                    >
                        Sign up
                    </Button>
                    <Button
                        size={"large"}
                        style={{ marginLeft: "auto", backgroundColor: "#028C6A", color: "white", border: 'none' }}
                        onClick={() => this.handleLogout()}
                        hidden={cookie.load('username') === undefined || !this.state.loggedIn}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}
