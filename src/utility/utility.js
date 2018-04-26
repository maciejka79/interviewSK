//LOADING FROM LOCAL STORAGE FUNCTION
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

//SAVING TO LOCAL STORAGE FUNCTION
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    //Ignore for now
  }
};

// VALIDATION FUNCTION
export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required){
    isValid = value.trim() !== '' && value.trim() !== null && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isDate) {
    isValid = Object.prototype.toString.call(value) === '[object Date]' && isValid;
  }
  return isValid;
};

