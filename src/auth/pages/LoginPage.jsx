import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { useContext } from "react";

export const LoginPage = () => {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate();

  const onLogin = () => {

    const lastPath = localStorage.getItem('lastPath') || '/';
    console.log(lastPath);


    login('Lucas Carli');

    navigate(lastPath, {
      replace: true // Para que se reemplace el historial
    });
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <button
        className="btn btn-primary"
        onClick={onLogin}>
        Login
      </button>
    </div>
  )
}
