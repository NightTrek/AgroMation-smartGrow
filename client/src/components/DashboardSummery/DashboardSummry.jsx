import React from 'react'
import PropTypes from 'prop-types'

import {VictoryPie} from "victory";
import {Grid} from "@material-ui/core"


const sampledata= [ { x: 1, y: 2, label: "one" },
    { x: 2, y: 3, label: "two" },
    { x: 3, y: 5, label: "three" }
  ];

function DashboardSummry(props) {
    return (
        <div className={"dashboardSummery color-agro-grey"}>
            <Grid container direction="row" justify="center" alignItems="stretch" xs={12} spacing={3}></Grid>
            <Grid container direction="row" justify="center" alignItems="stretch" xs={12} spacing={3}>
                <Grid item direction="column"  xs={3} spacing={3}>
                    <VictoryPie
                        padAngle={({ datum }) => datum.y}
                        innerRadius={100}
                        data={sampledata}/>
                </Grid>
                <Grid item direction="column"  xs={3} spacing={3}>
                    <VictoryPie
                        padAngle={({ datum }) => datum.y}
                        innerRadius={100}
                        data={sampledata}/>
                </Grid>
                <Grid item direction="column"  xs={3} spacing={3}>
                    <VictoryPie
                        padAngle={({ datum }) => datum.y}
                        innerRadius={100}
                        data={sampledata}/>
                </Grid>
                <Grid item direction="column"  xs={3} spacing={3}>
                    <VictoryPie
                        padAngle={({ datum }) => datum.y}
                        innerRadius={100}
                        data={sampledata}/>
                </Grid>
                
            </Grid>
        </div>
    )
}

DashboardSummry.propTypes = {

}

export default DashboardSummry

