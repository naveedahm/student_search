
import { createStore } from "redux";

import {storeStudentClasses, storeStudentName, storeLoadingStatus} from './actions'

import {connect} from "react-redux";

export function mapStateToProps(state) {
    var object = { classes:state.classes, loading:state.loading, name:state.name };
    return object;
  }

export const mapDispatchToProps = {storeStudentClasses, storeStudentName, storeLoadingStatus}

// `connect` returns a new function that accepts the component to wrap:
export const connectToStore = connect(mapStateToProps, mapDispatchToProps)

const initialState = { classes: [], name:"", loading:false }

var studentReducer =  function(state = initialState, action) {
    switch (action.type) {
      case "store/studentClasses": {
        const classes = action.payload;
        return {
          ...state,
          classes:classes
          };
        }
      case "store/studentName": {
        const name = action.payload;
        return {
          ...state,
          name:name
          }
        }
      case "store/loadingStatus": {
        const loading = action.payload;
        return {
          ...state,
          loading:loading
          }
        };
      default:
        return state;
    }
  }

export default createStore(studentReducer);

