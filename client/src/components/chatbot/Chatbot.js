import React, { Component } from 'react';
import axios from 'axios/index';
import {withRouter} from 'react-router-dom';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import Option from './Option';
import QuickReplies from './QuickReplies';

var cookies = new Cookies();


class Chatbot extends Component {
    messagesEnd;
    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
         this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.state = {
            messages: [],
            showBot:false,
            stockWelcomesent:false
        };
        if(cookies.get('userID')=== undefined)
        {
        cookies.set('userID',uuidv4(),{path:'/'});
    }
    console.log(cookies.get('userID'));
}
    async df_text_query (queryText) {
        let says = {
            speaks: 'me',
            msg: {
                text : {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query',  {text:queryText,userID: cookies.get('userID')});
        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]});
        }
    };
    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query',  {event:eventName,userID: cookies.get('userID')});
        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]});
        }
    };


    componentDidMount() {
        this.df_event_query('welcome');

        if(window.location.pathname==='/explore/stocks' && !this.state.stockWelcomesent){
            this.df_event_query('WELCOME_STOCKS');
            this.setState({stockWelcomesent:false,showBot:true})
        }

        this.props.history.listen(() =>{
            console.log('listening');
            if(this.props.history.location.pathname==='/explore/stocks' && !this.state.stockWelcomesent)
            {
                this.df_event_query('WELCOME_STOCKS');
            this.setState({stockWelcomesent:false,showBot:true})
            }
    });
}

    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({behaviour: "smooth"});

    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: true});
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: false});
    }

    _handleQuickReplyPayload(event,payload,text){
        event.preventDefault();
        event.stopPropagation();
        switch (payload) {
            case 'recommended_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;
            default:
                this.df_text_query(text);
                break;
        }    
    }

    renderOptions(options){
        return options.map((option,i) => <Option key ={i} payload={option.structValue}/>);
    }

    renderOneMessage(message,i){
        if(message.msg && message.msg.text && message.msg.text.text){
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        }
        else if(message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.options){
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow:'hidden'}}> 
                    <div className="col s2">
                    <img src="https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots.jpg" className="btn-floating btn-large waves-effect waves-light" alt="https://bitsofco.de/content/images/2018/12/broken-1.png"/>
                    
                    </div>
                    <div style={{overflow:'auto',overflowY:'scroll'}}>
                        <div style={{height:300,width:message.msg.payload.fields.options.listValue.values.length * 270}}>
                            {this.renderOptions(message.msg.payload.fields.options.listValue.values)}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        }else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.fields &&
            message.msg.payload.fields.quick_replies) {
             
            return <QuickReplies
                text={message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.fields.quick_replies.listValue.values}/>;
        }
    }
    

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message,i);
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e){
        if(e.key==='Enter'){
            this.df_text_query(e.target.value);
            e.target.value='';
        }
    }
    render() {
 
        if(this.state.showBot){
        return (

            <div className="popup" style={{height: 500, width: 400, position: 'absolute',bottom: 0,right:0,border: '2px solid lightgrey'}}>
                <nav style={{backgroundColor:'black'}} >
                    <div className="nav-wrapper">
                    <h3 className="brand-logo" style={{paddingLeft:'20%',paddingTop:'3%'}}>Investor Chatbot</h3>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#/" onClick={this.hide}>close</a></li>
                    </ul>
                    </div>
                </nav>
                <div id="chatbot" style={{height: 388, width: '100%', overflow: 'auto'}}>
                    {this.renderMessages(this.state.messages)}
                    <div ref = {(el) => {this.messagesEnd = el;}}
                    style={{float:'left',clear:'both'}}>

                    </div>
                </div>
                <div className="col s12">
                <input style={{margin: 0 ,paddingLeft:'1%',paddingRight:'1%',width:'98%'}} placeholder="type a message" type="text" onKeyPress={this._handleInputKeyPress}/>
                </div>
            </div>
        );
    } else
    {
        return (

            <div className="popup" style={{height: 40, width: 400, position: 'absolute',bottom: 0,right:0,border: '2px solid lightgrey'}}>
                <nav style={{backgroundColor:'black'}} >
                    <div className="nav-wrapper">
                    <h3 className="brand-logo" style={{paddingLeft:'20%',paddingTop:'3%'}}>Investor Chatbot</h3>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#/" onClick={this.show}>show</a></li>
                    </ul> 
                    </div>
                </nav>
                <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div>
                
                </div>
            );
    }
}
}
export default withRouter(Chatbot);