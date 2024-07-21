import { Button, FormControl, TextField, InputAdornment, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Register.css";
import { registerUser as register, login } from "../../api/DataFetch";
import useUserStore from "../../state/UserStore";
import axios from "axios";
import useSnackbarStore from "../../state/SnackbarStore";

interface PostUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    img: string;
    password: string;
    confirmPassword: string;
}

interface RegisterProps {
    editMode?: boolean
    onConfirm: () => void
    onLoginClicked: () => void
}

const Register = (props: RegisterProps) => {
    const [userValues, setUserValues] = useState<PostUser>({
        firstName: "",
        lastName: "",
        email: "",
        img: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<Partial<PostUser>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const setUser = useUserStore(store => store.setUser);
    const user = useUserStore(store => store.user);
    const { opanStackbar } = useSnackbarStore(store => store);

    useEffect(() => {
        if (props.editMode && user) {
            setUserValues({
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: "0504599090",
                password: '',
                confirmPassword: '',
                email: user.email,
                img: user.imgUrl
            })

            setPreview(user.imgUrl)
        }
    }, [])

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(event.target.value)) {
            setUserValues({ ...userValues, phoneNumber: event.target.value });
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors: Partial<PostUser> = {};
        const passwordValidateRequaried = !props.editMode;
        if (!userValues.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!userValues.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!userValues.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(userValues.email)) {
            newErrors.email = "Email is not valid";
        }
        if (!userValues.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(userValues.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits";
        }
        if (passwordValidateRequaried && !userValues.password.trim()) {
            newErrors.password = "Password is required";
        }
        if (passwordValidateRequaried && !userValues.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (passwordValidateRequaried && userValues.password !== userValues.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async () => {
        if (validate()) {
            let profileImgUrl = '';
            if (selectedImage) {
                const formData = new FormData();
                formData.append('file', selectedImage);
                const uploadResponse = await axios.post('http://localhost:6969/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                profileImgUrl = uploadResponse.data?.urls[0] ?? '';
            }

            const userPayload = {
                firstName: userValues.firstName,
                lastName: userValues.lastName,
                email: userValues.email,
                imgUrl: profileImgUrl.length !== 0 ? profileImgUrl.replace('\\', '//') : (preview ? preview : 'https://i.sstatic.net/l60Hf.png'),
                phoneNumber: userValues.phoneNumber,
                password: userValues.password
            };

            if (props.editMode && user) {
                // Update user API call
                try {
                    const response = await axios.put(`http://localhost:6969/auth/users/${user._id}`, userPayload);

                    if (response?.data) {
                        setUser({
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            email: response.data.email,
                            _id: response.data._id,
                            imgUrl: response.data.imgUrl
                        });
                        props.onConfirm();
                    }
                    props.onConfirm();
                    opanStackbar('Account updated successfully', 'success')
                    setApiError('')
                } catch (e: any) {
                    setApiError(e?.response?.data?.message || "An error occurred during update. Please try again.");
                }
            } else {
                // Register user API call
                try {
                    await register(userPayload);
                    const loginResponse = await login({
                        email: userValues.email,
                        password: userValues.password
                    });
                    if (loginResponse?.data?.user) {
                        setUser({
                            firstName: loginResponse.data.user.firstName,
                            lastName: loginResponse.data.user.lastName,
                            email: loginResponse.data.user.email,
                            _id: loginResponse.data.user._id,
                            imgUrl: loginResponse.data.user.imgUrl
                        });
                        props.onConfirm();
                    }
                    opanStackbar('User crteated successfully', 'success')
                    setApiError('')
                } catch (e: any) {
                    setApiError(e?.response?.data?.message || "An error occurred during registration. Please try again.");
                }
            }
        }
    };


    // const handleSubmit = async () => {
    //     if (validate()) {
    //         let profileImgUrl = '';
    //         if (selectedImage) {
    //             const formData = new FormData();
    //             formData.append('file', selectedImage);
    //             const uploadResponse = await axios.post('http://localhost:6969/file', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });

    //             profileImgUrl = uploadResponse.data?.urls[0] ?? ''
    //         }

    //         register({
    //             firstName: userValues.firstName,
    //             lastName: userValues.lastName,
    //             email: userValues.email,
    //             imgUrl: profileImgUrl.replace('\\', '//'),
    //             // phoneNumber: userValues.phoneNumber,
    //             password: userValues.password
    //         }).then(res => {
    //             login({
    //                 email: userValues.email,
    //                 password: userValues.password
    //             }).then(res => {
    //                 if (res?.data?.user) {
    //                     setUser({
    //                         firstName: res.data.user.firstName,
    //                         lastName: res.data.user.lastName,
    //                         email: res.data.user.email,
    //                         _id: res.data.user._id,
    //                         imgUrl: res.data.user.imgUrl
    //                     })
    //                     props.onConfirm();
    //                 }
    //             }).catch(e => {
    //                 setApiError(e?.response?.data?.message || "An error occurred during login. Please try again.");
    //             });
    //         }).catch(e => {
    //             setApiError(e?.response?.data.message || "An error occurred during registration. Please try again.");
    //         });
    //     }
    // };

    return (
        <div className="registration-wrapper">

            <div className="register-container">
                <h2>{props.editMode && user ? 'Update account' : 'Register:'}</h2>
                {apiError && (
                    <Typography color="error" variant="body2">
                        {apiError}
                    </Typography>
                )}
                <FormControl fullWidth>
                    <TextField
                        label="First name"
                        value={userValues.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUserValues({ ...userValues, firstName: e.target.value })
                        }
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        label="Last name"
                        value={userValues.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUserValues({ ...userValues, lastName: e.target.value })
                        }
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        label="Email"
                        disabled={props.editMode && !!user}
                        type="email"
                        value={userValues.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUserValues({ ...userValues, email: e.target.value })
                        }
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        variant="outlined"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        value={userValues.phoneNumber}
                        inputProps={{ maxLength: 10 }}
                        onChange={handlePhoneNumberChange}
                        error={Boolean(errors.phoneNumber)}
                        helperText={errors.phoneNumber}
                    />
                </FormControl>

                {
                    !props.editMode && <>

                        <FormControl fullWidth>
                            <TextField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={userValues.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setUserValues({ ...userValues, password: e.target.value })
                                }
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handlePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <TextField
                                label="Confirm Password"
                                type={showPassword ? "text" : "password"}
                                value={userValues.confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setUserValues({ ...userValues, confirmPassword: e.target.value })
                                }
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handlePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                    </>
                }

                <Button variant="contained" fullWidth onClick={handleSubmit}>
                    {props.editMode && user ? 'Update details' : 'Register'}
                </Button>
                {
                    !props.editMode && !user && <p className="have-an-account">Already have an account ? <a onClick={props.onLoginClicked} className="login-now">Login now</a></p>
                }
            </div>

            <div className="upload-container">
                {preview ? (
                    <img src={preview} alt="Profile Preview" className="profile-preview" />
                ) : <img src={"/no_img.webp"} alt="No Profile" className="profile-preview" />}
                <div>
                    <Button
                        variant="contained"
                        component="label"
                        sx={
                            {
                                fontSize: '0.7em'
                            }
                        }
                    >
                        Upload Profile Image
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Register;
