import React from 'react';
import {Row, Col} from 'antd';
import {Tabs,Card} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
const TabPane =Tabs.TabPane;
   var MobileUserCenter  = React.createClass({
         getInitialState (){
            return {
              userCollection : '',
              usercomments : '',
              previewVisible : false,
              previewImage : ''
            }

         },
         //页面加载完成后
         componentDidMount(){

            var myFetchOptions = {

                method : 'GET'

            };
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid,myFetchOptions).then(response=>response.json()).then(json=>{

                this.setState({userCollection: json});

            });
            //我的评论
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions).then(response=>response.json()).then(json=>{

              this.setState({usercomments : json})
            })

         },
        render(){
                const props = {
                action: 'http://newsapi.gugujiankong.com/handler.ashx',
                headers: {
                  "Access-Control-Allow-Origin":"*"
                },
                listType: 'picture-card',
                defaultFileList:[
                  {
                    uid:-1,
                    name:'xxx.png',
                    state: 'done',
                    url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                  }
                ],
                onPreview: (file)=>{
                  this.setState({previewImage:file.url,previewVisible:true});
                }
              };
              const {userCollection,usercomments} = this.state;
              const userCollectionList = userCollection.length
              ?
              userCollection.map((uc,index)=>(

                    <Card key={index} extra={<a href={`/#/details/${uc.uniquekey}`}> 查看</a>}>
                          {uc.Title}
                    </Card>
              ))
              :'没有更多的数据了'
              const usercommentsList = usercomments.length
              ?
              usercomments.map((comment,index)=>(

                  <Card title={`于${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}> 查看</a>}>
                      {comment.Comments}
                  </Card>

              ))
              :"您还没有发表过任何评论。"
              return (

                  <div>
                      <MobileHeader/>
                          <Row>

                              <Col span={24} >
                                  <Tabs>
                                      <TabPane tab="我的收藏列表" key="1">

                                          <Row>
                                              <Col span={24}>{userCollectionList}</Col>

                                          </Row>


                                      </TabPane>
                                      <TabPane tab="我的评论列表" key="2">
                                          <Row>
                                              <Col span={24}>{usercommentsList}</Col>

                                          </Row>
                                      </TabPane>
                                      <TabPane tab="头像设置" key="3"></TabPane>
                                  </Tabs>
                    					</Col>

                          </Row>
                        <MobileFooter/>
                  </div>
              )
        }

   })
   export default MobileUserCenter;
