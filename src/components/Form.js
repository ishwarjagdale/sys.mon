import Button from "./Button";
import {Authentication} from "../api/authentication";
import {useState} from "react";


export default function Form({page}) {

    const [loading, set_loader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        set_loader(true);
        let formData = {
            email: e.target.email.value
        };
        if(page === 1) formData["name"] = e.target.name.value;
        if(page !== 3) formData["password"] = e.target.password.value;
        Authentication(page, formData
        ).then(res => {
            console.log("res", res);
            if(res?.status === 200) {
                window.location.href = '/dashboard';
            }
        });
        set_loader(false);
    }


    return (
        <form id={"hero-form"} className={"flex-1 p-6 rounded flex-col"} onSubmit={handleSubmit}>
            <div className={"flex items-center"}>
                <span onClick={() => window.history.back()} className={"fas fa-arrow-left mr-2 cursor-pointer"}/>
                <span className={"font-bold text-lg text-gray-500 block"}>
                            {page === 1 && "Get Started"}
                    {page === 2 && "Log in"}
                    {page === 3 && "Reset Password"}
                        </span>
            </div>
            <hr className={"mt-2 mb-4"}/>
            <div className={"max-w-[500px] mx-auto md:ml-0 md:mr-auto"}>
                <p className={"font-bold text-3xl pt-2"}>
                    {page === 1 && "Register"}
                    {page === 2 && "Welcome back"}
                    {page === 3 && "Recover Account"}
                </p>
                <p className={"sec-text text-gray-500 text-sm lg:text-md pl-1 pt-2"}>
                    {page === 1 && "Create an account to start using sys.mon"}
                    {page === 2 && "Welcome back! please enter your details"}
                    {page === 3 && "Enter your email, we'll send you a password reset link"}
                </p>
                <br/>
                {page === 1 && <div className={"form-element"}>
                    <label>Name</label>
                    <input type={"text"} required={true} name={'name'} placeholder={"John Doe"}/>
                </div>}
                <div className={"form-element"}>
                    <label>Email</label>
                    <input type={"email"} required={true} name={'email'} placeholder={"johndoe@ex.org"}/>
                </div>
                {page !== 3 && <div className={"form-element"}>
                    <label>Password</label>
                    <input type={"password"} required={true} name={'password'}
                           placeholder={"Enter password"}
                    />
                </div>}

                {page === 1 && <p className={"sec-text text-xs md:text-sm text-gray-600 my-2"}>
                    By signing up, I agree to sys.mon's <a className={"underline underline-offset-2"} href={"/"}>Privacy
                    Policy</a> & <a className={"underline underline-offset-2"} href={"/"}>Terms of Service</a>.
                </p>}
                {page === 2 && <div className={"flex justify-end"}>
                    <a href={"/forgot-password"} className={"sec-text text-sm my-1"}>Forgot password</a>
                </div>}
                <Button type={"submit"} fill={'black'} border={2} classList={'py-3 mt-4 w-full text-sm'} disable={loading}>
                    {
                        loading ? <span className={"fas fa-spinner animate-spin text-white"} />
                            :
                            page === 1 ? "Sign up" :
                            page === 2 ? "Log in" :
                            page === 3 ? "Reset Password":
                                "null"
                    }
                </Button>
                {page !== 3 &&
                    <>
                        <div className={"flex justify-center my-1"}>
                            <span className={'text-sm text-gray-600 sec-text'}>or</span>
                        </div>
                        <Button border={2} classList={'py-3 w-full'} disable={true}>
                            <span className={"text-sm lg:text-md"}><span className={"fab fa-google mr-2"}/>Sign in with Google</span>
                        </Button>
                    </>
                }
                <div className={"flex"}>
                    <a href={page === 1 ? "/login" : page === 2 ? "/get-started" : "/"} className={"sec-text text-xs md:text-sm mt-4 mx-auto"}>
                        {page === 1 && "Have an account? Sign in"}
                        {page === 2 && "Don't have an account? Sign up"}
                    </a>
                </div>
            </div>
        </form>
    )
}
