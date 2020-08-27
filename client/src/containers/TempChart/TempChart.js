import React, {Component} from 'react';
import {VictoryChart, VictoryLine} from 'victory';
import {Grid} from "@material-ui/core";
import requireAuth from "../../hoc/requireAuth";
import axios from "axios";
import {connect} from "react-redux";
import moment from "moment";

//styles


class TempChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chillerID:props.chillerID,
            data:[
                { x:1300, y:75},
                { x:1330, y:75},
                { x:1400, y:74},
                { x:1430, y:75},
                { x:1500, y:74},
                { x:1530, y:75},
                { x:1600, y:73},
            ]
        };
        console.log(props.chillerID);
    }
//,
//                     chillerid:this.state.chillerID
    componentDidMount() {
        // axios.post("http://localhost:3001/api/c/recent", {},{
        //     headers: {
        //         authorization: localStorage.getItem("token"),
        //         chillerid:this.state.chillerID
        //     }
        // }).then( (response) => {
        //         let rev = response.data.slice(0,128).reverse();
        //         let dataArray = this.cleanData(rev);
        //         console.log(dataArray);
        //         let cstate = this.state;
        //         cstate.data= dataArray;
        //         this.setState(cstate);

        //     }).catch((e)=>{
        //         console.log(e);
        //     });

    }

    cleanData(arrayInput){
        let dataArray = [];
        for(let i in arrayInput){
            //if(i%2 === 0){
                let pointTime = moment.unix(arrayInput[i].timestamp);
                console.log(pointTime.format());
                let datapoint = {
                    x:arrayInput[i].timestamp,y:arrayInput[i].temp1
                };
                dataArray.push(datapoint);
           // }
        }
        return dataArray;
    }


    render() {
        return (
        <Grid item container>
                <VictoryChart>
                    <VictoryLine
                        data={this.state.data}
                        style={{//fill: "tomato"
                            data: { color:"white", opacity: 1 },
                            labels: { color:"white", fontSize: 12 },
                            parent: { border: "1px solid white" }
                        }}
                    />
                </VictoryChart>
        </Grid>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

// export default requireAuth(TempChart);
export default requireAuth(connect(mapStateToProps, {})(TempChart));
