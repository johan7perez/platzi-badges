import React from 'react';
import CofLogo from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import {Link} from "react-router-dom";
import DeleteBadgeModal from "../components/DeleteBadgeModal";

function BadgeDetails(props) {

    const data = props.badge;

    return(
        <div>
            <div className="BadgeDetails__hero">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <img src={CofLogo} alt="Conference logo"/>
                        </div>
                        <div className="col-6 BadgeDetails__hero-attendant-name">
                            <h1>{data.firstName} {data.lastName}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Badge firstName={data.firstName}
                               lastName={data.lastName}
                               email={data.email}
                               twitter={data.twitter}
                               jobTitle={data.jobTitle}
                        />
                    </div>
                    <div className="col">
                        <h2>Actions</h2>
                        <div>
                            <div>
                                <Link className="btn btn-primary mb-4 " to={`/badges/${data.id}/Edit`}>
                                    Edit
                                </Link>
                            </div>
                            <div>
                                <button onClick={props.onOpenModal} className="btn btn-danger">Delete</button>
                                <DeleteBadgeModal
                                    isOpen={props.isModalOpen}
                                    onOpen={props.onOpenModal}
                                    onClose={props.onCloseModal}
                                    onDeleteBadge={props.onDeleteBadge}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BadgeDetails;