import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(Name, Top, Bottom, SPT, Su) {
  id += 1;
  return { id, Name, Top, Bottom, SPT, Su };
}


class SimpleTable extends React.Component {

  state = {
    data: [
      createData('Silt Clay', 0.0, 6.0, 24, 4.0),
      createData('Sand', 6.0, 9.0, 37, 0),
    ]
  }

  render() {
    const { classes } = this.props;
      let CreateNewTableRow = () => {
          let n = createData('Clay', 9, 16.0, 15, 3.5)

          console.log("before data", this.state.data, "n", n)
          this.state.data.push(n)
          this.setState({data: this.state.data})

          console.log("2 data", this.state.data)
      }
    return (
      <Paper className={classes.root}>
          <Button onClick= {CreateNewTableRow}> Add Row </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Layer Name</TableCell>
              <TableCell numeric>Top Elevation</TableCell>
              <TableCell numeric>Buttom Elevation</TableCell>
              <TableCell numeric>SPT</TableCell>
              <TableCell numeric>Su</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell>{n.Name}</TableCell>
                  <TableCell numeric>{n.Top}</TableCell>
                  <TableCell numeric>{n.Bottom}</TableCell>
                  <TableCell numeric>{n.SPT}</TableCell>
                  <TableCell numeric>{n.Su}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);