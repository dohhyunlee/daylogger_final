import TopBar from "./TopBar";
import { getUserAPIMethod, logoutUsersAPIMethod, updateUserAPIMethod, uploadImageToCloudinaryAPIMethod } from '../api/client';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './ProfilePage.css';
import IdleTimerContainer from "./IdleTimerContainer";

function ProfilePage() {
    const [user, setUser] = useState();

    useEffect(() => {
        getUserAPIMethod().then((u) => {
            console.log("user set in profile.js");
            setUser(u[0]);
        })
    }, []);

    const history = useHistory();

    const validatePassword = (email) => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);

    }

    const routeChange = () => {
        let path = "/loginPage";
        history.push(path);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validatePassword(user.email)) {
            console.log("Invalid pw");
            return;
        }

        console.log("updating user on the server...");
        updateUserAPIMethod(user).then((response) => {
            console.log("Updated the user on the server");
            console.dir(response);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "address1") {
            const updatedUser = { ...user };
            updatedUser.address.address1 = value;
            setUser(updatedUser);
        } else if (name === "address2") {
            const updatedUser = { ...user };
            updatedUser.address.address2 = value;
            setUser(updatedUser);
        } else {
            const updatedUser = { ...user, [name]: value };
            console.log("updated user:");
            console.dir(updatedUser);
            setUser(updatedUser);
        }
    };

    const handleImageSelected = (event) => {
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();

            const unsignedUploadPreset = 'xf8joxiu';
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);

                const updatedUser = { ...user, "profileURL": response.url };
                setUser(updatedUser);
            });
        }
    }

    const removeImage = (event) => {
        const updatedUser = { ...user, "profileURL": "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" };
        setUser(updatedUser);
    }

    const handleLogout = (event) => {
        /* setIsLoggedIn(false); */
        logoutUsersAPIMethod().then(() => {
            console.log("logged out successfully");
        });
        routeChange();

    }
    return (
        <div>
            <IdleTimerContainer></IdleTimerContainer>
            <TopBar />
            {user && (
                <div className="outerContainer">
                    <div className="innerContainer" id="inner">
                        <form onSubmit={handleSubmit}>
                            <h3>Edit Profile</h3>
                            <div className="profileContainer">
                                <h4>Profile Photo</h4>
                                <div className="profileHeader">
                                    <img className="profimg" src={user.profileURL} />
                                    <label className="custom-file-upload">
                                        <input type="file" name="image" accept="image/*" id="cloudinary" onChange={handleImageSelected} />
                                        Choose new image
                                    </label>
                                    <span className='removeImageButton' onClick={removeImage}>Remove Image</span>
                                </div>
                            </div>
                            <div className="nameContainer">
                                <label htmlFor="name">Name</label>
                                <input value={user.name} type="text" placeholder="Enter Name" name="name" id="profileName" onChange={handleChange} autoComplete="off" />
                            </div>
                            <div className="emailContainer">
                                <label htmlFor="email">Email</label>
                                <input value={user.email} type="text" placeholder="Enter Email" name="email" id="profileEmail" onChange={handleChange} autoComplete="off" />
                            </div>
                            <div className="addressContainer">
                                <label htmlFor="address">Address</label>
                                <input value={user.address.address1} type="text" name="address1" id="profileAddress" onChange={handleChange} autoComplete="off" />
                                <input value={user.address.address2} type="text" name="address2" id="profileAddress" onChange={handleChange} autoComplete="off" />
                            </div>
                            <div className="profileBottom">
                                <input type="submit" value="Save" className="savebtn" />
                                <button type="button" className="logoutbtn" onClick={handleLogout}>Logout</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage;