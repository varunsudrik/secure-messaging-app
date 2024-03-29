import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Auth = ({ type }) => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [postInputs, setPostInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setDisabled(!areAllFieldsFilled());
  }, [postInputs]);

  const areAllFieldsFilled = () => {
    if (type === "signup") {
      return postInputs.username && validEmail && postInputs.password;
    } else return validEmail && postInputs.password;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendRequest = () => {
    const fetchData = async () => {
      if (!validEmail) {
        alert("Invalid email address");
        return;
      }
      // http://localhost:8000/api/user/login
      if (areAllFieldsFilled()) {
        try {
          const payload =
            type === "signup"
              ? postInputs
              : { email: postInputs.email, password: postInputs.password };
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/user/${
              type === "signup" ? "register" : "login"
            }`,
            payload,
            {
              withCredentials: true,
            }
          );
          console.log("response=>", response);
          if (response.status === 200) {
            console.log("Logged in successfully");
            if (type === "signup") {
              navigate("/signin");
            } else if (type === "signin") {
              navigate("/chat");
            }
            return;
          }
        } catch (e) {
          alert("Error while signing up");
          console.error("Error:", e);
        }
      } else {
        console.log("Not all fields are filled, cannot proceed with request.");
      }
    };

    fetchData();
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="User"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    username: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="email"
              placeholder="test@example.com"
              onChange={(e) => {
                const emailValue = e.target.value;
                setPostInputs({
                  ...postInputs,
                  email: emailValue,
                });
                setValidEmail(validateEmail(emailValue));
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className={`mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-${
                disabled ? 500 : 800
              } dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function LabelledInput({ label, placeholder, onChange, type }) {
  return (
    <div>
      <label className="block mb-2 text-sm text-green font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-pink-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
