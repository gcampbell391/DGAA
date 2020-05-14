import React from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
} from 'semantic-ui-react';

const Login = (props) => (
    <Grid centered columns={2}>
        <Grid.Column>
            <Header as="h2" textAlign="center">
                Login
        </Header>
            <Segment>
                <Form size="large" onSubmit={(event) => props.handleLoginSubmit(event)}>
                    <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Email address"
                        id="emailInput"
                    />
                    <Form.Input
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
                Not registered yet? <a href="/SomeLink">Sign Up Today</a>
            </Message>
        </Grid.Column>
    </Grid>
);


export default Login