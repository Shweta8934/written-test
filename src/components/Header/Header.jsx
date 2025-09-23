// import React from "react";
// import { useSelector } from "react-redux";
// import "./Header.css"; // optional for styling

// const Header = () => {
//   const user = useSelector((state) => state.user.user);

//   return (
//     <div
//       className="header"
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 20px",
//         background: "#f5f5f5",
//         borderBottom: "1px solid #ddd",
//       }}
//     >
//       {/* Left: Logo */}
//       <div className="header-left">
//         <img
//           src="/averybit-new-full.png"
//           alt="Logo"
//           style={{ height: "50px" }}
//         />
//       </div>

//       {/* Right: User Info */}
//       <div className="header-right" style={{ textAlign: "right" }}>
//         {user ? (
//           <>
//             <p style={{ margin: 0 }}>
//               <strong>{user.name}</strong>
//             </p>
//             <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
//               {user.email}
//             </p>
//           </>
//         ) : (
//           <p>No user info</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slice/userSlice";
import "./Header.css";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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

      {/* Right: User Info + Logout in one row */}
      {user && (
        <div
          className="header-right"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px", // space between info and button
          }}
        >
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: "bold" }}>{user.name}</p>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
              {user.email}
            </p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
