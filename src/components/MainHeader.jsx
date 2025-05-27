import { MdPostAdd, MdMessage } from "react-icons/md";
import classes from "./MainHeader.module.css";
import { Button } from "@carbon/react";
import { useContext, useState } from "react";
import "./MainHeader.css";
import Login from "../routes/Login";
import { AuthenticationContext } from "../context/AuthenticationContext";

function MainHeader({ setIsAdmin, setIsModalEnabled }) {
  const [isLoginEnabled, setIsLoginEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState("alunos");
  const context = useContext(AuthenticationContext);
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        Posts
      </h1>
      <div className="container">
        <div className="tab-buttons">
          {context.user.role == 1 && (
            <>
              <button
                className={
                  activeTab === "alunos" ? "tab-button active" : "tab-button"
                }
                onClick={() => {
                  setActiveTab("alunos");
                  setIsAdmin(false);
                }}
              >
                Alunos
              </button>
              <button
                className={
                  activeTab === "admin" ? "tab-button active" : "tab-button"
                }
                onClick={() => {
                  setActiveTab("admin");
                  setIsAdmin(true);
                }}
              >
                Admin
              </button>
            </>
          )}
        </div>
      </div>
      <p>
        <div className={classes.headerbuttons}>
          {context.user.role == 1 && (
            <Button
              className={classes.button}
              onClick={() => setIsModalEnabled(true)}
            >
              <MdPostAdd size={18} />
              Novo Post
            </Button>
          )}
          {!context.user?.user?.length > 0 ? (
            <Button
              className={classes.button}
              onClick={() => setIsLoginEnabled(true)}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                className={classes.button}
                onClick={() => context.clearUser()}
              >
                Log off
              </Button>
            </>
          )}
        </div>
        {isLoginEnabled && <Login isLoginEnabled={setIsLoginEnabled} />}
      </p>
    </header>
  );
}

export default MainHeader;
