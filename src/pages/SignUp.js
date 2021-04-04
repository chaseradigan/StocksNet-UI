import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Layout, Row, Col, Divider } from 'antd';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
const tailLayout = {
    wrapperCol: { offset: 2, span: 8 },
};
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            redirect: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    async onSubmit(e) {
        this.setState({ loading: true });
        console.log(e)
        await axios.post('http://localhost:8080/api/v1/users', {
                emailId: e.emailId,
                userName: e.userName,
                passWord: e.passWord
            
        }).then(response => {
            console.log(response);
            this.setState({ loading: false });
            //this.props.history.push('/stocks');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false })
        })
    }
    onFailed(e) {
        console.log(e)
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div style={{ padding: 42 }}>
                <Layout className="shadow" style={{
                    backgroundColor: 'white', textAlign: "-webkit-center",
                    borderRadius: 5
                }}>
                    <Row>
                        <Col span={6} style={{ backgroundColor: "rgb(123,197,174, 0.2)" }}>
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
                                    Sign Up
                                    </h1>
                                <Form.Item
                                    label="Username"
                                    name="userName"
                                    style={{ textAlign: 'left' }}
                                    rules={[{ required: true, message: 'Input Username' }]}

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="emailId"
                                    style={{ textAlign: 'left' }}
                                    rules={[{ required: true, message: 'Input Email Address' }]}

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="passWord"
                                    style={{ textAlign: 'left' }}
                                    rules={[{ required: true, message: 'Input Password' }]}
                                    onChange={(e) => this.onChange(e)}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                </Button>
                                </Form.Item>

                                <Form.Item>
                                    Have an account already?
                            <Button disabled={this.state.loading} type="link" onClick={() => this.props.history.push('/login')}>
                                        {this.state.loading ? <Spinner /> : 'Login'}
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
