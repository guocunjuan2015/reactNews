import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,browserHistory} from 'react-router';
import { Button } from 'antd';
import PCIndex from './components/pc_index';
import PCUserCenter from './components/pc_usercenter';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';
import MobileUserCenter from './components/mobile_usercenter';
import MobileIndex from  './components/mobile_index';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

  //首页
   var Root = React.createClass({

        render(){
            //这里替换了之前的index变成了程序的入口
            return (
                <div>
                      <MediaQuery query='(min-device-width: 1224px)'>
                            <Router history={hashHistory}>
                                <Route path="/" component={PCIndex} ></Route>
                                <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                                <Route path="/usercenter" components={PCUserCenter}></Route>
                            </Router>
                      </MediaQuery>
                      <MediaQuery query='(max-device-width: 1224px)'>
                          <Router>
                                <Route path="/" component={MobileIndex}></Route>
                                <Route path="/usercenter" components={MobileUserCenter}></Route>
                                <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                          </Router>
                      </MediaQuery>
                </div>
            )
        }
   })

ReactDOM.render(<Root/>,document.getElementById('mainContainer'));
export default Root;
