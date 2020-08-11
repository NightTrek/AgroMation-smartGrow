import React, {Component} from 'react';
import {VictoryChart, VictoryLine} from 'victory';

import requireAuth from "../../hoc/requireAuth";
import axios from "axios";
import {connect} from "react-redux";
import moment from "moment";

//styles
import {
    TableCell
} from "@material-ui/core";


class TempChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            chillerID:props.chillerID,
            data:[
                { x:1300, y:-40},
                { x:1330, y:-40},
                { x:1400, y:-40},
                { x:1430, y:-40},
                { x:1500, y:-40},
                { x:1530, y:-40},
                { x:1600, y:-40},
            ]
        };
        console.log(props.chillerID);
    }
//,
//                     chillerid:this.state.chillerID
    componentDidMount() {
        axios.post("http://localhost:3001/api/c/recent", {},{
            headers: {
                authorization: localStorage.getItem("token"),
                chillerid:this.state.chillerID
            }
        }).then( (response) => {
                let rev = response.data.slice(0,128).reverse();
                let dataArray = this.cleanData(rev);
                console.log(dataArray);
                let cstate = this.state;
                cstate.data= dataArray;
                this.setState(cstate);

            }).catch((e)=>{
                console.log(e);
            });

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
        return (<TableCell>
                <VictoryChart>
                    <VictoryLine
                        data={this.state.data}
                        style={{
                            data: { fill: "tomato", opacity: 0.7 },
                            labels: { fontSize: 12 },
                            parent: { border: "1px solid #ccc" }
                        }}
                    />
                </VictoryChart>
        </TableCell>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

// export default requireAuth(TempChart);
export default requireAuth(connect(mapStateToProps, {})(TempChart));
