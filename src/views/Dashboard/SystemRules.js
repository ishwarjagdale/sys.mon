import React from "react";
import Button from "../../components/Button";
import {DeleteRule, GetRules, NewRule} from "../../api/api";
import {notify} from "../../components/notifier";

class SystemRules extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resource: '0',
            max: 100
        };

        this.handleOption = this.handleOption.bind(this);
        this.handleLimit = this.handleLimit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleLimit(e) {
        this.setState({max: e.target.value});
    }

    handleOption(e) {
        console.log(typeof e.target.value)
        this.setState({resource: e.target.value});
    }

    handleDelete(e) {
        if(window.confirm("Are you sure?")) {
            DeleteRule(this.props.id, e.target.id).then((res) => {
                if(res.status === 200) {
                    this.setState({rules: res.data})
                    notify("Rule deleted!", 'success');
                } else {
                    notify(`${res.status} Something went wrong`, 'failed');
                }
            })
        }
    }

    handleSubmit(e) {
        e.target.disabled = true;
        if(this.state.resource !== '0') {
            NewRule({
                sys_id: this.props.id,
                resource: this.state.resource,
                max_limit: this.state.max,
                percent: true
            }).then((res) => {
                if(res.status === 200) {
                    this.setState({resource: '0', rules: res.data})
                    notify('Rule added!', 'success');
                }
                else {
                    this.setState({resource: '0'})
                    notify(`${res.status} Something went wrong`, 'failed');
                }
                e.target.disabled = false;
            })
        }
    }

    componentDidMount() {
        GetRules(this.props.id).then((res) => {
            if(res.status === 200) {
                this.setState({rules: res.data});
            }
        })
    }

    render() {
        let fontAws = {
            cpu: ["CPU", "microchip"],
            mem: ["Memory", "memory"],
            disk: ["Disk", "database"]
        }
        return (
            <div className={"flex flex-col lg:flex-row w-full lg:p-4"}>
                {
                    this.state.rules && <>
                    <div className={"flex-1 p-4"}>
                    <span className={"mb-4 font-bold pb-2 border-b flex items-center justify-between w-full"}>
                        Add Rules
                    </span>
                        <div
                            className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between"}>
                            <div className={"flex flex-col mr-4"}>
                                <span className={"sec-text mr-4"}>Resource</span>
                                <p className={"text-[12px] lg:text-sm sec-text"}>Select a resource to restrict</p>
                            </div>
                            <select onInput={this.handleOption} className={"rounded p-2 px-4 outline-0 text-sm"}>
                                <option value={0}>Choose an option</option>
                                {
                                    Object.entries(fontAws).map((k) => {
                                        if (!this.state.rules?.hasOwnProperty(k[0])) {
                                            return <option value={k[0]}>{k[1][0]}</option>
                                        }
                                        return <></>
                                    })
                                }
                            </select>
                        </div>
                        {
                            this.state.resource === '0' ? <></> : <>
                                <div
                                    className={"flex flex-col lg:flex-row text-sm lg:text-[16px] py-4 lg:items-center justify-between"}>
                                    <div className={"flex flex-col mr-4"}>
                                        <span className={"sec-text mr-4"}>Max Limit</span>
                                        <p className={"text-[12px] lg:text-sm sec-text"}>Set the maximum limit
                                            percent</p>
                                    </div>
                                    <div className={"flex items-center"}>
                                        <input onChange={this.handleLimit} type={"range"} min={0} max={100}
                                               defaultValue={this.state.max}/>
                                        <span className={'ml-2 w-[50px] text-center'}>{this.state.max}%</span>
                                    </div>
                                </div>
                                <p className={"sec-text my-2 text-sm"}>* Invalid or inappropriate value may affect the
                                    monitoring. Adding these rules don't affect the systems in any way.</p>
                            </>
                        }
                        <Button onclick={this.handleSubmit} border={0} disable={this.state.resource === '0'}
                                classList={'p-4 py-2 text-sm lg:text-md w-full mt-4 primary-btn'}>
                            Add Rule
                        </Button>
                    </div>
                    <div className={"p-4 flex flex-col flex-1"}>
                    <span className={"mb-4 font-bold pb-2 border-b flex items-center justify-between w-full"}>
                        Available Rules
                    </span>
                        {
                            this.state.rules.length !== 0 ?
                                Object.keys(this.state.rules).map((r) => <div
                                    className={"flex p-4 border rounded items-center justify-between mb-4"} key={r}>
                                    <div className={"flex items-center"}>
                                        <i className={`text-center w-[20px] fas fa-${fontAws[r][1]} mr-2 opacity-60`}/>
                                        <span>{fontAws[r][0]}</span>
                                        <span className={"ml-4 opacity-60 text-sm"}>
                                        at maximum of {this.state.rules[r].max_limit}%
                                    </span>
                                    </div>
                                    <div className={"flex items-center"}>
                                        <i onClick={this.handleDelete} id={r} className={"fas cursor-pointer fa-close text-red-600 mx-4"}/>
                                    </div>
                                </div>)
                                :
                                <></>
                        }
                    </div>
                </>
                }
            </div>
        )
    }

}

export default SystemRules;
