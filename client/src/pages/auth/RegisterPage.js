import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import TextInput from "../../components/forms/TextInput";
import ErrorMessage from "../../components/ErrorMessage";
import SelectOptions from "../../components/forms/SelectOptions";
import Loader from "../../components/loader/Loader";

import { countries } from "../../data/countries";
import { register, selectUser } from "../../store/features/user/userSlice";
import Modal from "../../components/Modal";
import PrimaryButton from "../../components/PrimaryButton";

const RegisterPage = () => {
    const [steps, setSteps] = useState("one");
    const [ageAllowed, setAgeAllowed] = useState(null);
    const [message, setMessage] = useState("");
    const [ageLimit] = useState(20);
    const y = new Date().toLocaleDateString().split("/")[2];
    const m = new Date().toLocaleDateString().split("/")[0];
    const d = new Date().toLocaleDateString().split("/")[1];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        username: "",
        email: "",
        dateOfBirth: "",
        sex: "",
        sexualOrientation: "",
        maritalStatus: "",
        hugot: "",
        city: "",
        stateProvince: "",
        country: "",
        password: "",
        confirmPassword: "",
    });
    const {
        isLoading,
        isSuccess,
        message: errorMessage,
        isError,
    } = useSelector(selectUser);
    useEffect(() => {
        if (isError) {
            setMessage(errorMessage);
        }
        if (isSuccess) {
            navigate("/auth/success");
            setData({
                username: "",
                email: "",
                dateOfBirth: "mm/dd/yyyy",
                sex: "",
                city: "",
                stateProvince: "",
                country: "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [isError, errorMessage, isSuccess, navigate]);

    useEffect(() => {
        const isYear =
            y - Number(data?.dateOfBirth.split("-")[0]) >= ageLimit &&
            data?.dateOfBirth
                ? true
                : false;
        const isMonth =
            Number(data?.dateOfBirth.split("-")[0]) >= ageLimit &&
            Number(data?.dateOfBirth.split("-")[1]) <= Number(m)
                ? true
                : false;
        const isDay =
            Number(data?.dateOfBirth.split("-")[1]) < Number(m)
                ? true
                : Number(data?.dateOfBirth.split("-")[2]) <= Number(d);

        // console.log(isYear, isMonth, isDay)
        if (isYear && isMonth && isDay) {
            setAgeAllowed(true);
            setMessage("");
            return;
        } else {
            if (Boolean(data.username.trim()) || Boolean(data.email.trim())) {
                if (y - Number(data?.dateOfBirth.split("-")[0]) <= ageLimit) {
                    setAgeAllowed(false);
                    setMessage("Under 20 years old is not allowed.");
                } else {
                    setAgeAllowed(true);
                    setMessage("");
                }
            }
            return;
        }
    }, [data.dateOfBirth, d, m, y, ageLimit]);

    const onNextHandler = () => {
        if (
            Boolean(!data.username.trim()) ||
            Boolean(!data.email.trim()) ||
            Boolean(!data.dateOfBirth.trim()) ||
            Boolean(!data.sex.trim()) ||
            Boolean(!data.sexualOrientation.trim()) ||
            Boolean(!data.maritalStatus.trim())
        ) {
            setMessage("All fields are required.");
            return;
        } else {
            setMessage("");
            setSteps("two");
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (
            Boolean(!data.hugot.trim()) ||
            Boolean(!data.city.trim()) ||
            Boolean(!data.stateProvince.trim()) ||
            Boolean(!data.country.trim()) ||
            Boolean(!data.password.trim()) ||
            Boolean(!data.confirmPassword.trim())
        ) {
            setMessage("All fields are required.");
            return;
        } else {
            setMessage("");
            setSteps("two");
        }
        dispatch(register(data));
    };
    return (
        <>
            {isLoading ? (
                <Modal isActive={isLoading}>
                    <Loader>Registration in process...</Loader>
                </Modal>
            ) : null}
            <form onSubmit={submitHandler} className="relative">
                {(!ageAllowed && message) || isError ? (
                    <ErrorMessage>{message}</ErrorMessage>
                ) : null}
                {steps === "one" ? (
                    <div>
                        <TextInput
                            value={data.username}
                            onChange={(e) =>
                                setData({ ...data, username: e.target.value })
                            }
                            type="text"
                            name="username"
                            label="Username"
                            title="Username"
                        />
                        <TextInput
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            type="email"
                            name="email"
                            label="Email"
                            title="Email"
                        />
                        <TextInput
                            value={data.dateOfBirth}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    dateOfBirth: e.target.value,
                                })
                            }
                            type="date"
                            name="date"
                            label="Date of Birth"
                            title="mm/dd/yyyy"
                        />
                        <SelectOptions
                            value={data.maritalStatus}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    maritalStatus: e.target.value,
                                })
                            }
                            label="Marital Status"
                            data={[
                                { name: "-" },
                                { name: "Single" },
                                { name: "Married" },
                                { name: "Widow" },
                                { name: "Divorced" },
                                { name: "Complicated" },
                            ]}
                        />
                        <SelectOptions
                            value={data.sex}
                            onChange={(e) =>
                                setData({ ...data, sex: e.target.value })
                            }
                            label="Sex"
                        />
                        <SelectOptions
                            value={data.sexualOrientation}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    sexualOrientation: e.target.value,
                                })
                            }
                            label="Sexual Orientation"
                            data={[
                                { name: "-" },
                                { name: "Straight" },
                                { name: "Gay" },
                                { name: "Bi" },
                                { name: "Lesbian" },
                                { name: "Transgender" },
                            ]}
                        />

                        <div className="p-4">
                            <p className="text-light">
                                Have accound with us.{" "}
                                <Link
                                    to="/auth"
                                    className="text-secondary ml-3"
                                >
                                    Login Here!
                                </Link>
                            </p>
                        </div>

                        <PrimaryButton onClick={onNextHandler} add="w-full">
                            Next
                        </PrimaryButton>
                    </div>
                ) : (
                    <div>
                        <TextInput
                            value={data.hugot}
                            onChange={(e) =>
                                setData({ ...data, hugot: e.target.value })
                            }
                            type="text"
                            name="hugot"
                            label="Hugot"
                            title="Hugot"
                        />
                        <TextInput
                            value={data.city}
                            onChange={(e) =>
                                setData({ ...data, city: e.target.value })
                            }
                            type="text"
                            name="city"
                            label="City"
                            title="City"
                        />
                        <TextInput
                            value={data.stateProvince}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    stateProvince: e.target.value,
                                })
                            }
                            type="text"
                            name="stateProvince"
                            label="State Province"
                            title="State Province"
                        />
                        <SelectOptions
                            value={data.country}
                            onChange={(e) =>
                                setData({ ...data, country: e.target.value })
                            }
                            label="Country"
                            data={countries}
                        />

                        <TextInput
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            type="password"
                            name="password"
                            label="Password"
                            title="Password"
                        />
                        <TextInput
                            value={data.confirmPassword}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    confirmPassword: e.target.value,
                                })
                            }
                            type="password"
                            name="confirmPassword"
                            label="Confirm Password"
                            title="Confirm Password"
                        />
                        <div className="p-4">
                            <p className="text-light">
                                Have accound with us.{" "}
                                <Link
                                    to="/auth"
                                    className="text-secondary ml-3"
                                >
                                    Login Here!
                                </Link>
                            </p>
                        </div>
                        <div className="p-4">
                            <p className="text-light">
                                Forgot password{" "}
                                <a href="!#" className="text-secondary ml-3">
                                    Reset your password here!
                                </a>
                            </p>
                        </div>
                        <div className="flex items-center w-full gap-1">
                            <PrimaryButton
                                onClick={() => setSteps("one")}
                                type="button"
                                add="w-full from-dark to-primary"
                            >
                                <MdArrowBackIos /> <span>Previous</span>
                            </PrimaryButton>

                            <PrimaryButton type="submit" add="w-full">
                                Register
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
};

export default RegisterPage;
