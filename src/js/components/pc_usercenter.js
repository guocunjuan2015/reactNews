import React from 'react';
import {Row, Col,Upload,Icon,Modal,Card} from 'antd';
import {Tabs} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
const TabPane =Tabs.TabPane;
   var PCUserCenter  = React.createClass({


       getInitialState (){
          return {
            userCollection : '',
            usercomments :'' ,
            previewVisible : false,
            previewImage : ''
          }

       },
        componentDidMount(){

            var myFetchOptions = {

                method : 'GET'

            };

            //我的收藏
            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid,myFetchOptions).then(response=>response.json()).then(json=>{

                this.setState({userCollection:json});

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

                  <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/{uc.uniquekey}`}> 查看</a>}>

                      <p>{uc.Title}</p>

                  </Card>

            ))
            :'您还没有收藏任何的新闻，快去收藏一些新闻吧。';
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
                      <PCHeader/>
                          <Row>
                              <Col span = {2}></Col>
                              <Col span={20} >
                                  <Tabs>
                                      <TabPane tab="我的收藏列表" key="1">

                                          {userCollectionList}

                                      </TabPane>
                                      <TabPane tab="我的评论列表" key="2">
                                            <Row>

                                                  <Col>
                                                        {usercommentsList}
                                                  </Col>

                                            </Row>
                                      </TabPane>
                                      <TabPane tab="头像设置" key="3">
                                          <Upload {...props}>
                                                <Icon type="plus" className="avatar-uploader-trigger"/>
                                          </Upload>
                                          <Modal visible={this.state.previewVisible} onCancel={this.handelCancel} footer={null}>
                                                <img src={this.state.previewImage} alt="/"/>
                                          </Modal>
                                      </TabPane>
                                  </Tabs>
                    					</Col>
                              <Col span = {2}></Col>
                          </Row>
                        <PCFooter/>
                  </div>
              )
        }
   })
   export default PCUserCenter;
