import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

const EditPCModal = (props) => (
    <Modal open={props.renderPasswordForm}>
        <Modal.Header>Update Password</Modal.Header>
        <Modal.Content image>
            <Image wrapped size='medium' src={require("../images/PasswordForm.jpeg")} alt="Discs Form Image" />
            <Modal.Description>
                <Header>Update Password</Header>
                <Form size="large" onSubmit={(event) => props.handlePasswordFormSubmit(event)}>
                    <Form.Input
                        required
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Current Password..."
                        name="oldPassword"
                        id="oldPassword"
                    />
                    <Form.Input
                        required
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="New Password..."
                        name="newPassword"
                        id="newPassword"
                    />
                    <Button content='Update Password' icon='edit' labelPosition='center' color='green' />
                    <Button content='Close' icon='close' labelPosition='center' onClick={props.handlePasswordFormCloseBtn} color='red' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default EditPCModal