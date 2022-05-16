import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchData, filterSuccess } from '../actions/index';
import './MissionList.css';
import LaunchFilter from '../components/LaunchFilter';

let targetId;

class MissionList extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchData } = this.props;

    fetchData();
  }

  handleChange(e) {
    const { filterSuccess } = this.props;
    targetId = e.target.id;
    const filter = e.target.value;
    filterSuccess(filter);
  }

  // eslint-disable-next-line class-methods-use-this
  filterDefine(mission, parameter) {
    let total;
    switch (parameter) {
      case mission.launch_success:
        if (mission.launch_success === false) {
          total = 'No';
        } else if (mission.launch_success === true) {
          total = 'Yes';
        } else {
          total = 'Pending';
        }
        return total;
      case mission.launch_year:
        total = mission.launch_year;
        return total;
      case mission.launch_site.site_name_long:
        total = mission.launch_site.site_name_long;
        return total;
      default:
        total = 'All';
        return total;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  formatDate(date) {
    const currentDate = new Date(date);
    const options = {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    };
    return currentDate.toLocaleDateString('en-us', options);
  }

  render() {
    const { missions } = this.props;
    const { filter } = this.props;
    let total;
    let filtered = [];
    if (filter === 'All') {
      filtered = missions;
    } else {
      filtered = missions.filter(mission => {
        if (targetId === 'sucess') {
          total = this.filterDefine(mission, mission.launch_success);
        } else if (targetId === 'Date') {
          total = this.filterDefine(mission, mission.launch_year);
        } else {
          (
            total = this.filterDefine(mission, mission.launch_site.site_name_long)
          );
        }
        return (
          total === filter
        );
      });
    }
    console.log('+++ DV Mission >>> ', filtered);
    return (
      <div className="launches-div">
        <LaunchFilter
          filter={filter}
          handleChange={this.handleChange}
        />
        <ul className="launches-list">
          {filtered.map(mission => (
            <li key={mission.mission_name} className="launch">
              <div>
                <iframe
                  id="SpaceX Video"
                  align="middle"
                  title="Inline Frame Example"
                  src={`https://www.youtube.com/embed/${mission.links.youtube_id}`}
                />
              </div>
              <Link to={`mission/${mission.flight_number}`}>
                <div className="launch-title">
                  <div>{mission.mission_name}</div>
                  <div>{this.formatDate(mission.launch_date_local)}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  missions: state.launches,
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  filterSuccess: success => dispatch(filterSuccess(success)),
  fetchData: () => dispatch(fetchData()),
});


MissionList.propTypes = {
  fetchData: PropTypes.func,
  filterSuccess: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  missions: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
};

MissionList.defaultProps = {
  fetchData: () => { },
  filterSuccess: () => { },
  missions: {},
  filter: '',
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MissionList);
