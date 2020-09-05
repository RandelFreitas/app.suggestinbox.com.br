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
    case ACTIONS.SHOW_MESSAGE:
      return {...state, message: action.message, showMessage: true}
    case ACTIONS.HIDE_MESSAGE:
      return {...state, message: '', showMessage: false}
    default:
      return state;
  }
}
//MOSTAR MENSAGEM CAPTURADA DAS REQUESTS
export const showMessage = (message) => {
  return{
    type: ACTIONS.SHOW_MESSAGE,
    message: message
  }
}
//FECHAR MENSAGENS
export const hideMessage = () => {
  return {
    type: ACTIONS.HIDE_MESSAGE
  }
}