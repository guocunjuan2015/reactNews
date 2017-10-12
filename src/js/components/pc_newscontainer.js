import React from 'react';
import {Row,Carousel,Col} from 'antd';
import {Tabs} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProduct from './pc_product';
const TabPane = Tabs.TabPane;
var PCNewsContainer = React.createClass({

    render (){
      const settings = {
          dots:true,
          infinite:true,
          speed:500,
          slidesToShow:1,
          autoplay:true
      };
          return (
              <div>
                  <Row>
                      <Col span={2}></Col>
                      <Col span={20} className="container">
                        <div className="leftContainer">
                          <div className="carousel">
                              <Carousel {...settings}>
                                  <div><img src="./src/images/carousel_1.jpg" alt=""/></div>
                                  <div><img src="./src/images/carousel_2.jpg" alt=""/></div>
                                  <div><img src="./src/images/carousel_3.jpg" alt=""/></div>
                                  <div><img src="./src/images/carousel_4.jpg" alt=""/></div>
                              </Carousel>
                          </div>

                          <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"/>

                        </div>
                        <Tabs className="tabs_news">
                            <TabPane tab="头条新闻" key="1">
                              <PCNewsBlock count={22} type="top" width="100%" bordered="false" />
                            </TabPane>
                            <TabPane  tab="国际" key="2">
                                <PCNewsBlock count={22} type="guoji" width="100%" bordered="false" />
                            </TabPane>
                        </Tabs>
                        <Tabs className="tabs_product" style={{width:'240px',float : 'left'}}>
                            <TabPane tab="热点产品" key="3">
                                  <PCProduct/>
                            </TabPane>
                        </Tabs>


                        <div>
                              <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="122px"/>
                              <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="126px"/>

                        </div>
                      </Col>
                      <Col span={2}></Col>
                  </Row>


              </div>


          )

    }

});
export default PCNewsContainer;
