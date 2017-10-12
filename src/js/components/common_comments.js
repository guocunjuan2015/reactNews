import React from 'react';
import {Row,Col,BackTop,Button,Form,Input,Card,notification} from 'antd';
const FormItem = Form.Item;
var CommonComments = React.createClass({
  getInitialState(){
      return {
          comments:''
      }

  },
  componentDidMount(){

      var myFetchOptions = {

          method :'GET'

      };

      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({comments: json});
		});

  },
  handleSubmit(e){

      e.preventDefault();
      var myFetchOptions = {
        method: 'GET'
      };
      var formdata = this.props.form.getFieldsValue();
      var formdataValue = this.props.form.getFieldValue('remark');
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
        if(formdataValue !=""){
              this.componentDidMount();
        } else {

            alert("评论不能为空");
        }

		})

  },
  addUserCollection(){

      var myFetchOptions = {
          method : 'GET'
      };

      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey,myFetchOptions).then(response=>response.json()).then(json=>{
          //收藏以后进行全局提醒
          notification['success']({message:'收藏提醒',description:'收藏此文章成功'})
      })
  },
  render(){

    let {getFieldProps} = this.props.form;
		const {comments} = this.state;
		const commnetList = comments.length
			? comments.map((comment, index) => (
				<Card key={index} title={comment.UserName} extra={<a href = "#"> 发布于 {comment.datetime} </a>}>
					<p>{comment.Comments}</p>
				</Card>
			))
			: '没有加载到任何评论';
        return (

              <div className="comment">
                  <Row>
                      <Col span={24}>
                          {commnetList}
                          <Form onSubmit={this.handleSubmit}>

                                <FormItem label="您的评论">
                                      <Input type="textarea" placeholder="填写评论" {...getFieldProps('remark',{initialValue:''})}/>
                                </FormItem>

                                <Button type="primary" htmlType="submit">提交评论</Button>
                                &nbsp;&nbsp;
                                <Button type="primary" onClick={this.addUserCollection} htmlType="buttom">收藏该文章</Button>

                          </Form>
                      </Col>
                  </Row>
              </div>
        )
      }
})

export default CommonComments = Form.create({})(CommonComments);
