import React from 'react';

import './styles/BadgeDetails.css';

import PageLoading from "../components/PageLoading";

import PageError from "../components/PageError";

import Api from "../api";
import BadgeDetails from "./BadgeDetails";

class BadgeDetailsContainer extends React.Component{

    state = {
        loading : true,
        error : null,
        data : undefined,
        isModalOpen : false
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {

        this.setState({loading : true, error : null});

        try {
            const data = await Api.badges.read(this.props.match.params.badgeId);

            this.setState({loading : false, data : data, error : null});
        }catch (e) {
            this.setState({loading : false, error : e});
        }

    };

    handleOpenModal = () => {
        this.setState({isModalOpen : true});
    };

    handleCloseModal = () => {
        this.setState({isModalOpen : false});
    };

    handleBadgeDelete = async () =>{
        this.setState({loading : true, error : null});

        try {
            await Api.badges.remove(this.props.match.params.badgeId);

            this.props.history.push('/badges');

        }catch (e) {
            this.setState({loading : true, error : e});
        }
    };

    render() {

        if (this.state.loading){
            return <PageLoading/>
        }

        if (this.state.error){
            return <PageError error={this.state.error}/>
        }

        return(
            <BadgeDetails
                badge={this.state.data}
                isModalOpen={this.state.isModalOpen}
                onOpenModal={this.handleOpenModal}
                onCloseModal={this.handleCloseModal}
                onDeleteBadge={this.handleBadgeDelete}/>
        );
    }
}

export default BadgeDetailsContainer;