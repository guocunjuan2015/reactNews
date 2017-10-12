import React from 'react';
import {Row,Col,BackTop} from 'antd';
import MobileFooter from './mobile_footer';
import MobileHeader from './mobile_header';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import PCFooter from './pc_footer';

var MobileNewsDetails = React.createClass({
    getInitialState(){

        return {

          newsItem:''

        }

    },
    componentDidMount(){

        var myFetchOptions = {

            method:'GET'
        }

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response =>response.json()).then(json=>{

          this.setState({newsItem:json})
          document.title = this.state.newsItem.title;
    })

    },
    createMarkup(){
        return {

            __html : this.state.newsItem.pagecontent


        }
    },
    render(){

        return (
          <div id="mobileDetailsContainer">
                <MobileHeader/>
                <Row>
                  <Col span={24} className="container">
                    <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    <CommonComments uniquekey={this.props.params.uniquekey} />
                    &nbsp;&nbsp;

                  </Col>
                </Row>
                <MobileFooter/>
          </div>
        )
    }
})
export default MobileNewsDetails;
