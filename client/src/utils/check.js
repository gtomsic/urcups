export const check = (user, profile) => {
   if (user?.id !== profile?.id || !user?.id) {
      return false
   } else {
      return true
   }
}
