import React  from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import {Router, Route, Link, hashHistory} from 'react-router';
import PCNewsContainer from './pc_newscontainer';
 var PCIndex  = React.createClass({

        render(){

              return (

                  <div>
                      <PCHeader>

                      </PCHeader>
                      <PCNewsContainer/>
                      <PCFooter/>
                  </div>


              )

        }


   })

   export default PCIndex;
