import React, { Component } from "react";
import { Button } from 'antd';


class Data extends Component {

    constructor(props){
        super(props);
        this.state = {divState: {}, data: {}};
        this.InputToRender = this.InputToRender.bind(this);
    }

    TimeD = (time) => {
        var date = new Date(time*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var formattedTime = (hours + ':' + minutes.substr(-2) + ' ' +day + "." + month + "." + year)
        console.log(formattedTime)
        return (formattedTime)
    }

    InputToRender = (array) => {
        var data = {}
        var divState = {}
        array.forEach(item => {
            if(!(item.chat in data)){
                let a = {}
                a[item.chat] = false;
                divState = {divState: {...divState.divState, ...a}}
                data[item.chat] = [];
            }
            data[item.chat].push(item);
        });
        this.setState({divState})
        this.setState({data});
    }

    componentDidMount = () => {
        this.InputToRender(this.props.InputArray);
    }


    render() {

        const divStyle = {
            margin: '0px 0px 10px 10px',
            borderRadius: '10px',
            border: '1.25px solid #231F20',
            background: '#fafafa',
            textAlign:'-webkit-left',
            padding: '0px 10px',
            cursor: 'pointer'
        }
        const { func, User } = this.props;

        const a = this.state.data;

        return (
            <div style={{width: window.innerWidth, textAlign: '-webkit-center'}}>
                <div style={{...divStyle, width: '98%', margin: '62px 0px 0px 0px', cursor: 'default'}}>
                    <div style={{width:'100%', textAlign:'left'}}>
                        <div><b>ID: </b>{User.id}</div>
                        <div><b>Username: </b>{User.username}</div>
                        <div><b>Имя: </b>{User.first_name}</div>
                        <div><b>Фамилия: </b>{User.last_surname}</div>
                        <div><b>Телефон: </b>{User.phone}</div>
                        <div><b>Статус: </b>{User.about}</div>
                    </div>
                    <div>
                    {Object.entries(a).map(([index, item]) => {
                        return (
                            <div style={{...divStyle, marginLeft: '30px'}}
                                onClick={(e) => {
                                    var divState = this.state.divState;
                                    divState[index] = !divState[index];
                                    this.setState({divState})
                                }}
                                key={index.toString()+'frqeq'}>
                                <div><b>Имя канала: </b>{index}</div>
                                <div>
                                    {this.state.divState[index] ? <div style={{...divStyle, marginLeft: '30px'}}> {item.map((item, index) => {
                                        return(<div style={{width: '100%', padding: '1px'}}>
                                            <div style={{display: 'inline', verticalAlign: 'top'}}><b>Сообщение {index+1}: &nbsp;</b> </div>
                                            <div style={{display: 'inline', verticalAlign: 'top', position: 'inherit'}}>{item.text}
                                            <div>&nbsp;&nbsp;&nbsp;<small><i>{this.TimeD(item.time)}</i></small></div></div>
                                        </div>)
                                    })}</div> : <div>{[<div><b>Кол-во сообщений: </b>{item.length}</div>]}</div>}
                                </div>
                            </div>)
                        }
                    )}
                    </div>
                </div>

                <div style={{left: 0, top: 0, position: "fixed", background: '#0f0f0f', width: '100%', height: '52px', textAlign: 'left'}}>
                    <Button type="primary"
                        icon='left'
                        style={{margin: '10px 0px 0px 10px', zIndex: 1}}
                       shape="circle"
                        onClick={e => {
                            func(['LOX', 0]);
                        }}
                    ></Button>
                    <Button type="primary"
                        icon='reload'
                        style={{margin: '10px 0px 0px 10px', zIndex: 1}}
                       shape="circle"
                        onClick={e => {
                            func([User, 3]);
                        }}
                    ></Button>
                    <div style={{fontFamily: 'Times New Roman', fontSize: '32px', color: '#ffffff', textAlign: 'center', position: 'absolute', top: 0, width: window.innerWidth}}>
                        Tel Search
                    </div>
                </div>
            </div>
        );
    }
}

export default Data;