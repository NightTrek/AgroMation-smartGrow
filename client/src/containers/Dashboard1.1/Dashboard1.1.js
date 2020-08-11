import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import axios from "axios";
//dependencies


//redux actions
import {addGrowRoom, fetchUserGrowRoomsAndStatus} from "../../actions";
//auth
import requireAuth from "../../hoc/requireAuth";

//styles
import {
    makeStyles,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    withStyles
} from "@material-ui/core";

//components/containers
import AddGrowRoom from "../../components/Dashboard/AddChiller";
import TempChart from "../TempChart/TempChart";

const classes = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        margin: "auto",
        overflowX: "auto",
        borderRadius: 10,
        boxShadow: "8px 8px 20px #4c586f",
        maxWidth: 680,
        opacity: 0.85,
        "&:hover": {
            opacity: 1,
            transition: "all .5s ease-in-out"
        }
    },
    table: {
        padding: "0 2%",
        minWidth: 460
    },
    tab: {
        "&:hover": {
            color: "#29b6f6"
        }
    },
    status: {
        backgroundColor: colorBackground()
    }
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#4c586f",
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    }
}))(TableRow);

function colorBackground(status) {
    if (status === "good") {
        return "green";
    }
    if (status === "info" || status === "low") {
        return "yellow";
    }
    if (status === "error") {
        return "red";
    }
};

const RenderGrowRoomRow = function(props){
    let that = props.this;
    let row = props.row;
    let index = props.index;
    let handleClick = () => {
        console.log(props.index);
        let cstate = that.state;
        cstate.showGraph = props.index;
        that.setState(cstate);
    };

    return (
        <StyledTableRow onClick={handleClick} key={row.id}>
            <StyledTableCell index={props.index} component="th" scope="row">
                <Tabs key={row.id} value={0} indicatorColor="primary" textColor="primary">
                    <Tab key={row.id} className={classes.tab} label={row.chillerName}/>
                </Tabs>
            </StyledTableCell>
            <StyledTableCell
                align="center">{that.state.chillers.ChillerDataByID[index].temp1}</StyledTableCell>
            <StyledTableCell className={classes.status} align="center">
                {row.statusMsg}
            </StyledTableCell>
        </StyledTableRow>
    );
};

const RenderGraphAndGrowRoom = function(props){
    let that = props.this;
    let row = props.row;
    let array = [
        <StyledTableRow key={row.chillerName + " Graph"}>
            <TempChart chillerID={row.id} this={that} row={props.row} index={props.index}/>
        </StyledTableRow>,
        <RenderGrowRoomRow key={row.chillerName} this={that} row={props.row} index={props.index} />
        ];
    return (
        array.map((row) => row)
    )

}

const RenderGrowRooms = function (props){
    let that = props.this;

    return (
        <TableBody>
            {that.state.chillers.UserChillers.map((row, index) => {
                if(that.state.showGraph === index){
                return(
                        <RenderGraphAndGrowRoom key={row.chillerName + " Graph"} this={that} row={row} index={index}/>
                    );
            }
               return (<RenderGrowRoomRow key={row.chillerName} this={that} row={row} index={index} />);
            })}
        </TableBody>
    );
};




class Dashboard1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            growRooms:{
                "UserGrowRoom": [{"growRoomName": "loading rooms", "location": "1234 los angeles ca, 94209", "statusMsg": "mean temp -40.810618500000004 exceeded +- 5 "}],
                "GrowRoomDataByID": [{"temp1": -100}]
            },
            recent:{},
            showGraph:-1, //-1 will never show the graph whatever number this is the matching array index is where the chart will be.
            loading:true
        };

        this.handleChillerClick = this.handleGrowRoomClick.bind();
    }

    componentDidMount() {
        this.props.fetchGrowRooms();
        axios.post("http://localhost:3001/api/r/getgrowrooms", {}, {
            headers: {authorization: localStorage.getItem("token")}
        }).then(
            (response)=>{
                let cstate = this.state;
                cstate.loading= false;
                cstate.growRooms = response.data;
                this.setState(cstate);
        }).catch((e)=>{
            console.log(e);
        });

    }


    handleGrowRoomClick(state) {
        console.log(this.props);
    }


    render() {
        return (
            <div className="page">
                <Paper>
                    <Table>
                        <caption>
                            Click on a Grow room to open its corresponding controller
                        </caption>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <AddGrowRoom/>
                                </StyledTableCell>
                                <StyledTableCell align="center">TEMPERATURE</StyledTableCell>
                                <StyledTableCell align="center">STATUS</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.loading ?
                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell>
                                        Loading...
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>:
                            <RenderGrowRooms click={this.handleGrowRoomClick} this={this}/>}

                    </Table>
                </Paper>
            </div>);
    }
}


function mapStateToProps({state}) {
    return {state};
}

const formedComponent = compose(
    connect(mapStateToProps, {addGrowRoom: addGrowRoom, fetchGrowRooms: fetchUserGrowRoomsAndStatus}),
    reduxForm({form: 'Add todo'})
)(Dashboard1);

export default requireAuth(formedComponent);
