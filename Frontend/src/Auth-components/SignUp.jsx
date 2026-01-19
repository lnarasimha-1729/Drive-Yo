import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/UserActions";
import { loginUser } from "../actions/UserActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {

  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);

  const registerState = useSelector(state=>state.registerUserReducer)

  const {loading, success, error} = registerState
  
  const dispatch = useDispatch();

  // Form state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });


  const handleRegister = async (registerData) => {
    dispatch(registerUser(registerData));
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 🔥 stops page reload
    dispatch(loginUser(loginData));
  };

  useEffect(()=>{
    if(success){
      toast.success(success)
      navigate("/")
    }

    if(error){
      toast.error(error)
    }
  },[success, error, navigate])


  return (
    <div className="flex justify-center">
      <div className="bg-white shadow-lg w-[22rem] px-7 py-4 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {/* ---------- FORM WRAPPER (STOP AUTOFILL) ---------- */}
        <form autoComplete="off" onSubmit={isLogin ? handleLogin : undefined}>
          {/* Fake fields to disable browser autofill */}
          <input type="text" name="fake-username" autoComplete="username" style={{ display: "none" }} />
          <input type="password" name="fake-password" autoComplete="new-password" style={{ display: "none" }} />

          {/* ---------------- LOGIN FORM ---------------- */}
          {isLogin && (
            <div className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                className="border p-2 rounded"
                required
              />


              <input
                type="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="border p-2 rounded"
                autoComplete="current-password"
                required
              />

              <button
                type="submit"
                className="bg-gray-700 text-white py-3 rounded-lg cursor-pointer"
              >
                Login
              </button>


              <p className="text-center text-sm">
                New user?{" "}
                <span
                  className="text-blue-600 font-bold cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Create Account
                </span>
              </p>
            </div>
          )}

          {/* ---------------- SIGNUP FORM ---------------- */}
          {!isLogin && (
            <div className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Name"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                className="border p-2 rounded"
                autoComplete="off"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className="border p-2 rounded"
                autoComplete="off"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className="border p-2 rounded"
                autoComplete="new-password"
                required
              />

              <input
                type="text"
                placeholder="Full Name"
                value={registerData.full_name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, full_name: e.target.value })
                }
                className="border p-2 rounded"
                autoComplete="off"
                required
              />

              <button
              onClick={() => handleRegister(registerData)}
                className="w-full bg-gray-700 text-white py-3 rounded-lg cursor-pointer"
              >
                Sign Up
              </button>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <span
                  className="text-blue-600 font-bold cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
