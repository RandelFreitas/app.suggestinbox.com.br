const INITIAL_STATE = {
  message: '',
  showMessage: false
}

export const ACTIONS = {
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE'
}

export const messageReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
      case ACTIONS.SHOW_MENSSAGE:
          return {...state, messager: action.messager, showMessage: true}
      case ACTIONS.HIDE_MESSAGER:
          return {...state, message: '', showMessage: false}
      default:
          return state;
  }
}

export const showMessage = (message) => {
  return{
      type: ACTIONS.SHOW_MESSAGE,
      message: message
  }
}

export const hideMessage = () => {
  return {
      type: ACTIONS.HIDE_MESSAGE
  }
}