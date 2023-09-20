import React, { Component } from "react";
import CardList from "../components/CardList";
// import { robots } from "./robots";
import SearchBox from '../components/SearchBox';
import "./App.css";
import Scroll from '../components/Scroll';
import ErrorBoundary from "./ErrorBoundary";

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ""
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => this.setState({robots: users}))
  }

  onsearchChange = (event) => {
    this.setState({searchfield: event.target.value});
    // console.log("Tedst" + event.target.value);
  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    // console.log(filteredRobots);
    if (!robots.length) {
      return <h1 className="tc">Loading</h1>
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onsearchChange}/>
          <ErrorBoundary>
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </ErrorBoundary>
        </div>
      );
    }
  }
};

export default App;
