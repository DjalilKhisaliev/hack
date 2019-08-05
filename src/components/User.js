import React, { Component } from "react";
import { Button } from 'antd';


class Search extends Component {

    constructor(props){
        super(props);
    }

    render() {

        const divStyle = {
            margin: '0px 0px 10px 10px',
            borderRadius: '10px',
            border: '1.25px solid #231F20',
            width: '50%',
            background: '#fafafa',
            textAlign:'-webkit-left',
            padding: '10px',
            cursor: 'pointer'
        }
        const { InputArray, getMes, func } = this.props;
        return (
            <div style={{marginTop: '0px'}}>
                <div style={{position:"absolute", width:'100%', textAlign:'-webkit-center', marginTop: '62px'}}>
                    {Object.entries(InputArray).map(([i, item]) => <div key={i.toString()+'frrq'}
                        style={divStyle}
                        onClick={e => {
                            getMes(item);
                        }}>
                        <div><b>ID: </b>{item.id}</div>
                        <div><b>Username: </b>{item.username}</div>
                        <div><b>Фамилия: </b>{item.last_surname}</div>
                        <div><b>Имя: </b>{item.first_name}</div>
                        <div><b>Теелефон: </b>{item.phone}</div>
                        <div><b>Статус: </b>{item.about}</div>
                        <div style={{width: '100%', display: 'flex'}}>
                            <div style={{display: 'inline', verticalAlign: 'top'}}><b>Состаит в: &nbsp;</b></div>
                            <div style={{display: 'inline', verticalAlign: 'top', position: 'inherit'}}>{item.chats.map((item, i) => <div >{item}</div>)}</div>
                        </div>
                    </div>)}
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
                    <div style={{fontFamily: 'Times New Roman', fontSize: '32px', color: '#ffffff', textAlign: 'center', position: 'absolute', top: 0, width: window.innerWidth}}>
                        Tel Search
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;