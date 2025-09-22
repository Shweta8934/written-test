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
import { useSelector } from "react-redux";
import "./Header.css"; // optional for styling

const Header = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Left: Logo */}
      <div className="header-left">
        <img
          src="/averybit-new-full.png"
          alt="Logo"
          style={{ height: "50px" }}
        />
      </div>

      {/* Right: User Info */}
      <div className="header-right" style={{ textAlign: "right" }}>
        {user ? (
          <>
            <p style={{ margin: 0 }}>
              <strong>{user.name}</strong>
            </p>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
              {user.email}
            </p>
          </>
        ) : (
          <p>No user info</p>
        )}
      </div>
    </div>
  );
};

export default Header;
