import React, { useState } from "react";
import { app, db } from "../../services/Firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { toastSuccess, toastError } from "../../helpers/Toaster";
import ConfirmDialog from "../../helpers/ConfirmDialog";
import { AnimatePresence } from "framer-motion";

function CustomerRegistration() {
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
    nickname: '',
    address: '',
    username: '',
    birthday: '',
    emailAddress: '',
    contactNumber: '',
    contactNumber: '',
    age: '',
    password: '',
    gender: '',
    image: ''
  })

  let n;
  let v;

  function handle(e) {
    n = e.target.name;
    v = e.target.value;
    setUserData({ ...userData, [n]: v });
  }

  function handleImg(e) {
    setUserData({ ...userData, image: e.target.files[0] });
  }

  function validate() {


    if (userData.password == confirmPassword) {
      return true;
    }

  }

  const uid = new Date().getTime().toString();
  const storage = getStorage(app)

  async function submit(e) {
    e.preventDefault();
    setLoader(true);

    validate();

    let radio = document.getElementById('radio1');
    if (radio.checked == true) {
      userData.gender = 'male';
    }
    else {
      userData.gender = 'female';
    }


    if (validate) {
      const storageRef = ref(storage, 'images/' + userData.image.name);
      uploadBytes(storageRef, userData.image).then(() => {
      }).then((res) => {
        getDownloadURL(storageRef).then(async (url) => {
          let ud = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            middlename: userData.middlename,
            nickname: userData.nickname,
            address: userData.address,
            username: userData.username,
            birthday: userData.birthday,
            emailAddress: userData.emailAddress,
            contactNumber: userData.contactNumber,
            contactNumber: userData.contactNumber,
            age: userData.age,
            password: userData.password,
            gender: userData.gender,
            image: url
          }
          await setDoc(doc(db, 'users', uid), ud).then((res) => {
            console.log("user created successfully");
            setLoader(false);
          })
        });
      })
    }
    else {
      alert('confirm password and password doesnt match.')
    }
  }

  return (
    <div>
      <div className="min-h-screen max-h-full py-10">
        <div className="w-2/3 mx-auto py-12 bg-regFormBg rounded-xl shadow-sm">
          <div className="flex justify-center mb-5 ">
            <p className="text-xl uppercase border border-sideBarMarketplaceButtonsActive w-fit py-2 px-10">
              Customer Register Form
            </p>
          </div>
          <form method="post" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-x-10 pr-10 pl-5">
              <div className="grid grid-cols-regForm gap-6 items-center mt-5 w-full">
                <label className="text-right">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  name="firstname"
                  value={userData.firstname}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5 w-full">
                <label className="text-right">Middle Name </label>
                <input
                  type="text"
                  name="middlename"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.middlename}
                  onChange={handle}
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5 w-full">
                <label className="text-right">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  name="lastname"
                  value={userData.lastname}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5 w-full">
                <label className="text-right">
                  Nickname <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="nickname"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.nickname}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.address}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5 w-full">
                <label className="text-right">
                  Birthday <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="birthday"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.birthday}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="emailAddress"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.emailAddress}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Contact Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.contactNumber}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5 w-full">
                <label className="text-right">
                  Age <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  name="age"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.age}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Username <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.username}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={userData.password}
                  onChange={handle}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full border border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Gender <span className="text-red-600">*</span>
                </label>
                <div className="w-full h-9 px-3 border rounded-md text-sm text-gray-700 flex items-center justify-items-center gap-10">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="cursor-pointer"
                      // name="gender"
                      id="radio1"

                    />
                    Male
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      className="cursor-pointer"
                      // name="gender"
                      id="radio2"
                    />
                    Female
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-regForm gap-6 items-center mt-5">
                <label className="text-right">
                  Profile Image <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="w-full border pt-1 border-gray-300 rounded-md h-9 px-3 outline-loginForm text-sm text-gray-700"
                  accept="image/*"
                  onChange={handleImg}

                />
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <img
                src={userData.image ? window.URL.createObjectURL(userData?.image) : "../images/defaultImage.png"}
                id="previewImg"
                alt="defaultImage"
                className="w-52 h-52 object-cover rounded-full shadow-md"
              />
            </div>

            <div className="text-center mt-10">
              {loader === true ? (
                <>
                  <button
                    className="bg-gray-300 py-2 px-24 rounded-md text-black cursor-wait"
                    disabled
                  >
                    Submitting...
                  </button>
                </>
              ) : (
                <>
                  <button onClick={submit} className="bg-sideBarMarketplaceButtonsActive hover:bg-sideBarMarketplaceButtons py-2 px-24 rounded-md text-white">
                    Register
                  </button>
                </>
              )}

            </div>
          </form>
        </div>
      </div>
      {/* <AnimatePresence>
        {modal && (
          <ConfirmDialog
            setModal={setModal}
            message={message}
            deleteItem={handleSubmit2}
          />
        )}
      </AnimatePresence> */}
    </div>
  );
}

export default CustomerRegistration;
