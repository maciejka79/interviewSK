// LEADERBOARD TABLE FUNCTION
import React from 'react';
import { Link } from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const leaderboardTable = props => {
  let lbTable = <h4>No data to display</h4>;
  let lbTableBody = null;

  if(props.persons.length > 0) {
    lbTableBody = props.persons
      .sort( (d1, d2) => d2.points - d1.points)
      .map(person => {
        return (
          <TableRow key={person.id}>
            <TableRowColumn>{new Date(person.date).toLocaleDateString()}</TableRowColumn>
            <TableRowColumn>{person.firstName}</TableRowColumn>
            <TableRowColumn>{person.lastName}</TableRowColumn>
            <TableRowColumn>{person.points}</TableRowColumn>
            <TableRowColumn style={{width: '50px'}}>{
              <Link
                to={{ pathname:`/person/${person.id}` }}>
                <RaisedButton
                  label="Edit"
                  style={{width: 'auto', minWidth: 'auto'}}
                  primary={true}/>
              </Link>
            }
            </TableRowColumn>
            <TableRowColumn style={{width: '50px'}}>{
              <RaisedButton
                label="X"
                style={{width: 'auto', minWidth: 'auto'}}
                onClick={(e) => props.onClick(e, person.id) }
                secondary={true}/>
            }
            </TableRowColumn>
          </TableRow>
        );
      });
    lbTable = (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
            <TableHeaderColumn>Points</TableHeaderColumn>
            <TableHeaderColumn style={{width: '50px'}}>Edit</TableHeaderColumn>
            <TableHeaderColumn style={{width: '50px'}}>Delete</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {lbTableBody}
        </TableBody>
      </Table>
    );
  };
  return (
    <React.Fragment>
      {lbTable}
    </ React.Fragment>
  );
};

export default leaderboardTable;