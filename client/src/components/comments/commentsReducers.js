import { commentAction } from './commentsContant'

export const commentReducers = (state, action) => {
   switch (action.type) {
      case commentAction.SET_BODY:
         return { ...state, body: action.payload }
      case commentAction.SET_OFFSET:
         return { ...state, offset: action.payload }
      default:
         throw new Error()
   }
}
