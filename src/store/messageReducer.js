const INITIAL_STATE = {
  message: '',
  showMessage: false,
  progress: true
}
export const ACTIONS = {
  SHOW_MESSAGE: 'SHOW_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
  HIDE_PROGRESS: 'HIDE_PROGRESS',
  SHOW_PROGRESS: 'SHOW_PROGRESS'
}
export const messageReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.SHOW_MESSAGE:
      return {...state, message: action.message, showMessage: true}
    case ACTIONS.HIDE_MESSAGE:
      return {...state, message: '', showMessage: false, progress: true}
    case ACTIONS.SHOW_PROGRESS:
      return {...state, progress: false}
    case ACTIONS.HIDE_PROGRESS:
      return {...state, progress: true}
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
//PROGRESS DA REQUISIÇÃO
export const showProgress = () => {
  return {
    type: ACTIONS.SHOW_PROGRESS
  }
}
//FECHAR PROGRESSO
export const hideProgress = () => {
  return {
    type: ACTIONS.HIDE_MESSAGE
  }
}