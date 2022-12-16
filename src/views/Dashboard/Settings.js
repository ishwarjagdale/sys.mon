import React from "react";
import {notify} from "../../components/notifier";
import Button from "../../components/Button";
import {UpdateUser} from "../../api/api";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: localStorage.getItem('theme') || 'dark',
            settings : {...JSON.parse(localStorage.getItem('user'))},
            user: JSON.parse(localStorage.getItem('user')),
            changes: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        let newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        document.getElementById('root').classList.replace(newTheme === 'dark' ? 'light' : 'dark', newTheme);
        this.setState({theme: newTheme});
    }

    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value.trim();
        this.setState({settings: {...this.state.settings, ...change}, changes: true})
    }

    handleSubmit(e) {
        e.preventDefault();
        let payload = {};
        for(let i of Object.keys(this.state.settings)) {
            if(i === 'confirm_password')
                continue;
            if(i === 'password') {
                if(this.state.settings.password.trim() === this.state.settings.confirm_password.trim()) {
                    payload['password'] = this.state.settings.password;
                } else {
                    return notify("Both fields must have same password");
                }
            } else {
                if(this.state.settings[i] !== this.state.user[i]) {
                    payload[i] = this.state.settings[i];
                }
            }
        }
        if(payload !== {}) {
            UpdateUser(payload).then((res) => {
                if(res.status === 200) {
                    notify("Changes saved!");
                    window.location.reload();
                }
            }).catch((err) => {
                notify(err.response.status, 'failed');
            })
        }
    }

    componentDidMount() {
        console.log(this.state.settings, this.state.user);
    }

    render() {
        return (
            <>
                <div id={"content"} className={"rounded-xl flex-1 mx-2 h-full flex py-8 px-2 lg:px-8 flex-col"}>
                    <div className={"flex items-center mx-2"}>
                        <span className={"font-bold text-3xl text-gray-400 mr-2 py-6"}>Dashboard > </span>
                        <span className={"font-bold text-3xl text-gray-800 py-6 text-highlight"}>Settings</span>
                    </div>
                    <div className={"flex flex-col xl:max-w-[800px] w-full lg:p-4"}>
                        <div className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between form-element"}>
                            <div className={"flex flex-col mr-4"}>
                                <span className={"sec-text mr-4"}>Name</span>
                                <p className={"text-[12px] lg:text-sm sec-text"}>This name will be visible on your dashboard</p>
                            </div>

                            <input onChange={this.handleChange} type={"text"} name={'name'} placeholder={"Name"} defaultValue={this.state.settings.name} className={"sec-text"}/>

                        </div>
                        <div className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between form-element"}>
                            <div className={"flex flex-col mr-4"}>
                                <span className={"sec-text mr-4"}>Email</span>
                                <p className={"text-[12px] lg:text-sm sec-text"}>You need this access your account</p>
                            </div>

                            <input onChange={this.handleChange} type={"text"} name={'email'} placeholder={"Email"} defaultValue={this.state.settings.email} className={"sec-text"}/>

                        </div>
                        <hr className={"border-slate-400 my-4"}/>
                        <div className={"flex flex-col text-sm lg:text-[16px] py-4"}>
                            <div className={"flex w-full lg:items-center justify-between flex-col lg:flex-row form-element"}>
                                <div className={"flex flex-col mr-4"}>
                                    <span className={"sec-text mr-4"}>New Password</span>
                                    {/*<p className={"text-[12px] lg:text-sm sec-text"}>You need this access your account</p>*/}
                                </div>

                                <input onChange={this.handleChange} type={"password"} name={'password'} placeholder={"Password"} className={"sec-text"}/>

                            </div>
                            <div className={"flex w-full lg:items-center justify-between flex-col lg:flex-row form-element"}>
                                <div className={"flex flex-col mr-4"}>
                                    <span className={"sec-text mr-4"}>Confirm Password</span>
                                    <p className={"text-[12px] lg:text-sm sec-text"}>Make sure both password matches</p>
                                </div>

                                <input onChange={this.handleChange} type={"password"} name={'confirm_password'} placeholder={"Confirm Password"} className={"sec-text"}/>

                            </div>
                        </div>
                        <hr className={"border-slate-400 my-4"}/>
                        <div className={"flex flex-col text-sm lg:text-[16px] py-4 form-element cursor-pointer"} onClick={this.toggleTheme}>
                            <span className={"sec-text mr-4"}>Theme</span>
                            <div className={`border my-4 p-4 px-6 rounded-full flex ${this.state.theme === 'dark' ? 'night': 'morning'} justify-between`}>
                                {this.state.theme === 'dark' ?
                                    <div className={"fas fa-moon ml-auto drop-shadow-2xl"}/> :
                                    <div className={"fas fa-sun text-yellow-400 drop-shadow-2xl"}/>}
                            </div>
                        </div>
                        <hr className={"border-slate-400 my-4"}/>
                        <Button type={'submit'} onclick={this.handleSubmit} border={0} disable={!this.state.changes}
                                classList={'p-4 py-2 text-sm lg:text-md w-full mt-4 primary-btn'}>
                            Update Settings
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}

export default Settings;
