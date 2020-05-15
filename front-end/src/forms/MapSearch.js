import React from 'react';
import {
    Button,
    Form,
    Grid,
    Message,
    Segment,
} from 'semantic-ui-react';

const MapSearch = (props) => (
    <div>
        <h1 id="mapFilerHeader">Map Filter</h1>
        <Form size="large" >
            <Form.Input
                fluid
                icon="globe"
                iconPosition="left"
                placeholder="Search by Course Name..."
                onChange={(event) => props.handleNameFilterChange(event)}
            />
            <Form.Input
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Search by City..."
                onChange={(event) => props.handleCityFilterChange(event)}
            />
        </Form>

    </div >
)

export default MapSearch