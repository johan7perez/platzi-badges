import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from "../components/PageError";

import Api from "../api";
import SmallLoader from "../components/SmallLoader";

class Badges extends React.Component {

  state = {
    loading : true,
    error : undefined,
    data : undefined
  };

  componentDidMount() {

    this.fetchData()
        .then(()=>{
          console.log("Data fetched!");
        }).catch(() =>{
          console.log("There was an error while trying to fetch the data!");
    });

    this.intervalId = setInterval(this.fetchData, 5000);
  }

  fetchData = async () => {
    this.setState({
      loading : true,
      error : null
    });

    try {

      const data = await Api.badges.list();

      this.setState({
        loading : false,
        data : data
      });

    }catch (err) {
      this.setState({
        loading : false,
        error : err
      });
    }
  };

  render() {

    if (this.state.loading && this.state.data === undefined){
      return <PageLoading />;
    }

    if (this.state.error){
      return <PageError error={this.state.error}/>
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">
              New Badge
            </Link>
          </div>

          <BadgesList badges={this.state.data} />

          {this.state.loading && <SmallLoader/>}
        </div>
      </React.Fragment>
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

export default Badges;