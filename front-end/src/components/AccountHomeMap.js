import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'semantic-ui-react';
import Geocode from "react-geocode";
import { connect } from "react-redux"
import { addCourseDetails } from "../actions/courseActions"
import { addCoursePictures } from "../actions/courseActions"


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

    //Fetches courses from back end
    fetchCourses = () => {
        fetch("http://localhost:3000/dg_courses")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ courses: data })
            })
    }

    //Creates Markers for all courses
    createCourseMarkers = (course) => {
        if (course.name.toLowerCase().includes(this.props.mapNameSearchTerm)) {
            if (course.city.toLowerCase().includes(this.props.mapCitySearchTerm)) {
                return this.courseMarkerHelperMethod(course)
            }
        }
    }

    //Helper method to create details for course markers
    courseMarkerHelperMethod = (course) => {
        const courseCoords = [course.courseLat, course.courseLong]
        return (
            <Marker position={courseCoords} key={course.name} >
                <Popup key={course.name}>
                    <p>DGCourse Review Rating:</p><img src={course.dgRatingImg} alt={course.name}></img>
                    <h1>{course.name}</h1>
                    <p>{course.street} {course.city} {course.state}, {course.zip}</p>
                    <p>Holes: {course.holes}</p>
                    <a href={course.dgCourseLink} target="_blank" rel="noopener noreferrer">For More Details Click Here</a>
                    <Button content='Start New Round' icon='child' labelPosition='center' color='yellow' onClick={() => this.handleStartRoundOnCourse(course)} />
                </Popup>
            </Marker>
        )
    }

    //Handles Start Round functionality
    handleStartRoundOnCourse = (course) => {
        console.log("Course Clicked: ", course)
        this.fetchCourseDetails(course)
        this.fetchCoursePictures(course)
    }

    //Helper Method to fetch course details with hole information
    fetchCourseDetails = (course) => {
        const courseID = course.DGCourseReviewApiId
        const md5 = require('md5');
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const api_key = `${process.env.REACT_APP_DG_API_KEY}`
        const sig_key = `${process.env.REACT_APP_DG_SIG_KEY}`
        const sig = md5(`${api_key}${sig_key}holeinfo`)
        const fetchUrl = `https://www.dgcoursereview.com/api_test/?key=${api_key}&mode=holeinfo&id=${courseID}&sig=${sig}`
        return fetch(proxyurl + fetchUrl)
            .then(resp => resp.json())
            .then(data => {
                this.props.addCourseDetails(data)
            })
    }

    //Helper Method to fetch course pictures
    fetchCoursePictures = (course) => {
        const courseID = course.DGCourseReviewApiId
        const md5 = require('md5');
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const api_key = `${process.env.REACT_APP_DG_API_KEY}`
        const sig_key = `${process.env.REACT_APP_DG_SIG_KEY}`
        const sig = md5(`${api_key}${sig_key}crsephto`)
        const fetchUrl = `https://www.dgcoursereview.com/api_test/?key=${api_key}&mode=crsephto&id=${courseID}&sig=${sig}`
        return fetch(proxyurl + fetchUrl)
            .then(resp => resp.json())
            .then(data => {
                console.log("Course Pictures:", data)
                this.props.addCoursePictures(data)
            })
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
                {this.props.user ? <Marker position={this.state.usersCoordinates} >
                    <Popup>
                        <h1>My Address</h1>
                    </Popup>
                </Marker>
                    :
                    null}
            </LeafletMap>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addCourseDetails: (courseDetails) => { dispatch(addCourseDetails(courseDetails)) },
        addCoursePictures: (coursePictures) => { dispatch(addCoursePictures(coursePictures)) }
    }
}

export default connect(null, mapDispatchToProps)(AccountHomeMap)


