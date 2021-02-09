import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import myImage from './logo.png';
import {useState} from "react";
import Axios from 'axios';
import {NavLink, Switch, Route, withRouter} from "react-router-dom";


const Login = (props) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(0);
    const [authUsername, setauthUsername] = useState("");
    const [authPassword, setauthPassword] = useState("");

    const checkUserName = ()=>{
        
        Axios.post('http://localhost:3001/checkUserName', {
        Username: Username,
        Password: Password, })
        .then(res => {
          console.log(res.data);
          if(res.data==1){
           props.history.push("/Home");
           setauthUsername(Username);
           setauthPassword(Password);
          }else {
              alert("Wrong Password");
          }
        })
    }


    return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='red' textAlign='center'>
                <Image src={myImage} style={{width:'130px', height:'140px'}}/> Log-in to your account
            </Header>
            <Form size='large'>
                <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='User Name' onChange={(event)=> {setUsername(event.target.value)}}/>
                <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={(event)=> {setPassword(event.target.value)}}
                />
                
                <Button color='red' fluid size='large' onClick={checkUserName}>
                    Login
                </Button>

                </Segment>
            </Form>
            <Message>
                New Employee? <a href='#'>Sign Up</a>
            </Message>
            </Grid.Column>
        </Grid>
)
}

export default withRouter(Login)