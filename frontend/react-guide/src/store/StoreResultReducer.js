import {updateFormData} from './updateFormData';

const initialState = {
    results:[]
}


const reducer = (state = initialState, action) => {

    console.log(action);

    switch(action.type){
        case "STORE_RESULT" : return updateFormData( state, { results: state.results.concat( { id: new Date(), value: action.value} ) } );                          
    }

    return state;
}

export default reducer;