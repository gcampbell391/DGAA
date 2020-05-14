import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import Geocode from "react-geocode";

class AccountHomeMap extends React.Component {
    state = {
        positionCoordinates: [33.7562, -84.3885],
        usersCoordinates: [0, 0]
    }




    componentDidMount() {
        const user = this.props.user ? this.props.user : null
        const userAddress = user ? `${user.street_name} ${user.city} ${user.state} ${user.zip_code}` : "no user"
        const GOOGLE_API_KEY = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`
        console.log("Map User Address: ", userAddress)
        console.log("API KEY", GOOGLE_API_KEY)
        Geocode.setApiKey(GOOGLE_API_KEY);
        Geocode.fromAddress(userAddress).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("It Worked!", lat, lng);
                this.setState({ usersCoordinates: [lat, lng] })
            },
            error => {
                console.error(error);
            }
        );

    }
    render() {

        console.log("Current User Coordinates: ", this.state.usersCoordinates)
        return (
            <LeafletMap
                center={this.props.user ? this.state.usersCoordinates : this.state.positionCoordinates}
                zoom={18}
                maxZoom={20}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
            >
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={this.state.positionCoordinates}>
                    <Popup>
                        <img src={require("../images/market365Logo.png")} height="40"></img>
                    </Popup>
                </Marker>
                {this.props.user ? <Marker position={this.state.usersCoordinates}>
                    <Popup>
                        <img src={this.props.user.img} height="40"></img>
                    </Popup>
                </Marker>
                    :
                    null}
            </LeafletMap>
        );
    }
}

export default AccountHomeMap


