import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };



  return (
    <div className="signup-modal">
    <img className="logo-png" src='../../../pinspire_logo.png' alt="Logo" />

    <h1>Welcome to Pinspire</h1>
    <p>Discover fresh inspirations to explore</p>
      {errors.server && <p className="errors">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label>
          <h5>First Name</h5>
          
          <input
            type="text"
            name="first_name"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>{errors.first_name && <p className="errors">{errors.first_name}</p>}

        <label>
          <h5>Last Name</h5>
          
          <input
            type="text" 
            name="last_name"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.last_name && <p className="errors">{errors.last_name}</p>}
        <label>
          <h5>Email</h5>
          
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          <h5>Username</h5>
          
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label>
          <h5>Password</h5>
          
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          <h5>Confirm Password</h5>
          
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
