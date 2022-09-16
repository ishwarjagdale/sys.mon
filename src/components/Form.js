import Button from "./Button";

export default function Form({page}) {
    return (
        <form className={"flex-1 p-8 rounded flex-col"}>
            <div className={"flex items-center"}>
                <span onClick={() => window.history.back()} className={"fas fa-arrow-left mr-2 cursor-pointer"}/>
                <span className={"font-bold text-lg text-gray-500 block"}>
                            {page === 1 && "Get Started"}
                    {page === 2 && "Log in"}
                    {page === 3 && "Reset Password"}
                        </span>
            </div>
            <hr className={"mt-2 mb-4"}/>
            <p className={"font-bold text-3xl pt-2"}>
                {page === 1 && "Register"}
                {page === 2 && "Welcome back"}
                {page === 3 && "Recover Account"}
            </p>
            <p className={"text-gray-500 pl-1 pt-2"}>
                {page === 1 && "Create an account to start using sys.mon"}
                {page === 2 && "Welcome back! please enter your details"}
                {page === 3 && "Enter your email, we'll send you a password reset link"}
            </p>
            <br/>
            <div className={"max-w-[500px]"}>
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
                           placeholder={"Enter password"}/>
                </div>}

                {page === 1 && <p className={"text-sm text-gray-600 my-2"}>
                    By signing up, I agree to sys.mon's <a className={"underline underline-offset-2"} href={"/"}>Privacy
                    Policy</a> & <a className={"underline underline-offset-2"} href={"/"}>Terms of Service</a>.
                </p>}
                {page === 2 && <div className={"flex justify-end"}>
                    <a href={"/forgot-password"} className={"text-sm my-1"}>Forgot password</a>
                </div>}
                <Button fill={'black'} border={2} classList={'max-w-[452px] py-3 mt-4 w-full'}>
                    {page === 1 && "Sign up"}
                    {page === 2 && "Log in"}
                    {page === 3 && "Reset Password"}
                </Button>
                {page !== 3 &&
                    <>
                        <div className={"flex justify-center my-1"}>
                            <span className={'text-gray-600'}>or</span>
                        </div>
                        <Button border={2} classList={'max-w-[452px] py-3 w-full'}>
                            <span><span className={"fab fa-google mr-2"}/>Sign in with Google</span>
                        </Button>
                    </>
                }
                <div className={"flex"}>
                    <a href={page === 1 ? "/login" : page === 2 ? "/get-started" : "/"} className={"text-sm mt-2 mx-auto"}>
                        {page === 1 && "Have an account? Sign in"}
                        {page === 2 && "Don't have an account? Sign up"}
                    </a>
                </div>
            </div>
        </form>
    )
}
