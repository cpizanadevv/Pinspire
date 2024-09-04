import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();

    setErrors({});
    return await dispatch(
      thunkLogin({
        email:'demo@aa.io',
        password:'password',
      }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
  };

  const handleClick = () => {
    closeModal()
    setModalContent(<SignupFormModal/>);
  }

  return (
    <div className="login-modal">
      <img className="logo-png" src='../../../pinspire_logo.png' alt="Logo" />

      <h1>Welcome to Pinspire</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          <h5>Email</h5>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p className="errors">{errors.email}</p>}
        </label>
        <label>
           <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="errors">{errors.password}</p>}
        </label>

        <div className="login-buttons">
          <button type="submit">Log In</button>
          <button onClick={handleDemo}>Continue as Demo User</button>
        </div>
        <span></span>
        <div className="to-signup">
          <a onClick={handleClick}>Not a user yet? Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
