import React from "react";
import Button from "../components/Button";
import {Authentication} from "../api/authentication";
import {notify} from "../components/notifier";
import {useParams} from "react-router-dom";


class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false

        };
        this.setLoader = this.setLoader.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setLoader(bool) {
        this.setState({loading: bool});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setLoader(true);
        let formData;
        switch (this.props.page) {
            case 1: {
                formData = {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                }
                break;
            }
            case 2: {
                formData = {
                    email: e.target.email.value,
                    password: e.target.password.value
                }
                break;
            }
            case 3: {
                if(this.props.params.resetToken) {
                    if(e.target.password.value === e.target.confirm_password.value) {
                        formData = {
                            token: this.props.params.resetToken,
                            password: e.target.password.value
                        }
                    } else {
                        notify("Entered password doesn't match", 'failed');
                        return this.setLoader(false);
                    }
                } else {
                    formData = {
                        email: e.target.email.value
                    }
                }
                break;
            }
            case 4: {
                formData = {
                    token: e.target.v_code.value
                }
                break;
            }
            default: {
                formData = {};
            }
        }

        Authentication(this.props.page, formData
        ).then(res => {
            console.log("res", res);
            if (res?.status === 200) {
                switch (this.props.page) {
                    case 1:
                        notify("Verify email to proceed", 'success');
                        window.location.href = "/verification";
                        break;
                    case 2:
                        notify("Login successful", 'success');
                        window.location.href = "/dashboard";
                        break;
                    case 3:
                        if(this.props.params.resetToken) {
                            notify("Password changed successfully", 'success');
                            break;
                        }
                        notify("Reset link sent", 'success');
                        break;
                    case 4:
                        notify("Email authenticated", 'success');
                        window.location.href = "/dashboard";
                        break;
                    default:
                        break;
                }
            }
        }).finally(() => {
            this.setLoader(false);
        });
    }

    componentDidMount() {
        if(this.props.page === 3) {
            console.log(this.props.params.resetToken);
        }
    }

    render() {

        const NameElement = () => <div className={"form-element"}>
            <label>Name</label>
            <input type={"text"} required={true} name={'name'} placeholder={"John Doe"}/>
        </div>
        const EmailElement = () => <div className={"form-element"}>
            <label>Email</label>
            <input type={"email"} required={true} name={'email'} placeholder={"johndoe@ex.org"}/>
        </div>
        const PasswordElement = ({confirm=false}) => <div className={"form-element"}>
            <label>{confirm ? "Confirm Password" : "Password"}</label>
            <input type={"password"} required={true} name={confirm ? 'confirm_password' : 'password'} placeholder={confirm ? "Confirm Password" : "Enter password"}/>
        </div>
        const VerificationElement = () => <div className={"form-element"}>
            <label>Verification Code</label>
            <input type={"text"} required={true} name={'v_code'} placeholder={"Code"}/>
        </div>
        const TermsAndService = () => <p className={"sec-text text-xs md:text-sm text-gray-600 my-2"}>
            By signing up, I agree to sys.mon's <a className={"underline underline-offset-2"} href={"/"}>Privacy
            Policy</a> & <a className={"underline underline-offset-2"} href={"/"}>Terms of Service</a>.
        </p>
        const ForgotPassword = () => <div className={"flex justify-end"}>
            <a href={"/forgot-password"} className={"sec-text text-sm my-1"}>Forgot password</a>
        </div>
        const GoogleSignIn = () => <><div className={"flex justify-center my-1"}>
            <span className={'text-sm text-gray-600 sec-text'}>or</span>
        </div>
            <Button border={2} classList={'py-3 w-full'} disable={true}>
                <span className={"text-sm lg:text-md"}><span className={"fab fa-google mr-2"}/>Sign in with Google</span>
            </Button></>
        const SignUpPrompt = ({have}) => <div className={"flex"}>
            <a href={have ? "/login" : "/get-started"}
               className={"sec-text text-xs md:text-sm mt-4 mx-auto"}>{
                have ? "Have an account? Sign in" :"Don't have an account? Sign up"
            }</a>
        </div>
        const SubmitButton = ({buttonType}) => {
            return this.state.loading ?
                    <Button type={"submit"} fill={'black'} border={2} classList={'py-3 mt-4 w-full text-sm'}
                            disable={this.state.loading}>
                        <span className={"fas fa-spinner animate-spin text-white"}/>
                    </Button>
                    :
                    <Button type={"submit"} fill={'black'} border={2} classList={'py-3 mt-4 w-full text-sm'}
                            disable={this.state.loading}>{buttonType}
                    </Button>
        }

        const PageLoader = () => {
            switch (this.props.page) {
                case 1: {
                    return <>
                        <NameElement/>
                        <EmailElement/>
                        <PasswordElement/>
                        <TermsAndService/>
                        <SubmitButton buttonType={'Get Started'}/>
                        <GoogleSignIn/>
                        <SignUpPrompt have={true}/>
                    </>
                }
                case 2: {
                    return <>
                        <EmailElement/>
                        <PasswordElement/>
                        <ForgotPassword/>
                        <SubmitButton buttonType={"Login"}/>
                        <GoogleSignIn/>
                        <SignUpPrompt have={false}/>
                    </>
                }
                case 3: {
                    return this.props.params.resetToken ?
                    <>
                        <PasswordElement/>
                        <PasswordElement confirm={true}/>
                        <SubmitButton buttonType={"Change Password"}/>
                    </>
                    :
                    <>
                        <EmailElement/>
                        <SubmitButton buttonType={"Reset Password"}/>
                    </>
                }
                case 4: {
                    return <>
                        <VerificationElement/>
                        <SubmitButton buttonType={'Authenticate'}/>
                    </>
                }
                default: {

                }
            }
        }

        return (
            <>
                <form id={"hero-form"} className={"flex-1 p-6 rounded flex-col"} onSubmit={this.handleSubmit}>
                    <div className={"flex items-center"}>
                        <span onClick={() => window.history.back()} className={"fas fa-arrow-left mr-2 cursor-pointer"}/>
                        <span className={"font-bold text-lg text-gray-500 block"}>
                            {this.props.page === 1 && "Get Started"}
                            {this.props.page === 2 && "Log in"}
                            {this.props.page === 3 && "Reset Password"}
                            {this.props.page === 4 && "Verification"}
                        </span>
                    </div>
                    <hr className={"mt-2 mb-4"}/>
                    <div className={"max-w-[500px] mx-auto md:ml-0 md:mr-auto"}>
                        <p className={"font-bold text-3xl pt-2"}>
                            {this.props.page === 1 && "Register"}
                            {this.props.page === 2 && "Welcome back"}
                            {this.props.page === 3 && "Recover Account"}
                            {this.props.page === 4 && "Authenticate email"}
                        </p>
                        <p className={"sec-text text-gray-500 text-sm lg:text-md pl-1 pt-2"}>
                            {this.props.page === 1 && "Create an account to start using sys.mon"}
                            {this.props.page === 2 && "Welcome back! please enter your details"}
                            {this.props.page === 3 && (
                                this.props.params.resetToken ? "Enter new password" : "Enter your email, we'll send you a password reset link"
                            )}
                            {this.props.page === 4 && "Enter the verification code given in the email we sent you"}
                        </p>
                        <br/>
                        <PageLoader/>
                    </div>
                </form>
            </>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent {...props} params={params}/>
    )

}

export default withRouter(Auth);
