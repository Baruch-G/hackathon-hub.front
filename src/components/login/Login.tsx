import { Button, FormControl, TextField, InputAdornment, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Login.css";
import { login } from "../../api/DataFetch";
import useUserStore from "../../state/UserStore";

interface PostUser {
    email: string;
    password: string;
}

interface LoginProps {
    onConfirm: () => void
    onRegisterClicked: () => void
}

const Login = (props: LoginProps) => {
    const [userValues, setUserValues] = useState<PostUser>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<PostUser>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const setUser = useUserStore(store => store.setUser);

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        const newErrors: Partial<PostUser> = {};
        if (!userValues.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(userValues.email)) {
            newErrors.email = "Email is not valid";
        }
        if (!userValues.password.trim()) {
            newErrors.password = "Password is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            login({
                email: userValues.email,
                password: userValues.password
            }).then(res => {
                if (res?.data?.user) {
                    setUser({
                        firstName: res.data.user.firstName,
                        lastName: res.data.user.lastName,
                        email: res.data.user.email,
                        _id: res.data.user._id
                    })
                    props.onConfirm();
                }
            }).catch(e => {
                setApiError(e?.response?.data || "An error occurred. Please try again.");
            })
        }
    };

    return (
        <div className="login-container">
            <h2>Sign In:</h2>
            <FormControl fullWidth>
                <TextField
                    label="Email"
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
            {apiError && (
                <Typography color="error" variant="body2">
                    {apiError}
                </Typography>
            )}
            <Button fullWidth variant="contained" onClick={handleSubmit}>
                Continue
            </Button>

            <p className="no-account">Dont have ab account ? <a onClick={props.onRegisterClicked} className="register-now">Register now</a></p>
        </div>
    );
};

export default Login;
