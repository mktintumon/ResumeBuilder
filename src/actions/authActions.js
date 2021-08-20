import * as actionTypes from './actionTypes';
export const signInRequest=()=>{
    return {
        type: actionTypes.SIGN_IN_REQUEST
    }
}
export const signInSuccess=(users)=>{
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        payload:users
    }
}
export const signInFailed=(error)=>{
    return {
        type: actionTypes.SIGN_IN_FAILED,
        payload:error
    }
}
export const signIn=(userData)=>{
    return async(dispatch, getState, {getFirebase,getFirestore}) => {
        dispatch({type: actionTypes.SIGN_IN_REQUEST})
        const firebase = getFirebase();
        const firestore = getFirestore();
        try{
            console.log(userData);
        let data = await firebase.auth().signInWithEmailAndPassword(userData.email,userData.password)
        console.log(data.user.uid);
     
            dispatch({type: actionTypes.SIGN_IN_SUCCESS})
    }
        catch(err) {
            console.log("Error is ", err)
            dispatch({type: actionTypes.SIGN_IN_FAILED,error:err})
        };
    }
}

export const register=(userData)=>{
    return (dispatch, getState, {getFirebase,getFirestore}) => {
        const firebase = getFirebase();    
        const firestore = getFirestore();    
        firebase.auth().createUserWithEmailAndPassword(
            userData.email,
            userData.password
        ).then(async(data) => {
            console.log(data);
            const res = await firestore.collection('users').doc(data.user.uid).set({
                email:userData.email,
                resumeIds:[]
              });
            dispatch({type: actionTypes.REGISTER})
        }).catch((err) => {
            dispatch({type: actionTypes.REGISTER_FAILED,error:err})
        });
    }
} 
export const setUser=(data)=>{
    return(dispatch)=>{
    dispatch({type:actionTypes.SET_USER, payload:data})
    }
}
export function signout(){
    return (dispatch, getState, {getFirebase}) => {
        console.log('signing out')
        const firebase = getFirebase();
        firebase.auth().signOut(
        ).then(() => {
            dispatch({type: actionTypes.SIGN_OUT})
        }).catch((err) => {
            dispatch({type: actionTypes.SIGN_OUT_FAILED,error:err})
        });
    }
}