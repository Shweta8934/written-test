// import React from "react";

// const Header = ({ user, quizName, totalTime }) => {
//   return (
//     <header className="header">
//       <div className="header-right">
//         <div className="user-info">
//           <span>Name: {user.name}</span>
//           <span>Email: {user.email}</span>
//           <span>Subject: {user.subject}</span>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import "./Header.css"; // We'll create this CSS file

const Header = ({ user, quizName, totalTime }) => {
  return (
    <header className="header">
      <div className="header-right">
        <div className="user-info">
          <span>Name: {user.name}</span>
          <span>Email: {user.email}</span>
          <span>Subject: {user.subject}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
