import React, { Component } from 'react'

export default class Search extends Component {

    state = {
        value: ""
    }

    onClick = (e) => { this.props.searchUser(this.state.value); }
    onChange = (e) => { this.setState({ value: e.target.value }) }

    render() {

        let error = this.props.err ? <h3> User Not Found! </h3> : "";

        return (
            <div>
                <div className="Background">
                    <div>
                        <img className="GitIcon" src="github-logo.svg" />
                        <h1> Search your GitProfile </h1>
                        <input className="SearchBar" type="text" value={this.state.value} onChange={this.onChange} />
                        <button className="SearchButton" onClick={this.onClick}> Search </button>
                        {error}
                    </div>            
                </div>
            </div>
        )
    }
}
