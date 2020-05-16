import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

const SignUpModal = (props) => (
    <Modal open={props.renderSignUpForm}>
        {console.log(props.renderSignUpForm)}
        <Modal.Header>Sign Up Today</Modal.Header>
        <Modal.Content image>
            <Image wrapped size='medium' src={require("../images/SignUpDisc.png")} alt="Discs Form Image" />
            <Modal.Description>
                <Header>Create PlayerCard</Header>
                <Form size="large" onSubmit={(event) => props.handleSignUpSubmit(event)}>
                    <Form.Input
                        required
                        fluid
                        icon="smile outline"
                        iconPosition="left"
                        placeholder="User Picture"
                        id="userImg"
                    />
                    <Form.Input
                        required
                        fluid
                        icon="address card"
                        iconPosition="left"
                        placeholder="Email address"
                        id="email"
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
                    <Form.Input
                        required
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="First Name"
                        id="firstName"
                    />
                    <Form.Input
                        required
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Last Name"
                        id="lastName"
                    />
                    <Form.Input
                        required
                        fluid
                        icon="road"
                        iconPosition="left"
                        placeholder="Street"
                        id="street"
                    />
                    <Form.Input
                        required
                        fluid
                        icon="building"
                        iconPosition="left"
                        placeholder="City"
                        id="city"
                    />
                    <Form.Input
                        required
                        fluid
                        icon="university"
                        iconPosition="left"
                        placeholder="State"
                        id="state"
                    />
                    <Form.Input
                        required
                        fluid
                        icon="compass outline"
                        iconPosition="left"
                        placeholder="Zip"
                        id="zip"
                    />
                    <Button content='Create Account' icon='edit' labelPosition='center' color='green' />
                    <Button content='Close' icon='close' labelPosition='center' color='red' onClick={props.handleSignUpCloseBtn} />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default SignUpModal