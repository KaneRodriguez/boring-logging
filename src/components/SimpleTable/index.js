import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button'
import { totalmem } from 'os';

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

  // state = {
  //   data: [
  //     // createData('Silt Clay', 0.0, 6.0, 24, 4.0),
  //     // createData('Sand', 6.0, 9.0, 37, 0),
  //   ]
  // }

  render() {
    const { classes } = this.props;
      let CreateNewTableRow = () => {
          // let n = createData('Clay', 9, 16.0, 15, 3.5)
          // this.state.data.push(n)
      }

      let stratas = [];
      if(this.props.data.stratas) {
        Object.keys(this.props.data.stratas).map((key)=> {
          stratas.push(this.props.data.stratas[key])
        })
      }

      let samples = [];
      if(this.props.data.samples) {
        Object.keys(this.props.data.samples).map((key)=> {
          samples.push(this.props.data.samples[key])
        })
      }

      stratas.forEach((strata)=> {
        strata.samples = []

        samples.forEach((sample)=> {
          if(sample.top >= strata.top 
            && sample.bottom <= strata.bottom) {
            // condition met. sample within strata
            strata.samples.push(sample)
          }
        })
      })


    return (
      <Paper className={classes.root}>
          <Button onClick= {CreateNewTableRow}> Add Row </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Layer Name</TableCell>
              <TableCell numeric>Top Elevation</TableCell>
              <TableCell numeric>Buttom Elevation</TableCell>
              <TableCell numeric>N</TableCell>
              <TableCell numeric>Su</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stratas.map(strata => {
              let samples = strata.samples ? strata.samples : []

              let total = 0.0;

              samples.forEach((sample) => {
                total += (parseFloat(sample.sptTwo) + parseFloat(sample.sptThree))
              })

              let avgN = total / samples.length

              return (
                <TableRow key={strata.title}>
                  <TableCell>{strata.title}</TableCell>
                  <TableCell numeric>{strata.top}</TableCell>
                  <TableCell numeric>{strata.bottom}</TableCell>
                  <TableCell numeric>{avgN}</TableCell>
                </TableRow>
              );//<TableCell numeric>{n.Su}</TableCell>
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