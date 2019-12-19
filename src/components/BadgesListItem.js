import React from "react";
import Gravatar from "./Grabatar";

class BadgesListItem extends React.Component {

    render() {
        return (
            <div className="BadgesListItem">
                <Gravatar
                    className="Badge__avatar"
                    email={this.props.badge.email}
                    alt={`${this.props.badge.firstName} ${this.props.badge.lastName}`}/>
                <div>
                    <strong>
                        {this.props.badge.firstName} {this.props.badge.lastName}
                    </strong>
                    <br />@{this.props.badge.twitter}
                    <br />
                    {this.props.badge.jobTitle}
                </div>
            </div>
        );
    }
}

export default BadgesListItem;