import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import components from '../../core/components';
import api from '../../api';
import team from '../../team';
import match from '../../match';
import event from '../../event';
import notify from '../../core/actions/notify';
import validateInput from '../../../server/shared/validations/checkMatch';

// shorthand
const modelApi = api.matches;

const getRounds = (rounds = 50) => {
  const arr = [];
  for (let i = 1; i <= rounds; i += 1) {
    arr.push({ _id: i, desc: `Round ${i}` });
  }
  return arr;
};

class ModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.isUpdating = !!this.props.model;
    const modalFields = { date: moment(), errors: {}, round: 1, isLoading: false };

    if (this.isUpdating) {
      this.state = { ...this.props.model, ...modalFields };
    } else {
      this.state = { isActive: true, ...modalFields };
    }
    this.handDateleChange = this.handDateleChange.bind(this);
    this.getEventTeams = this.getEventTeams.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(api.events.get());
    dispatch(api.teams.get());
  }


  handDateleChange(date) {
    this.setState({ date: moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY') });
  }

  getEventTeams(eliminateId = null) {
    const teams = this.props.teams.items;

    if (teams.length) {
      const event = this.props.events.items.find(x =>
         x._id === this.state.eventId);

      if (event) {
        return teams.filter(x =>
          event.teams.indexOf(x._id) !== -1
          || x._id !== eliminateId
        );
      }
    }
    return teams;
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors, isLoading: false });
      console.log(errors);


      this.props.dispatch(notify('failed!', 'danger'));
    }
    return isValid;
  }

  onChange(e) {
    let val = e.target.value;

    if (e.target.type === 'checkbox') {
      val = !this.state.isActive;
    }

    if (e.target.name === 'guestId') {
      if (val === this.state.homeId) {
        this.props.dispatch(notify('same team!', 'danger'))
        return this.setState({ isLoading: true });
      }
    }

    this.setState({ isLoading: false, [e.target.name]: val });
  }


  onDelete(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(modelApi.delete(this.state._id))
    .then(() => {
      dispatch(modelApi.get());
      this.props.closeModalAction();
      dispatch(notify('removed!'));
    })
    .catch(err => {
      dispatch(notify(`failed! ${err}`, 'danger'));
    });
  }

  onSubmit(team) {
    const { dispatch } = this.props;

    team.preventDefault();
  //  this.setState({ isLoading: true, errors: {} });
    console.log(this.state);
    //return;

    if (this.isValid()) {
      const requiredApiMethod = this.isUpdating
       ? modelApi.update : modelApi.add;

      dispatch(requiredApiMethod(this.state))
      .then(() => {
        this.setState({ isLoading: false });
        dispatch(modelApi.get());
        this.props.closeModalAction();
        dispatch(notify('success!'));
      })
      .catch((err) => {
        const { errmsg } = err.response.data;
        let error = {};
        if (errmsg && errmsg.indexOf('duplicate') !== -1) {
          error.desc = 'duplicate description';
          // messages.error(error.desc);
        } else {
          // messages.error(err.response.data);
          error = err.response.data;
        }
        dispatch(notify('failed!', 'danger'));
        this.setState({ isLoading: false, errors: error });
      });
    }
  }

  render() {
    const { errors, link } = this.state;
    const { teams, events } = this.props;
    const eventTeams = this.getEventTeams();
    const { ErrorWrapper, Button, Input, Select } = components;
    const youtubeId = link ? link.split('watch?v=')[1] : null;
    console.log(youtubeId);
    return (
      <div>
        {this.isUpdating
           ? <h4>Update Match: {this.state.desc}</h4>
           : <h4>Create New Match</h4>
         }
        <form onSubmit={this.onSubmit}>
          <Select
            onChange={this.onChange}
            name="eventId"
            defaultValue={this.state.eventId}
            items={events.items}
            label={events.isLoading ? 'loading...' : 'select event...'}
          />
          <p />
          {this.state.eventId && eventTeams.length > 0 &&
            <div>
              <Select
                onChange={this.onChange}
                name="homeId"
                defaultValue={this.state.homeId}
                items={eventTeams}
                label={events.isLoading ? 'loading...' : 'select home team'}
              />
              <p />
              <Select
                onChange={this.onChange}
                name={'guestId'}
                defaultValue={this.state.guestId}
                items={eventTeams}
                label={events.isLoading ? 'loading...' : 'select guest team'}
              />
              <p />
              <Select
                onChange={this.onChange}
                defaultValue={this.state.round}
                name="round"
                items={getRounds()}
              />
              <p />
              <ErrorWrapper error={errors.homeScore}>
                <Input
                  name="homeScore"
                  value={this.state.homeScore}
                  placeholder="home score"
                  onChange={this.onChange}
                />
              </ErrorWrapper>
              <ErrorWrapper error={errors.guestScore}>
                <Input
                  name="guestScore"
                  value={this.state.guestScore}
                  placeholder="guest score"
                  onChange={this.onChange}
                />
              </ErrorWrapper>
              <Input
                name="time"
                value={this.state.time}
                defaultValue="10:00"
                placeholder="10:00"
                onChange={this.onChange}
              />
              <ErrorWrapper error={errors.date}>
                <DatePicker
                  ref="date"
                  dateFormat="DD/MM/YYYY"
                  placeholderText="pick a date"
                  selected={moment(this.state.date, 'DD/MM/YYYY')}
                  // selected={this.state.date}
                  onChange={this.handDateleChange}
                />
              </ErrorWrapper>
              <p />
              <Input
                name="link"
                value={this.state.link}
                placeholder="youtube link"
                onChange={this.onChange}
              />
              <p />
            </div>
          }

          <p />
          <Button
            disabled={this.state.isLoading || !this.state.guestId || !this.state.homeId}
            value="save"
            type="primary"
          />
          {this.isUpdating &&
            <Button
              value="delete"
              type="danger"
              onClick={this.onDelete}
              disabled={this.state.isLoading}
            />
          }
        </form>
        <div>
          {this.state.link && (
            <div>
              <hr />
              <h4>Video</h4>
              <iframe
                width="auto"
                height="315"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                frameBorder="0"
                allowFullScreen
              >
              </iframe>
            </div>
          )}
        </div>
      </div>
    );
  }

}

ModelForm.propTypes = {
  closeModalAction: PropTypes.func.isRequired,
  model: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapDispachToProps = (dispatch, props) => {
  return {
    closeModalAction() { dispatch(props.closeModalAction); }
  }
};

export default connect(state => ({
  teams: team.selectors.getAll(state),
  events: event.selectors.getAll(state),
}),
  mapDispachToProps,
)(ModelForm);
