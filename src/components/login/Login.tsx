import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import "./Login.css";
import { registerUser } from "../../api/DataFetch";

interface PostUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    img: string;
}

const Login = () => {
    const [userValues, setUserValues] = useState<PostUser>({
        firstName: "",
        lastName: "",
        email: "",
        img: "",
        phoneNumber: "",
    });
    const [errors, setErrors] = useState<Partial<PostUser>>({});

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(event.target.value)) {
            setUserValues({ ...userValues, phoneNumber: event.target.value });
        }
    };

    const validate = () => {
        const newErrors: Partial<PostUser> = {};
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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            console.log("Form is valid, submit the data");

            registerUser({
                email: userValues.email,
                firstName: userValues.firstName,
                lastName: userValues.lastName,
                password: ":dfsgsdfgsdgsdgsdfgsdfgsdfgs"
            })


            // Submit the data
        }
    };

    return (
        <div className="login-container">
            <h2>Sign In:</h2>
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
            <Button fullWidth variant="contained" onClick={handleSubmit}>
                Continue
            </Button>
        </div>
    );
};

export default Login;
