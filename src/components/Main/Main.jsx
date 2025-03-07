import React, { Component } from 'react'
import { dataOrchid } from '../../Share/ListOfOrchids'
import Orchid from '../pages/Orchid/Orchid';
export class Main extends Component {
    constructor() {
        super();
        this.state = {
           orchids: dataOrchid
        };
     }
  render() {
    return <Orchid orchids={this.state.orchids}/>
  }
}
export default Main
