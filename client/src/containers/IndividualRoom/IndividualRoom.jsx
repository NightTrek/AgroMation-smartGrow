import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core'
import RoomSummery from '../RoomSummery/RoomSummery'

export default class IndividualRoom extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }

    render() {
        return (
            <Container className={"containerMain"}>
                <Grid container item direction={"column"}>
                    <Grid item container direction={'row'}>
                        <RoomSummery/>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
