import React, { Component } from 'react'
import {message, Form, Input, Button, Checkbox, Layout, Row, Col, Divider } from 'antd';
import axios from 'axios';
const tailLayout = {
    wrapperCol: { offset: 2, span: 8 },
};
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            success:false,
            error:""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    async onSubmit(e) {
        this.setState({loading:true})
        console.log(e)
        await axios.get('http://localhost:8080/api/v1/users').then(response=>{
            console.log(response);
            let users = response.data;
            users.map(user=>{
                if(user.userName == e.userName && user.passWord == e.passWord){
                    this.setState({success:true});
                    this.props.history.push("/favorites")
                }else{
                    this.setState({error:"Incorrect UserName or Password"});
                }
            });
            this.setState({loading:false});
        }).catch(error=>{
            console.log(error);
            this.setState({loading:false});
        })
    }
    onFailed(e) {
        console.log(e)
    }
    render() {
        return (
            <div style={{ padding: 42 }}>
                <Layout className="shadow" style={{
                    backgroundColor: 'white', textAlign: "-webkit-center",
                    borderRadius: 5
                }}>
                    <Row>
                        <Col span={6} style={{backgroundColor:"rgb(123,197,174, 0.2)"}}>
                            <div className="loginBackgroundImage" style={{
                                height: "80vh", width: "100%",
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5
                            }}>
                                <h1 style={{ fontFamily: "sans-serif", fontWeight: "bold", fontSize: 70, color: "white", paddingTop: "25%" }}></h1>
                            </div>
                        </Col>
                        <Col span={18} style={{ paddingTop: '10%' }}>

                            <Form
                                style={{ maxWidth: "500px", padding: 10 }}
                                layout="vertical"
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.onSubmit}
                                onFinishFailed={this.onFailed}
                            >
                                <h1 style={{ textAlign: "left", fontWeight: "bold", fontSize: 30 }}>
                                    Login
                                    </h1>
                                
                                <Form.Item
                                    label="UserName"
                                    name="userName"
                                    style={{ textAlign: 'left' }}
                                    rules={[{ required: true, message: 'Input Email Address' }]}
                                >
                                    <Input autoComplete="off"/>
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="passWord"
                                    style={{ textAlign: 'left' }}
                                    rules={[{ required: true, message: 'Input Password' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                {this.state.error?this.state.error:""}
                                <Form.Item >
                                    <Button disabled={this.state.loading} type="primary" htmlType="submit">
                                        Submit
                                </Button>
                                </Form.Item>

                                <Form.Item>
                                    Don't have an account?
                            <Button type="link" onClick={() => this.props.history.push('/signup')}>
                                        Sign Up
                            </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Layout>
            </div>
        )
    }
}
