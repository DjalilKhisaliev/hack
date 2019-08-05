import React, { Component } from "react";
import { message } from 'antd';
import Search from "./Search"
import User from "./User"
import axios from 'axios'
import Data from'./Data'
import WebFont from 'webfontloader';

const testMode = 0;

import 'antd/dist/antd.css';

import '../styles/App.css';

WebFont.load({
    google: {
      families: ['Comfortaa', 'cursive']
    }
  });

class App extends Component {

    constructor(props){
        super(props);
        this.state = {page: 0, users: [], messanges: [], user: {}, msg: {}};
        this.handlerClick = this.handlerClick.bind(this);
        this.mesSearch = this.mesSearch.bind(this);
    }

    componentDidMount = () => {
        message.config({
            top: 62,
            duration: 2,
            maxCount: 1,
          });
    }

    handlerClick([item, count], i){
        if(JSON.stringify(item) === "{}"){
            message.error('Введите данные хотя бы в одно поле', 3)
            return;
        }
        if(i === 0){
            if(count === 1){
                let msg = message.loading('Загрузка данных', 0);
                if(testMode === 0){
                    console.log('Search Obj:', item)
                    axios.post('185.203.118.3:1338/users', {...item})
                        .then(response => {
                            console.log(response.data);
                            msg();
                            message.success('Данные загружены', 3);
                            this.setState({users: response.data, page: 1});
                        })
                        .catch(error => {
                            msg();
                            message.error('Ошибка загрузки', 3);
                            console.log(error)
                        });
                }
                else{
                    let users = []
                    for(let i = 0; i < 20; i++){
                        users.push({
                            user:{
                                id: '@deddfsd' + i.toString(),
                                name: "Хуйло",
                                surname: "Кузнецов",
                                lastcomment: "Путин Лох"
                        }})
                    }
                    msg();
                    message.success('Данные загружены', 3);
                    this.setState({users, page: 1})
                }
            }
            if(count === 2){
                if(testMode === 0){
                    console.log('Add Obj:', item)
                    axios.post('/s', {...item})
                        .then(response => {message.success('Ползователь добавлен всписок поиска')})
                        .catch(error => {console.log(error); message.error('Не получилось добавить пользователя')});
                }
            }

        }
        if(i === 1) this.setState({page: 0});

        if(i === 2){
            if(count === 3) this.mesSearch(item);
            else this.setState({page: 1});
        }
    }

    mesSearch(id){
        console.log(id.chats)
        let msg = message.loading('Загрузка данных, примерное время ожидания '+ ((id.chats.length / 2).toFixed(1)).toString() + ' мин.', 0);
        if(testMode === 0){
            axios.post('185.203.118.3:1338/messages', {id: id.id})
                .then(response => {
                    console.log(response.data);
                    msg();
                    message.success('Данные загружены', 3);
                    this.setState({messanges: response.data.data, page: 2, user: id})
                })
                .catch(error => {
                    msg();
                    message.error('Ошибка загрузки', 3);
                    console.log(error)
                });
        }
        else{
            let messanges = []
            for(let i = 0; i < 20; i++){
                messanges.push({
                    messange:{
                        id: id.id,
                        chanelName: "Путин ЛОХ",
                        chanelID: "ЛОХ" + (i % 4).toString(),
                        text: "Лох"
                }})
            }
            msg();
            message.success('Данные загружены', 3);
            this.setState({messanges, page: 2, user: id})
        }
    }


    render() {
        return (
            <div style={{position: 'absolute', width: '100%', textAlign: 'center', fontFamily: 'Comfortaa', fontSize: '20px'}}>
                {this.state.page === 0 ?
                    <Search InputArray={['Nick Name', 'Имя', 'Фамилия', 'Телефон', 'ID', 'Статус', 'Название чата']} OutObj={['username', 'first_name', 'last_surname', 'phone', 'id', 'about', 'chat_name']} func={(item) => {this.handlerClick(item, 0)}}></Search> : <div/>}
                {this.state.page === 1 ?
                    <User InputArray={this.state.users} getMes={this.mesSearch} func={(item) => {this.handlerClick(item, 1)}}></User> : <div/>}
                {this.state.page === 2 ?
                    <Data InputArray={this.state.messanges} User={this.state.user} func={(item) => {this.handlerClick(item, 2)}}></Data> : <div/>}  
            </div>
        );
    }
}

export default App;