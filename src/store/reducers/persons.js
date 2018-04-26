import * as actionTypes from '../actions/actionTypes';

const initialState = {
  persons: [],
  filterDate: null
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case actionTypes.ADD_PERSON:
      return {
        ...state,
        persons: state.persons.concat(action.person)
      };
    case actionTypes.REMOVE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== action.id)
      };
    case actionTypes.UPDATE_PERSON:
      const updatedPersons = state.persons.map(person => {
        if(person.id === action.person.id){
          return action.person;
        } else {
          return person;
        }
      });
      return {
        ...state,
        persons: updatedPersons
      };
    case actionTypes.SET_FILTER_DATE:
      return {
        ...state,
        filterDate: action.date
      };
    default:
      return state;
  }
};

export default reducer;