import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Navbar from "../Layout/Navbar";

function Profile() {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    displayName: "",
    dob: "",
    interests: "",
    phone: "",
    location: "",
    online: false,
    photoURL: "",
  });
  const [editing, setEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
    } else {
      fetchProfile();
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setProfile(userData);

        if (userData.photoURL && !userData.photoURL.startsWith("http")) {
          const photoURL = await getDownloadURL(ref(storage, userData.photoURL));
          setProfile((prevProfile) => ({
            ...prevProfile,
            photoURL: photoURL,
          }));
        }
      } else {
        await setDoc(userDocRef, {
          uid: user.uid,
          firstname: "",
          lastname: "",
          displayName: "",
          dob: "",
          interests: "",
          phone: "",
          location: "",
          online: true,
          photoURL: "",
        });
        setProfile({
          uid: user.uid,
          firstname: "",
          lastname: "",
          displayName: "",
          dob: "",
          interests: "",
          phone: "",
          location: "",
          online: true,
          photoURL: "",
        });
      }

      // Update user's online status to true
      await updateDoc(doc(db, "users", user.uid), {
        online: true,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      let photoURL = profile.photoURL;
      if (profilePicture) {
        const profilePictureRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(profilePictureRef, profilePicture);
        photoURL = await getDownloadURL(profilePictureRef);
      }

      await updateDoc(doc(db, "users", user.uid), {
        ...profile,
        photoURL: photoURL,
      });
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSignOut = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), { online: false });
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <span className="text-xl">Status: </span>
          <span className={profile.online ? "text-green-500" : "text-red-500"}>
            {profile.online ? "Online" : "Offline"}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Profile Picture: </span>
          {editing ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="border p-1"
            />
          ) : (
            profile.photoURL && (
              <img src={profile.photoURL} alt="Profile" className="w-20 h-20 rounded-full" />
            )
          )}
        </div>
        {!editing ? (
          <div>
            <div className="mb-4">
              <span className="font-semibold">Display Name: </span>
              {profile.displayName}
            </div>
            <div className="mb-4">
              <span className="font-semibold">First Name: </span>
              {profile.firstname}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Last Name: </span>
              {profile.lastname}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Date of Birth: </span>
              {profile.dob}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Interests/Hobbies: </span>
              {profile.interests}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Phone Number: </span>
              {profile.phone}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Location: </span>
              {profile.location}
            </div>
            <div className="mb-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-[#b1648fff] text-white py-2 px-4 rounded"
              >
                Edit Profile
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={handleSignOut}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block font-semibold">Display Name:</label>
              <input
                type="text"
                name="displayName"
                value={profile.displayName}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">First Name:</label>
              <input
                type="text"
                name="firstname"
                value={profile.firstname}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={profile.lastname}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Interests/Hobbies:</label>
              <textarea
                name="interests"
                value={profile.interests}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Phone Number:</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Location:</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                className="border p-1 w-full"
              />
            </div>
            <div className="mb-4">
              <button
                onClick={handleSave}
                className="bg-[#b1648fff] text-white py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
