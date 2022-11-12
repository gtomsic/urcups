export const check = (user, profile) => {
   if (user?.id !== profile?.id || !user?.id) {
      return false;
   } else {
      return true;
   }
};

export const isRightUser = (user, profile, navigate) => {
   if (user?.id !== profile?.id) {
      return navigate(`/profile/${profile?.username}`);
   }
   if (!user?.id) {
      return navigate('/');
   }
};
