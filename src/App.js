import React, { Component } from 'react';
import Profile from "./components/Profile";
import Search from "./components/Search";
import './App.css';

class App extends Component {

  state = {
    showProfile: false,
    error: false,
    profileIno: {}
  }

  searchUser = (query) => {
    fetch(`https://api.github.com/users/${query}`)
      .then(response => {
        if (response.status !== 200) {
          this.setState({ error: true });
          return null;
        }
        this.setState({ error: false });
        return response.json();
      })
      .then(json => {
        if(!this.state.error) {
          this.setState({
            showProfile: true,
            profileIno: json,
            error:false
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });;
  }

  render() {
    const page = this.state.showProfile ? <Profile userData={this.state.profileIno} /> : <Search searchUser = {this.searchUser}  err = {this.state.error} />;

    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
//<Search searchUser = {this.searchUser} />

//<Profile />