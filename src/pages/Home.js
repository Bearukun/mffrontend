import React, { Component } from 'react'
import { observer } from "mobx-react";

const Home = observer(class Home extends Component {

  render() {
    return (
      <div>
        <h2 className="mt-3">Frontpage</h2>
    </div>
    )
  }
})

export default Home;