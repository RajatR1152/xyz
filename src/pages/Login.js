import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/Firebase";
import { toastSuccess, toastError } from "../helpers/Toaster";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [account, setAccount] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const customersCollectionRef = collection(db, "customers");
  const storesCollectionRef = collection(db, "stores");
  const navigate = useNavigate();

  const validation = () => {
    return true;
  };

  const clickInput = () => {
    setError(false);
    console.log('clicked');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const isValid = validation();

    if (isValid) {
      try {
        const q = query(collection(db, 'users'), where("nickname", "==", username));
        const response = await getDocs(q);

        let found = false;

        response.forEach((doc) => {
          const userData = doc.data();
          if (userData.password === password) {
            found = true;
            console.log('Login successful');
          }
        });

        if (!found) {
          throw new Error('Invalid username or password');
        }
      } catch (error) {
        console.error(error);
        alert('Invalid username or password');
      } finally {
        setLoader(false);
      }
    } else {
      alert('Please fill in all required fields.');
      setLoader(false);
    }

  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="grid grid-cols-1 items-center justify-items-center z-10 shadow-loginFormLeft bg-white">
        <div className="w-loginForm">
          <div className="grid grid-cols-loginFormImage items-center mb-5 gap-3">
            <Link to="/">
              <img
                src="images/taythrifts_logo.png"
                alt="taythrifts_logo"
                className="w-full"
              />
            </Link>
            <h3 className="text-loginForm text-4xl">Login Form</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-500">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm mt-2 mb-5 text-gray-700"
                value={username}
                onClick={clickInput}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-500">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm mt-2 mb-5 text-gray-700"
                value={password}
                onClick={clickInput}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 justify-items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="cursor-pointer"
                  name="accountType"
                  checked={accountType === "customer"}
                  required
                  onClick={clickInput}
                  onChange={() => setAccountType("customer")}
                />
                Customer
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="cursor-pointer"
                  name="accountType"
                  checked={accountType === "store"}
                  onClick={clickInput}
                  onChange={() => setAccountType("store")}
                />
                Store
              </div>
            </div>
            {error === false ? (
              <></>
            ) : (
              <>
                <div className="bg-red-300 mt-5 text-center py-2 rounded-md text-gray-800">
                  <p>Invalid Username and Password</p>
                </div>
              </>
            )}

            <div className="text-center mt-5">
              {loader === true ? (
                <>
                  <button
                    className="text-black bg-gray-300 w-11/12 rounded-md py-2 cursor-wait"
                    disabled
                  >
                    Logging In...
                  </button>
                </>
              ) : (
                <>
                  <button className="text-white bg-loginForm w-11/12 rounded-md py-2 hover:bg-btnLoginHover">
                    Log In
                  </button>
                </>
              )}
            </div>
            <div className="mt-9">
              <p>
                Doesn't have an account yet? Click{" "}
                <Link className="text-loginForm underline" to="/signup">
                  here
                </Link>{" "}
                to sign-up
              </p>
              <p>
                Click{" "}
                <Link className="text-loginForm underline" to="/">
                  here
                </Link>{" "}
                to go back.
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="z-0">
        <img
          src="images/login.jpg"
          alt="login-bg"
          className="object-cover h-full"
        />
      </div>
    </div>
  );
}

export default Login;
