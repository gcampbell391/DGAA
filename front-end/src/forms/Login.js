import React from 'react';
import {
    Button,
    Form,
    Grid,
    Message,
    Segment,
} from 'semantic-ui-react';

const Login = (props) => (
    <div className="LoginFormContainer">
        <Grid centered columns={2}>
            <Grid.Column>
                <Segment>
                    <Form size="large" onSubmit={(event) => props.handleLoginSubmit(event)} id="LoginForm">
                        <Form.Input
                            required
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Email address"
                            id="emailInput"
                        />
                        <Form.Input
                            required
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            id="passwordInput"
                        />

                        <Button color="green" fluid size="large">
                            Login
            </Button>
                    </Form>
                </Segment>
                <Message>
                    {props.showLoginError ? <p id="loginAlert">Invalid Login Attempt..Please try again</p>
                        :
                        <p id="loginSignUpTag">Not registered yet? <Button color="yellow" onClick={props.handleSignUpClick}>Sign Up Today</Button></p>
                    }

                </Message>
            </Grid.Column>
        </Grid>
    </div>
);


export default Login