// LEADERBOARD MAIN COMPONENT
import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/persons';
import { Link, Route } from 'react-router-dom';

import classes from './Leaderboard.css';
import LeaderboardTable from '../../components/LeaderboardTable/LeaderboardTable';
import PersonForm from '../../components/PersonForm/PersonForm';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';

class Leaderboard extends Component {
  render() {
    return(
      <div className={classes.Leaderboard}>
        <h1>Leaderboard</h1>
        <section>
          <Route path={'/person/:id'} exact component={PersonForm}/>
        </section>
        <section>
          <Link
            to={{ pathname:'/newperson' }}>
            <RaisedButton
              primary={true}
              label="Add Person"/>
          </Link>
          <div className={classes.Filter}>
            <DatePicker
              hintText="Select date to filter"
              value={this.props.filterDate}
              style={{display: 'inline-block'}}
              onChange={(e, date) => this.props.setFilterDate(date)}
            />
            <FlatButton label="Clear Date"
              onClick={() => this.props.setFilterDate(null)} />
          </div>
          <LeaderboardTable
            persons={
              this.props.filterDate ? this.props.persons
                .filter(person => new Date(person.date).getTime() === this.props.filterDate.getTime()) : this.props.persons
            }
            date={this.props.filterDate}
            onClick={(event, id) => this.props.onRemovePerson(id)} />
        </section>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    persons: state.persons,
    filterDate: state.filterDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRemovePerson: (id) => dispatch(actions.removePerson(id)),
    setFilterDate: (date) => dispatch(actions.setFilterDate(date))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);