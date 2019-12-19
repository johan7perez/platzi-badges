import React from 'react';

import './styles/BadgeEdit.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import Api from '../api';
import PageLoading from "../components/PageLoading";

class BadgeEdit extends React.Component {

    state = {
        loading : true,
        error : null,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: '',
            twitter: '',
        },
    };

    componentDidMount() {
        this.fetchData().then(() => {
            console.log("Data fetched for update!");
        }).catch((e) => {
            console.log("Error while trying to fetch the data : " + e);
        });
    }

    fetchData = async () =>{
        this.setState({loading : true, error : null});

        try {
            const data = await Api.badges.read(
                this.props.match.params.badgeId
            );

            this.setState({loading : false, form : data});

        }catch (e) {
            this.setState({loading : false, error : e});
        }
    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = async e => {

        e.preventDefault();

        this.setState({
            loading : true,
            error : null
        });

        try{
            await Api.badges.update(this.props.match.params.badgeId, this.state.form);

            this.setState({
                loading : false
            });

            this.props.history.push('/badges');

        }catch (e) {
            this.setState({
                loading : false,
                error : e
            });
        }
    };

    render() {

        if (this.state.loading){
            return <PageLoading />
        }

        return (
            <React.Fragment>
                <div className="BadgeEdit__hero">
                    <img className="img-fluid BadgeEdit__hero-image" src={header} alt="Logo" />
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge
                                firstName={this.state.form.firstName || '- - '}
                                lastName={this.state.form.lastName || '- - '}
                                twitter={this.state.form.twitter || 'TWITTER'}
                                jobTitle={this.state.form.jobTitle || 'JOB TITLE'}
                                email={this.state.form.email || 'EMAIL'}
                                avatarUrl="https://p7.hiclipart.com/preview/184/113/161/user-profile-computer-icons-clip-art-profile-thumbnail.jpg"
                            />
                        </div>

                        <div className="col-6">
                            <h1>Edit Attendant</h1>
                            <BadgeForm
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                formValues={this.state.form}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeEdit;
