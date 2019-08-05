import React, { Component } from "react";
import { Button, Input } from 'antd';


class Search extends Component {

    constructor(props){
        super(props);
        const {InputArray} = this.props;
        var start = [];
        InputArray.forEach(item => {
            start.push('');
        });
        this.state = {data: start};

        var start = [];
        InputArray.forEach(item => {
            start.push('');
        });
        this.state = {...this.state, add: start};

        this.renderAdd = this.renderAdd.bind(this);
        this.renderSearch = this.renderSearch.bind(this);
    }

    renderSearch = (InpitStyle, InputArray, OutObj, func) => {

        return <div>
            {InputArray.map((item, i) => <div key={i.toString()+'frr'}><Input
                placeholder={item}
                style={InpitStyle}
                onChange={e => {
                    var a = e.target.value;
                    this.setState(prevState => {
                    let now = prevState.data;
                    now[i] = a;
                    return {data: now} })}}
                value = {this.state.data[i]}/></div>)}
            <Button type="primary"
                style={{width: '300px', height: '41px', marginTop: '10px', fontFamily: 'Comfortaa', fontSize: '20px'}}
                onClick={e => {
                    let Obj = {}
                    for (let i = 0; i < InputArray.length; i++){
                        if(OutObj[i] !== 'chat_name') Obj[OutObj[i]] = this.state.data[i];
                        else Obj[OutObj[i]] = this.state.data[i][0] !== '@' ? ('@' + this.state.data[i]) : this.state.data[i];
                    }
                    func([Obj, 1]);
                }}
            >Поиск</Button>
        </div>
    }

    renderAdd = (InpitStyle, InputArray, OutObj, func) => {

        return <div>
            {InputArray.map((item, i, array) => <div key={i.toString()+'frrq'}><div><Input
                placeholder={item}
                style={InpitStyle}
                onChange={e => {
                    var a = e.target.value;
                    this.setState(prevState => {
                    let now = prevState.add;
                    now[i] = a;
                    return {add: now} })}}
                value = {this.state.add[i]}/></div>
                {array.length - 1 !== i ? <div style={{...InpitStyle, width: 'auto', padding: '7px'}}>или</div> : <div></div>}
                </div>)}
            <Button type="primary"
                style={{width: '300px', height: '41px', marginTop: '10px', fontFamily: 'Comfortaa', fontSize: '20px'}}
                onClick={e => {
                    let Obj = {}
                    for (let i = 0; i < InputArray.length; i++){
                        Obj[OutObj[i]] = this.state.add[i]
                    }
                    func([Obj, 2]);
                }}
            >Добавить</Button>
        </div>
    }

    render() {

        const InpitStyle = {
            margin: '0px 0px 10px 0px',
            width: '300px',
            height: '41px',
            fontFamily: 'Comfortaa',
            fontSize: '20px'
        }

        const divStyle = {
            margin: '0px 10px',
            display: '-webkit-inline-box',
            verticalAlign: 'top',
            width: '320px'
        }
        const { InputArray, OutObj, func } = this.props;
        return (
            <div style={{marginTop: '113px'}}>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <div style={divStyle}>
                        {this.renderSearch(InpitStyle, InputArray, OutObj, func )}
                    </div>
                    <div style={divStyle}>
                        {this.renderAdd(InpitStyle, ['Nick Name', 'Имя', 'Фамилия'], ['id', 'name', 'surname'], func)}
                    </div>
                </div>
                <div style={{left: 0, top: 0, position: "fixed", background: '#0f0f0f', width: '100%', height: '52px', textAlign: 'left'}}>
                    <div style={{fontFamily: 'Times New Roman', fontSize: '32px', color: '#ffffff', textAlign: 'center', position: 'absolute', top: 0, width: window.innerWidth}}>
                        Tel Search
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;