const INITIAL_STATE = { text: 'Este texto'};

export function admReducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case 'ADD_PROMO':
      return {...state, data: [...state.data, action.title]};
    default:
      return state;
  }
}
