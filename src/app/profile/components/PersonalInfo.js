import React from "react";
import { Inbox, Mail } from "lucide-react";
import {User} from "lucide-react"

const PersonalInfo = ({username, email}) => {
  return (
    <div className="max-w-[600px] m-auto bg-slate-800 rounded-2xl shadow py-4 px-6 mt-4">
      <div className="flex items-center">
        <User className="bg-blue-500 rounded-full p-2 size-12"/>
        <div className="pl-4">
          <p className="text-sm text-gray-400">Full Name</p>
          <h2>{username}</h2>
        </div>
      </div>
      <div className="flex items-center mt-6">
        <Mail className="bg-blue-500 rounded-full p-2 size-12"/>
        <div className="pl-4">
          <p className="text-sm text-gray-400">Email</p>
          <h2>{email}</h2>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
