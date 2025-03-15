import React, { Component } from 'react'
import { dataOrchid } from '../data/ListOfOrchids'
import Orchid from './Orchid/Orchid';
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
