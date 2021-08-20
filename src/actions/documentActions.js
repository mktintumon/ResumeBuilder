import * as actionTypes from './actionTypes';
const { v4: uuidv4 } = require('uuid');
 

export const setSkinCd = (skinCd) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        let id = uuidv4();
           dispatch({ type: actionTypes.SET_SKIN, document: { skinCd: skinCd, id: id} }) 
    }
}

export const updateSkinCd = (documentId, skinCd) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
       
           dispatch({ type: actionTypes.UPDATE_SKIN, document: { skinCd: skinCd} })
      
    }
}


// export function updateSkinCd(skinCd){
//     return {type: actionTypes.UPDATE_SKIN, skinCd : skinCd}
// }