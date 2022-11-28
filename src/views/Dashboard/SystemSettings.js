import React from "react";
import {DeleteSystem, UpdateSystem} from "../../api/api";
import {notify} from "../../components/notifier";
import Button from "../../components/Button";

class SystemSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            system: this.props.system
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleUpdate(e, attr) {
        e.preventDefault();
        let payload = null;
        switch (attr) {
            case 'enable_mon': {
                payload = {enable_mon: !this.state.system.enable_mon};
                break;
            }
            case 'alert': {
                payload = {alert: !this.state.system.alert};
                break;
            }
            case 'name': {
                if(e.target.name.value !== this.state.system.name)
                    payload = {name: e.target.name.value};
                break;
            }
            default: {}
        }
        if(payload)
            UpdateSystem(this.state.system.sys_id, payload).then((res) => {
                if(res.status === 200) {
                    this.setState({system: res.data});
                    notify('Changes saved!', 'success');
                } else {
                    notify(`${res.status} Changes failed!`, 'failed');
                }
            })
    }

    handleDelete() {
        if(window.confirm("Are you sure?"))
            DeleteSystem(this.state.system.sys_id).then((res) => {
                if(res.status === 200) {
                    notify('System removed successfully!', 'success');
                    window.location.href = '/dashboard';
                } else {
                    notify(`${res.status} System removal failed!`, 'failed');
                }
            })
    }

    render() {
        return (
            <div className={"flex flex-col xl:max-w-[800px] w-full lg:p-4"}>
                <div className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between"}>
                    <div className={"flex flex-col mr-4"}>
                        <span className={"sec-text mr-4"}>Name</span>
                        <p className={"text-[12px] lg:text-sm sec-text"}>A name for the system, helpful for you to recognize.</p>
                    </div>
                    <form onSubmit={(e) => this.handleUpdate(e, 'name')} className={"form-element"}>
                        <input type={"text"} name={'name'} placeholder={"Name"} defaultValue={this.state.system.name} className={"sec-text"}/>
                    </form>
                </div>
                <div className={"flex py-4 items-center justify-between"}>
                    <div className={"flex flex-col mr-4"}>
                        <span className={"sec-text mr-4"}>Enable Mon</span>
                        <p className={"text-[12px] lg:text-sm sec-text"}>Enable or disable Mon, Mon is an monitoring agent installed on the system.</p>
                    </div>
                    <i onClick={(e) => this.handleUpdate(e, 'enable_mon')} className={`border-2 min-w-[50px] cursor-pointer flex items-center p-1 justify-${this.state.system.enable_mon ? 'end': 'start'} rounded-full h-[30px] w-[60px]`}>
                        <i className={`rounded-full aspect-square h-full w-auto ${this.state.system.enable_mon ? 'bg-green-400': 'bg-red-400'}`}></i>
                    </i>
                </div>
                <div className={"flex py-4 items-center justify-between"}>
                    <div className={"flex flex-col mr-4"}>
                        <span className={"sec-text mr-4"}>Email Alerts</span>
                        <p className={"text-[12px] lg:text-sm sec-text"}>Receive alerts of the system's activities on registered email address.</p>
                    </div>
                    <i onClick={(e) => this.handleUpdate(e, 'alert')} className={`border-2 min-w-[50px] cursor-pointer flex items-center p-1 justify-${this.state.system.alert ? 'end': 'start'} rounded-full h-[30px] w-[60px]`}>
                        <i className={`rounded-full aspect-square h-full w-auto ${this.state.system.alert ? 'bg-green-400': 'bg-red-400'}`}></i>
                    </i>
                </div>
                <hr className={"border-slate-400 my-4"}/>
                <div className={"flex flex-col lg:flex-row py-4 items-center justify-between"}>
                    <div className={"flex flex-col mr-4"}>
                        <span className={"text-red-700 mr-4"}>Remove System</span>
                        <p className={"text-[12px] lg:text-sm sec-text"}>This will permanently remove mon and unregistered this system from your account.<br/>All the data and logs will be deleted permanently!</p>
                    </div>
                    <Button border={2} type={'button'} onclick={this.handleDelete} fill={true} classList={"danger-btn mt-4 lg:m-0 w-full lg:w-fit"}>
                        Remove
                    </Button>
                </div>
            </div>
        );
    }

}

export default SystemSettings;
