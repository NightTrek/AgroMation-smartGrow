import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
//import axios from "axios";
//redux actions
import {addGrowRoom, fetchUserGrowRoomsAndStatus} from "../../actions";
//auth
import requireAuth from "../../hoc/requireAuth";




class Dashboard2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading:true
        }
    }

    render() {
        return (
            <div>
                <h1>This is the dashboard</h1>
            </div>
        );
    }

}





function mapStateToProps({state}) {
    return {state};
}

const formedComponent = compose(
    connect(mapStateToProps, {addGrowRoom: addGrowRoom, fetchGrowRooms: fetchUserGrowRoomsAndStatus}),
    reduxForm({form: 'Add todo'})
)(Dashboard2);

export default requireAuth(formedComponent);
