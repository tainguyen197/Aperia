import "firebase/analytics";
import "firebase/auth";
import * as firebase from "firebase/app";
import "firebase/firestore";

let db = firebase.firestore();

let initialState = [];
export default function User(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_INFO":
      return [
        ...state,
        {
          ...action.payload
        }
      ];
      case "ADD_USER_INFO":
        //update to database

        const data = action.payload;
        db.collection('users').doc(data.employeeCode).set({
          employeeCode: data.employeeCode,
          employeeName: data.employeeName,
          startDate: firebase.firestore.Timestamp.fromDate(new Date(data.startDate)),
          DOB: firebase.firestore.Timestamp.fromDate(new Date(data.DOB)),
          phone: data.phone,
          email: data.email,
        })
        return [
          ...state,
          {
              ...action.payload
          }];
      
    case "EDIT_USER_INFO":
        const dataUpdate = action.payload;
        db.collection('users').doc(dataUpdate.employeeCode).update({
          employeeCode: dataUpdate.employeeCode,
          employeeName: dataUpdate.employeeName,
          startDate: firebase.firestore.Timestamp.fromDate(new Date(dataUpdate.startDate)),
          DOB: firebase.firestore.Timestamp.fromDate(new Date(dataUpdate.DOB)),
          phone: dataUpdate.phone,
          email: dataUpdate.email,
        }).then(()=>{console.log("document update success")})
        .catch(err=>{console.log(err)})
       
        return state.map(user=>{
          if(user.employeeCode !== action.payload.employeeCode)
          return user;
          else{
            return{
              employeeCode: dataUpdate.employeeCode,
              employeeName: dataUpdate.employeeName,
              startDate: dataUpdate.startDate,
              DOB: dataUpdate.DOB,
              phone: dataUpdate.phone,
              email: dataUpdate.email,
            }
          }
        })
      case "DELETE_USER_INFO":
          db.collection('users').doc(action.payload.employeeCode).delete();

        return state.filter(user => user.employeeCode !== action.payload.employeeCode)
    default:
      return state;
  }
}
