import { ACTION } from './commentsContant'

export const commentReducers = (state, action) => {
   switch (action.type) {
      case ACTION.SET_BODY:
         return { ...state, body: action.payload }
      default:
         throw new Error()
   }
}
