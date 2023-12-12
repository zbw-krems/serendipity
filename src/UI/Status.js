import React, { useContext } from "react";
import { StatusContext } from "../Context/StatusContext";

const Status = () => {
  const statusContext = useContext(StatusContext);
  return (
    <div className="z-50 absolute bottom-5 right-5 text-gray-600">
      {statusContext.StatusState}
    </div>
  );
};

export default Status;
