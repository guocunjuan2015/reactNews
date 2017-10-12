import React  from 'react';
import {Router, Route, Link, hashHistory} from 'react-router';
import {Card} from 'antd'
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
 var PCNewsImageBlock  = React.createClass({

        getInitialState(){

             return {
                 news:''
             }
       },
       componentWillMount() {
      		var myFetchOptions = {
      			method: 'GET'
      		};
      		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
      	},

        render(){
          const styleImage = {
              display : 'block',
              width : this.props.imageWidth,
              height : '90px'
          }
          const style3 = {
              width: this.props.imageWidth,
              overflow:"hidden",
              textOverflow:'ellipsis',
              whiteSpace:"nowrap",
              fontSize:'12px'

          }
            const {news} = this.state;
            const newsList = news.length
            ?
            news.map((newsItem,index)=>(
              <div key={index} className="imageblock">
                    <Link to={`details/${newsItem.uniquekey}`}>
                          <div className="custom-image">
                              <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s}/>
                          </div>
                          <div className="custom-card">
                                <h3 style={style3}>{newsItem.title}</h3>
                                <p>{newsItem.author_name}</p>
                          </div>
                  </Link>
                </div>
            ))
            :'没有加载到任何新闻'

              return (
                  <div className="topNewsList">

                      <Card title={this.props.cartTitle}  bordered={true}  style={{width:this.props.width}}>

                          {newsList}

                      </Card>


                  </div>
              )

        }


   })

   export default PCNewsImageBlock;
