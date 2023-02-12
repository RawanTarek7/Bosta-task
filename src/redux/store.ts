import { createStore } from 'redux';

const initialState = {
    language: 'en',
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.language,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
