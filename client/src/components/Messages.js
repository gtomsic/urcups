import React from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../store/features/users/usersSlice";
import MessageItem from "./MessageItem";

const Messages = () => {
   const messages = useSelector(selectUsers);
   return (
      <div className="flex flex-col sticky top-[85px] p-5 gap-3 bg-darker rounded-2xl shadow-lg">
         <h4>Messages</h4>
         <div className="bg-light w-full  py-1 px-4  rounded-full">
            <input
               type="search"
               name="search"
               id="search"
               placeholder="Search users..."
               className="py-1 bg-light text-dark w-full outline-none border-none"
            />
         </div>
         <div className="flex flex-col gap-2 h-[400px] overflow-hidden hover:overflow-y-scroll">
            {messages?.map((message) => (
               <MessageItem
                  key={message.id}
                  image={message.avatar}
                  isRead={message.isRead}
                  isOnline={message.isOnline}
               />
            ))}
         </div>
      </div>
   );
};

export default Messages;
