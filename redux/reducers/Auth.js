import {LOGIN} from "../actions/types";

const initial = {
  loggedIn: false,
  user:null
}



export default (state = initial, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state,loggedIn: true,user: action.payload}
    default:
      return state
  }
}