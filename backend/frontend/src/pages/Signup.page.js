import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import Image from "../assets/HeelCake.png";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // As explained in the Login page.
  const { emailPasswordSignup } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // As explained in the Login page.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // As explained in the Login page.
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  // As explained in the Login page.
  const onSubmit = async () => {
    try {
      const user = await emailPasswordSignup(form.email, form.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-7">
      <div className="bg-white w-2/4 h-[535px] rounded-md flex flex-row justify-around mr-auto ml-auto pl-12">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "300px",
            margin: "auto",
            height: "50%",
          }}
        >
          <h1 className="text-2xl font-semibold py-3">Signup</h1>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={form.email}
            onInput={onFormInputChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={form.password}
            onInput={onFormInputChange}
            style={{ marginBottom: "1rem" }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "darkred" }}
            onClick={onSubmit}
          >
            Signup
          </Button>
          <p>
            Have an account already? <Link to="/login">Login</Link>
          </p>
        </form>
        <div>
          <img src={Image} alt="icon" style={{height:'500px'}}/>
        </div>
      </div>
    </div>
  );
};

export default Signup;
