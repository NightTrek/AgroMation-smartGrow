import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
//import axios from "axios";
//redux actions
import { addGrowRoom, fetchUserGrowRoomsAndStatus } from "../../actions";
//auth
import requireAuth from "../../hoc/requireAuth";

//import components
import { Container, Grid } from "@material-ui/core";
import DashboardSummery from "../../components/DashboardSummery/DashboardSummry";



//import styling
import "./style.css"
import { SystemNotifications } from '../SystemNotificationWidget/SystemNotifications';
import { HighestProgress } from '../../components/HighestProgressWidget/HighestProgress';
import { LiveDataWidget } from '../../components/LiveDataDashBoardWidget/LiveDataWidget';





class Dashboard2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            offset: 256,
            rooms:["Room Alpha", "Room beta", "clone Room", "flower one", "flower two", "veg room a"],
            roomIndex:0
        }

        this.setRoom = this.setRoom.bind(this);
    }

    setRoom(index){
        let cstate = this.state;
        cstate.roomIndex = index
        this.setState(cstate);
        
    }

    checkOffset() {

    }

    render() {
        return (
            <Container className={"containerMain"}>
                <Grid container direction={'column'} spacing={6}>
                    <Grid
                        container item direction="row"  
                        spacing={3} xs>
                        <DashboardSummery setRoom={this.setRoom} roomName={this.state.rooms[this.state.roomIndex]}/>
                    </Grid>
                    <Grid container item direction="row"  
                        spacing={3} xs >
                        <SystemNotifications/> 
                        <Grid item></Grid>
                        <HighestProgress roomName={this.state.rooms[this.state.roomIndex]}/>
                    </Grid>
                    <Grid container item direction="row"  
                        spacing={3} xs >
                        <LiveDataWidget roomName={this.state.rooms[this.state.roomIndex]}/>
                    </Grid>
                    {/* <Grid item direction="row" justify="center" alignItems="stretch" xs={12} spacing={3}> */}
                </Grid>
            </Container>
        );
    }

}





function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, { addGrowRoom: addGrowRoom, fetchGrowRooms: fetchUserGrowRoomsAndStatus }),
    reduxForm({ form: 'Add todo' })
)(Dashboard2);

export default requireAuth(formedComponent);
