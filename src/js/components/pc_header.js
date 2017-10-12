import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router'
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';
const SubMenu = Menu.SubMenu; //导航
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item; //用于页面表单提交

   var PCHeader  = React.createClass({

     //初始化网站的属性
      getInitialState(){
          return {
              current : 'top',
              modelVisible: false, //模态框是否展示
              action:'login',
              hasLogined: false, //是否登录
              userNickName : '',//用户昵称
              userid:0
          }
      },
			componentWillMount(){//页面加载完成之后对userid判断
					if(localStorage.userid !=''){
							this.setState({hasLogined: true});
							this.setState({userNickName : localStorage.NickUserName,userid : localStorage.userid});
					}
			},
      setModelVisible (value){
          this.setState({modelVisible:value});
      },
      handelClick(e){

          if(e.key == "register"){

              this.setState({current: 'register'});
              this.setModelVisible(true);
          } else {

              this.setState({current : e.key});

          }


      },
			callback(e){

					if(key=1){

							this.setState({action : "login"});

					} else if(key = 2){

						 this.setState({action:"register"});

					}

			},
			logout(){
						localStorage.userid = ''; //置空
						localStorage.userNickName = '';//置空
						this.setState({hasLogined:false});//登出的情况

			},
      handleSubmit (e){
      /*  1、  const { getFieldProps } = this.props.form;
        2、  <Input {…getFieldProps(‘userName’)} />//类似给input一个stringName
        3、  this.props.form.getFieldsValue();//获取所有stringName的值
        4、  this.props.form.getFieldValue(‘userName’);//获取单个控件的值*/
        /*fetch(url).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log(data);
        }).catch(function(e) {
          console.log("Oops, error");
        });*/
        //页面开始向API进行提交数据
        e.preventDefault();
        var myFetchOptions = {
			         method: 'GET'
		    };
        var formData= this.props.form.getFieldsValue();
        console.log(JSON.stringify(formData) +"注册信息");
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
				+"&username=" + formData.username + "&password="+formData.password
				+ "&r_userName="+formData.r_userName+"&r_password="+formData.r_password
				+ "&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
        .then(response=>response.json()).then(json=>{
            this.setState({userNickName: json.NickUserName, userid: json.UserId});
						localStorage.userid = json.UserId;
						localStorage.userNickName = json.NickUserName;
        })
        message.success("请求成功！");

        this.setModelVisible(false);
				if(this.state.action == "login"){
					this.setState({hasLogined : true});
				}

      },

        render(){
            let {getFieldDecorator} = this.props.form; //接受页面的参数
            const userShow = this.state.hasLogined ?
            <Menu.Item key="logout" className="register">
                <Button type="primary" htmlType="buttn">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
              <Link target="_blank" to={`/usercenter`}>
                        <Button type="button" htmlType="dashed">个人中心</Button>
                </Link>
                <Button type="ghost" htmlType="dashed" onClick={this.logout}>退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" className="register" onClick={this.setModelVisible}>
                <Icon type="appstore"/>注册/登录
            </Menu.Item>;
              return (
                    <header>
                          <Row>
                              <Col span = {2}></Col>
                              <Col>
                                  <a href="/" className="logo">

                                    <img src="./src/images/logo.png" alt="logo"/>
                                      <span>ReactNews</span>
                                </a>
                              </Col>
                              <Col span={16}>
                    						<Menu mode="horizontal"  selectedKeys={[this.state.current]} onClick={this.handelClick}>
                    							<Menu.Item key="top">
                    								<Icon type="appstore"/>头条
                    							</Menu.Item>
                    							<Menu.Item key="shehui">
                    								<Icon type="appstore"/>社会
                    							</Menu.Item>
                    							<Menu.Item key="guonei">
                    								<Icon type="appstore"/>国内
                    							</Menu.Item>
                    							<Menu.Item key="guoji">
                    								<Icon type="appstore"/>国际
                    							</Menu.Item>
                    							<Menu.Item key="yule">
                    								<Icon type="appstore"/>娱乐
                    							</Menu.Item>
                    							<Menu.Item key="tiyu">
                    								<Icon type="appstore"/>体育
                    							</Menu.Item>
                    							<Menu.Item key="keji">
                    								<Icon type="appstore"/>科技
                    							</Menu.Item>
                    							<Menu.Item key="shishang">
                    								<Icon type="appstore"/>时尚
                    							</Menu.Item>
                                  {userShow}
                    						</Menu>
                                <Modal title="用户中心" WarpClassName="vertical-center-modal" visible={this.state.modelVisible}
                                  onCancel = {() =>this.setModelVisible(false)} onOk={()=>this.setModelVisible(false)} onText="关闭">
                                        <Tabs type="card" onClick={this.callback}>
                                              <TabPane tab="注册" key="2">
                                                  <Form horizontal   onSubmit={this.handleSubmit}>
                                                      <FormItem  label="账户">
                                                            <Input type="text"  {...getFieldDecorator('r_username')}  placeholder="请输入您的账号"  />
                                                      </FormItem>

                                                      <FormItem  label="密码">
                                                          <Input type="password" {...getFieldDecorator('r_password')} placeholder="请输入您的密码"/>
                                                      </FormItem>
                                                      <FormItem label="确认你的密码">
                                                            <Input type="password" {...getFieldDecorator('r_confirmPassword')} placeholder="请确认您的密码" />
                                                      </FormItem>
                                                      <Button type="primary" htmlType="submit">注册</Button>

                                                  </Form>

                                              </TabPane>
																						  <TabPane tab="登录" key="1">
																													<Form horizontal onSubmit={this.handleSubmit}>
																																	<FormItem label="账户">
																																			<Input type="text" placeholder="输入您的账户" {...getFieldDecorator('username')} />
																																	</FormItem>

																																	<FormItem label="密码">
																																			<Input type="password" placeholder="输入您的账户" {...getFieldDecorator('password')} />
																																	</FormItem>

																																		<Button type="primary" htmlType="submit">登录</Button>

																													</Form>
                                              </TabPane>
                                        </Tabs>

                               </Modal>
                    					</Col>
                              <Col span = {2}></Col>
                          </Row>
                    </header>

              )

        }

   })
export default PCHeader = Form.create({})(PCHeader);//用到Form的时候需要二次封装
