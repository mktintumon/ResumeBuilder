import * as actionTypes from './actionTypes';

export const add=(documentId, educationSection)=>{
    return (dispatch,getState,{getFirebase, getFirestore})=>{
        
       
         dispatch({type: actionTypes.ADD_EDUCATION, educationSection:educationSection})
    }
}
export const update=(documentId, educationSection)=>{
    return  (dispatch,getState,{getFirebase, getFirestore})=>{
       
         dispatch({type: actionTypes.UPDATE_EDUCATION, educationSection:educationSection})
    }
}