import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

const EditPCModal = (props) => (
    <Modal open={props.renderPCEditForm}>
        <Modal.Header>Update PlayerCard</Modal.Header>
        <Modal.Content image>
            <Image wrapped size='medium' src={require("../images/MultiDiscs.png")} alt="Discs Form Image" />
            <Modal.Description>
                <Header>PlayerCard</Header>
                <Form size="large" onSubmit={(event) => props.handlePCFormEditSubmit(event)}>
                    <Form.Input
                        required
                        fluid
                        icon="smile outline"
                        iconPosition="left"
                        placeholder="User Picture"
                        name="userImg"
                        value={props.currentUser.userImg}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Form.Input
                        required
                        fluid
                        icon="address card"
                        iconPosition="left"
                        placeholder="Email address"
                        name="email"
                        value={props.currentUser.email}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Form.Input
                        required
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="First Name"
                        name="firstName"
                        value={props.currentUser.firstName}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Form.Input
                        required
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Last Name"
                        name="lastName"
                        value={props.currentUser.lastName}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Form.Input
                        required
                        fluid
                        icon="road"
                        iconPosition="left"
                        placeholder="Street"
                        name="street"
                        value={props.currentUser.street}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Form.Input
                        required
                        fluid
                        icon="building"
                        iconPosition="left"
                        placeholder="City"
                        name="city"
                        value={props.currentUser.city}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Form.Input
                        required
                        fluid
                        icon="university"
                        iconPosition="left"
                        placeholder="State"
                        name="state"
                        value={props.currentUser.state}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Form.Input
                        required
                        fluid
                        icon="compass outline"
                        iconPosition="left"
                        placeholder="Zip"
                        name="zip"
                        value={props.currentUser.zip}
                        onChange={(event) => props.handleEditPCFormInputChange(event)}
                    />
                    <Button content='Submit Updated Card' icon='edit' labelPosition='center' color='green' />
                    <Button content='Close' icon='close' labelPosition='center' onClick={props.handlePCFormCloseBtn} color='red' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default EditPCModal
