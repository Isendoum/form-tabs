import React from "react";

const CustomErrorList = ({ errors }) => {
   return (
      <div className="custom-error-list">
         {errors.map((error, i) => (
            <div key={i} className="error-message">
               {error.message}
            </div>
         ))}
      </div>
   );
};

export default CustomErrorList;
