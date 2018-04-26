import * as actionTypes from './actionTypes';

export const addPerson = (person) => {
  return {
    type: actionTypes.ADD_PERSON,
    person
  };
};

export const updatePerson = (person) => {
  return {
    type: actionTypes.UPDATE_PERSON,
    person
  };
};

export const removePerson = (id) => {
  return {
    type: actionTypes.REMOVE_PERSON,
    id
  };
};

export const setFilterDate = (date) => {
  return {
    type: actionTypes.SET_FILTER_DATE,
    date
  };
};