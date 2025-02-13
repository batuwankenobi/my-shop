import { useState } from "react";
import SignUpHookForm from "../components/SignUpHookForm";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { ecommerceAPI } from "../instance";

export default function SignUp() {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const navigate = useNavigate();

    const handleSignUpSubmit = (data) => {
        // Gereksiz alanları temizle
        const { confirmPassword, store, ...signUpData } = data;

        // Eğer role_id "2" değilse store bilgisini kaldır
        if (data.role_id !== "2") delete signUpData.store;

        setSubmitLoading(true);
        setSubmitError(false);

        ecommerceAPI.post("/signup", signUpData)
            .then(() => {
                setSubmitLoading(false);
                toast.success('You need to click the link in your email to activate your account!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });

                navigate(-1); // Önceki sayfaya yönlendir
            })
            .catch((err) => {
                console.error(err);
                setSubmitLoading(false);
                setSubmitError(true);
                toast.error('Sign-up failed! Please check your details and try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Slide,
                });
            });
    };

    return (
        <div className="w-screen">
            <div className="max-w-page-content mx-auto">
                <SignUpHookForm submitFn={handleSignUpSubmit} submitLoading={submitLoading} submitError={submitError} />
            </div>
        </div>
    );
}
