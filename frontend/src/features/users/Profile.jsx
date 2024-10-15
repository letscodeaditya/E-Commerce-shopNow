import React, { useState } from 'react';
import { Box, TextField, Button, Avatar, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify'; 


const Profile = () => {
    const userData = localStorage.getItem("user");
    const storedUserInfo = userData ? JSON.parse(userData).userDetail : {};

    const [userInfo, setUserInfo] = useState({
        name: storedUserInfo.name || '',
        email: storedUserInfo.email || '',
        pic: storedUserInfo.pic || ''
    });

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [editing, setEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword) {
            toast.error('Please provide your old password!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await axios.put('/api/user/update', {
                ...userInfo,
                oldPassword,
                newPassword,
            });


            localStorage.setItem("user", JSON.stringify({ userDetail: userInfo }));


            toast.success('Profile updated successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            setEditing(false);
        } catch (error) {

            toast.error('Error updating profile, please try again.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            console.error('Error updating user information', error);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: 'auto',
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                border:"3px solid black",
                backgroundColor: 'white',
                mt: 12
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
                My Account
            </Typography>

            {/* Profile Picture */}
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                <Avatar
                    alt="User Profile"
                    src={userInfo.pic} 
                    sx={{ width: 100, height: 100, margin: 'auto', mb: 2 }}
                />
                <Typography variant="h6">{userInfo.name}</Typography>
            </Box>

            {/* Form to Update User Information */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            disabled={!editing}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={userInfo.email}
                            disabled
                        />
                    </Grid>

                    {/* Old Password */}
                    {editing && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Old Password"
                                    name="oldPassword"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </Grid>

                            {/* New Password */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>

                {/* Buttons for Edit and Save */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                    {editing ? (
                        <Button variant="contained" color="primary" type="submit">
                            Save Changes
                        </Button>
                    ) : (
                        <Button variant="outlined" onClick={() => setEditing(true)}>
                            Edit Profile
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => console.log('Log out functionality here')}
                    >
                        Log Out
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default Profile;
