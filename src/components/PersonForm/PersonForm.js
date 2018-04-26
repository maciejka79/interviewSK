//PERSON FORM COMPONENT TO CREATE AND EDIT PERSON
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './PersonForm.css';
import { checkValidity } from '../../utility/utility';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/persons';

class PersonForm extends Component {

  state = {
    personForm: {
      firstName: {
        value: this.props.person ? this.props.person.firstName : '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 25
        },
        valid: this.props.person ? true : false,
        touched: false,
        showErorrText: false
      },
      lastName: {
        value:  this.props.person ? this.props.person.lastName : '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 25
        },
        valid: this.props.person ? true : false,
        touched: false,
        showErorrText: false
      },
      points: {
        value:  this.props.person ? this.props.person.points : '',
        validation: {
          required: true
        },
        valid: this.props.person ? true : false,
        touched: false,
        showErorrText: false
      },
      date: {
        value:  this.props.person ? new Date(this.props.person.date) : null,
        validation: {
          isDate: true
        },
        valid: this.props.person ? true : false,
        touched: false,
        showErorrText: false
      },
    },
    formIsValid: false
  }

  //UPDATE STATE AFTER PROP HAS CHANGED
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.person) {
      return {
        ...prevState,
        personForm: {
          ...prevState.personForm,
          firstName: {
            ...prevState.personForm.firstName,
            value: nextProps.person.firstName,
            valid: true
          },
          lastName: {
            ...prevState.personForm.lastName,
            value: nextProps.person.lastName,
            valid: true
          },
          points: {
            ...prevState.personForm.points,
            value: nextProps.person.points,
            valid: true
          },
          date: {
            ...prevState.personForm.date,
            value: new Date(nextProps.person.date),
            valid: true
          }
        }
      };
    } else {
      return prevState;
    }
  };


  onInputChangeHandler = (event, date) => {
    let updatedFormElement = {};
    let updatedPersonForm = {};
    if (event){
      updatedFormElement = {
        ...this.state.personForm[event.target.name],
        value: event.target.value,
        touched: true,
        valid: checkValidity(event.target.value, this.state.personForm[event.target.name].validation)
      };
      updatedPersonForm = {
        ...this.state.personForm,
        [event.target.name]: updatedFormElement
      };
    } else {
      updatedFormElement = {
        ...this.state.personForm.date,
        value: date,
        touched: true,
        valid: checkValidity(date, this.state.personForm.date.validation)
      };
      updatedPersonForm = {
        ...this.state.personForm,
        date: updatedFormElement
      };
    }
    let formIsValid = true;
    for(let inputIdentifier in updatedPersonForm){
      formIsValid = formIsValid && updatedPersonForm[inputIdentifier].valid;
    }
    this.setState({personForm: updatedPersonForm, formIsValid: formIsValid});
  }

  submitHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.personForm){
      formData[formElementIdentifier] = this.state.personForm[formElementIdentifier].value;
    }
    if (this.props.person){
      formData.id = this.props.person.id;
      this.props.onUpdatePerson(formData);
    } else {
      formData.id = new Date().getTime(); //create fake id
      this.props.onAddPerson(formData);
    }
    this.props.history.push('/');
  };

  render() {
    return(
      <div className={classes.PersonForm}>
        <form className={classes.Form} onSubmit={this.submitHandler}>
          <h1>Person Form</h1>
          <TextField
            type="text"
            hintText="Name"
            name="firstName"
            errorText={(!this.state.personForm.firstName.valid && this.state.personForm.firstName.touched) ? 'Min length 3, max length 25.' : ''}
            autoComplete="name"
            onChange={this.onInputChangeHandler}
            value={this.state.personForm.firstName.value}
          />
          <TextField
            type="text"
            hintText="Last Name"
            name="lastName"
            errorText={(!this.state.personForm.lastName.valid && this.state.personForm.lastName.touched) ? 'Min length 3, max length 25.' : ''}
            autoComplete="lastName"
            onChange={this.onInputChangeHandler}
            value={this.state.personForm.lastName.value}
          />
          <TextField
            type="number"
            hintText="Points"
            name="points"
            errorText={(!this.state.personForm.points.valid && this.state.personForm.points.touched) ? 'This field is required. ' : ''}
            onChange={this.onInputChangeHandler}
            value={this.state.personForm.points.value}
          />
          <DatePicker
            hintText="Date"
            value={this.state.personForm.date.value}
            name="date"
            errorText={(!this.state.personForm.date.valid && this.state.personForm.date.touched) ? 'This field is required. ' : ''}
            onChange={this.onInputChangeHandler}
          />
        </form>
        <Link
          to={{ pathname:'/' }}>
          <RaisedButton
            label="Cancel"/>
        </Link>
        <RaisedButton
          label={this.props.person ? 'Edit' : 'Save'}
          style={{float: 'right'}}
          onClick={this.submitHandler}
          disabled={this.state.formIsValid ? false : true}
          primary={true}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  if (props.match.params.id){
    return {
      person: state.persons.find(person => person.id === parseInt(props.match.params.id, 10))
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPerson: (person) => dispatch(actions.addPerson(person)),
    onUpdatePerson: (person) => dispatch(actions.updatePerson(person)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);