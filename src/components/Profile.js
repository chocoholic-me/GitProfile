import React, { Component } from 'react';
import Repository from './Repository';
import uuid from 'uuid';

export default class Profile extends Component {

    state = {
        gotRepos: false,
        repos: []
    }

    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.userData.login}/repos?sort=updated`)
        .then(res => res.json())
        .then(data => this.setState({  gotRepos: true, repos: data }));
    }

    formatDate = ( date) => {
        const month = date.getMonth();
        const day = date.getUTCDate();
        const year = date.getFullYear();
        let date_str = "Joined ";

        switch(month){
            case 0:
                date_str += "January ";
                break;
            case 1:
                date_str += "February ";
                break;
            case 2:
                date_str += "March ";
                break;
            case 3:
                date_str += "April ";
                break;
            case 4:
                date_str += "May ";
                break;
            case 5:
                date_str += "June ";
                break;
            case 6:
                date_str += "July ";
                break;
            case 7:
                date_str += "August ";
                break;
            case 8:
                date_str += "September ";
                break;
            case 9:
                date_str += "October ";
                break;
            case 10:
                date_str += "November ";
                break;
            case 11:
                date_str += "December ";
                break;
        }

        date_str += day;

        if(day == 1) date_str += "st, ";
        else if( day == 2 ) date_str += "nd, ";
        else if ( day == 3 ) date_str += "rd, ";
        else date_str += "th, ";

        date_str += year;

        return date_str;

    }

    render() {
        let userData = this.props.userData;
        let location = userData.location;
        let followers = userData.followers;
        let following = userData.following;
        let repos = userData.public_repos;
        let profileLink = "https://github.com/" + userData.login;
        let name = userData.name;
        let username = userData.login;
        let avatar = userData.avatar_url;
        let joined = new Date(userData.created_at);
        let join_date = this.formatDate(joined);
        let repo_all;

        if( this.state.gotRepos == true ) repo_all = this.state.repos.map(repository => <Repository key={uuid.v4()} repositoryData={repository} />);

        return (
            <div className="ProfileBackground">
                <div className="Profile">
                    <div className="ProfilePic" style={{  background: `url(${avatar})`, backgroundSize: 'cover'}}>
                    </div>
                    <div className="BasicInfo">
                        <h3>{name}</h3>
                        <a className="ProfileLink" href={profileLink}>@{username}</a>
                        <div className="LocationInfo">
                            <img className="LocationIcon" src="location.svg" />
                            <span className="Country">{location}</span>
                            <img className="CalenderIcon" src="calendar.svg" />
                            <span className="JoiningDate">{join_date}</span>
                        </div>
                    </div>
                    <div className="MoreInfo">
                        <div className="InfoBox">
                            <span className="Value">{repos}</span>
                            <span className="Property">REPOSITORIES</span>
                        </div>
                        <div className="InfoBox">
                            <span className="Value">{followers}</span>
                            <span className="Property">FOLLOWERS</span>
                        </div>
                        <div className="InfoBox">
                            <span className="Value">{following}</span>
                            <span className="Property">FOLLOWING</span>
                        </div>
                    </div>
                </div>
                <div className="RepoContainer">
                    {repo_all}
                </div>
            </div>
        )
    }
}
