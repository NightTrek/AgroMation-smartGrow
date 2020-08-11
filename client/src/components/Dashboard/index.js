import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab
} from "@material-ui/core";
import requireAuth from "../../hoc/requireAuth";

import AddChiller from "./AddChiller";

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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    margin: "auto",
    overflowX: "auto",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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

// Mock data for now
function createData(name, temp, status) {
  return { name, temp, status };
}

const rows = [
  createData("Iceberg", -46 + " c", "good"),
  createData("Alaska", -82 + " c", "info"),
  createData("Siberian", -92 + " c", "low"),
  createData("Winter", -10 + " c", "error")
];

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
}

export default requireAuth(function  Dashboard() {
  const classes = useStyles();
  return (
    <div className="page">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <caption>
            Click on a chiller to open its corresponding controller
          </caption>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <AddChiller />
              </StyledTableCell>
              <StyledTableCell align="center">TEMPERATURE</StyledTableCell>
              <StyledTableCell align="center">STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <Tabs value={0} indicatorColor="primary" textColor="primary">
                    <Tab className={classes.tab} label={row.name} />
                  </Tabs>
                </StyledTableCell>
                <StyledTableCell align="center">{row.temp}</StyledTableCell>
                <StyledTableCell className={classes.status} align="center">
                  {row.status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
})
