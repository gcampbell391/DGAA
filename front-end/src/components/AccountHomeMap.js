import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import Geocode from "react-geocode";


class AccountHomeMap extends React.Component {
    state = {
        courses: [],
        positionCoordinates: [40.8831, -72.9422],
        usersCoordinates: [0, 0]
    }

    componentDidMount() {
        this.fetchCourses()
        const user = this.props.user ? this.props.user : null
        const userAddress = user ? `${user.street} ${user.city} ${user.state} ${user.zip}` : "no user"
        const GOOGLE_API_KEY = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`
        Geocode.setApiKey(GOOGLE_API_KEY);
        Geocode.fromAddress(userAddress).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({ usersCoordinates: [lat, lng] })
            },
            error => {
                console.error(error);
            }
        );
    }

    fetchCourses = () => {
        fetch("http://localhost:3000/dg_courses")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ courses: data })
            })
    }

    createCourseMarkers = (course) => {
        if (course.name.toLowerCase().includes(this.props.mapNameSearchTerm)) {
            if (course.city.toLowerCase().includes(this.props.mapCitySearchTerm)) {
                return this.courseMarkerHelperMethod(course)
            }
        }
    }

    courseMarkerHelperMethod = (course) => {
        const courseCoords = [course.courseLat, course.courseLong]
        return (
            <Marker position={courseCoords} key={course.name}>
                <Popup key={course.name}>
                    <p>DGCourse Review Rating:</p><img src={course.dgRatingImg} alt={course.name}></img>
                    <h1>{course.name}</h1>
                    <p>{course.street} {course.city} {course.state}, {course.zip}</p>
                    <p>Holes: {course.holes}</p>
                    <a href={course.dgCourseLink} target="_blank" rel="noopener noreferrer">For More Details Click Here</a>
                </Popup>
            </Marker>
        )
    }

    render() {
        console.log("Courses:", this.state.courses)
        console.log("Current User Coordinates: ", this.state.usersCoordinates)
        return (
            <LeafletMap
                center={this.state.positionCoordinates}
                zoom={7}
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
                {this.state.courses.map(course => {
                    return this.createCourseMarkers(course)
                })}
                {this.props.user ? <Marker position={this.state.usersCoordinates}>
                    <Popup>
                        <img src={this.props.user.userImg} height="40" alt="User Home"></img>
                    </Popup>
                </Marker>
                    :
                    null}
            </LeafletMap>
        );
    }
}

export default AccountHomeMap


