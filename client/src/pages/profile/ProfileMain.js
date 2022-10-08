import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import MessageForm from "../../components/MessageForm";
import MoreInformation from "./MoreInformation";
import { selectProfile } from "../../store/features/profile/profileSlice";
import { selectUser } from "../../store/features/user/userSlice";

const Profile = () => {
   const { profile } = useSelector(selectProfile);
   const { user } = useSelector(selectUser);
   if (!profile?.id) return;
   return (
      <>
         {!user?.id || user?.id === profile?.id ? null : (
            <MessageForm user={profile} />
         )}

         <Card>
            <MoreInformation user={profile} />
         </Card>
         <Card>
            {/* Hobbies */}
            <h3>HOBBIES</h3>
            <div className="grid gap-5 grid-cols-2">
               {profile.hobbies?.split(",")?.map((hoby, index) => {
                  if (!hoby) return;
                  return (
                     <div
                        key={index}
                        className="py-5 text-center 
               text-white rounded-sm shadow-sm shadow-primary"
                     >
                        {hoby}
                     </div>
                  );
               })}
            </div>
         </Card>

         {/* Looking for */}
         <Card>
            <h3 className="text-white mb-5">IDEAL PARTNER</h3>
            <div
               dangerouslySetInnerHTML={{ __html: profile?.idealPartner }}
            ></div>
         </Card>
         {/* About Me */}
         <Card>
            <h3 className="text-white mb-5 ">ABOUT ME</h3>
            <div dangerouslySetInnerHTML={{ __html: profile?.about }}></div>
         </Card>
      </>
   );
};

export default Profile;