import React from 'react';
import {Row, Col} from 'antd';
   var PCFooter  = React.createClass({

        render(){
              return (
                    <footer>
                          <Row>
                              <Col span = {2}></Col>
                              <Col span={20} className="footer">
                                  &copy;&nbsp;2017 ReactNews Right;
                    					</Col>
                              <Col span = {2}></Col>
                          </Row>
                    </footer>

              )
        }

   })
   export default PCFooter;
