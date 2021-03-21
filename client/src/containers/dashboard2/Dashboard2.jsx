import React from 'react';
//import axios from "axios";
//redux actions
// import { getRooms, setRoom } from "../../actions/roomActions";


//import components
import { Container, Grid } from "@material-ui/core";
import DashboardSummery from "../../components/DashboardSummery/DashboardSummry";
import SystemNotifications from '../SystemNotificationWidget/SystemNotifications';
import Progress from '../../components/ProgressWidget/Progress';
import LiveDataWidget from '../../components/LiveDataDashBoardWidget/LiveDataWidget';


//import styling
import "./style.css"






const Dashboard2 = (props) => {
    const [state, setState] = React.useState({
        rooms: ["Room Alpha", "Room beta", "clone Room", "flower one", "flower two", "veg room a"],
        roomIndex: 0
    });




    const setRoom = (index) => {
        const cstate = state;
        cstate.roomIndex = index
        setState(cstate);

    }

    return (
        <Container className={"containerMain"}>
            <Grid container direction={'row'} spacing={4}>
                <Grid
                    container item direction="row"
                    xs={12}>
                    <DashboardSummery setRoom={setRoom} />
                </Grid>
                <Grid item container direction="row" xs={12} sm={8}>
                    <SystemNotifications />
                </Grid>
                <Grid container item direction="row"
                    xs={12} sm={4} >

                    <Progress roomName={state.rooms[state.roomIndex]} />
                </Grid>
                <Grid container item direction="row"
                    xs={12} >
                    <LiveDataWidget roomName={state.rooms[state.roomIndex]} />
                </Grid>
                {/* <Grid item direction="row" justify="center" alignItems="stretch" xs={12} spacing={3}> */}
            </Grid>
        </Container>
    );

}





// function mapStateToProps({ state }) {
//     return { state };
// }

// const formedComponent = compose(
//     connect(mapStateToProps, { getRooms: getRooms, setRoom: setRoom })
// )(Dashboard2);

export default Dashboard2;
