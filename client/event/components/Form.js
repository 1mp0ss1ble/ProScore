import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import components from '../../core/components';
import api from '../../api';
import event from '../../event';
import team from '../../team';
import notify from '../../core/actions/notify';
import validateInput from '../../../server/shared/validations/checkEvent';

//shorthand
const modelApi = api.events;

function renderTeams() {
  return (
    <div>
      <select ref="teamToAdd">
        {this.getNewTeams().map(team =>
          <option key={team._id} value={team._id}>
            {team.desc}
          </option>
        )}
      </select>
      <button
        onClick={(e) => {
          e.preventDefault();
            this.handleTeams(true, this.refs.teamToAdd)
          }}
        className="btn btn-default"
      >
        add
      </button>
      <p></p>
      <select ref="teamToRemove">
        {this.state.teams.map(id =>
           <option key={id} value={id}>
           {this.props.teams.items.find(team => team._id === id).desc}
           </option>
        )}
      </select>
      <button
        onClick={(e) => {
          e.preventDefault();
          this.handleTeams(false, this.refs.teamToRemove)
          }}
        className="btn btn-default"
      >
        remove
      </button>

    </div>
  );
}


class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.isUpdating = !!this.props.model;
    const modalFields = { errors: {}, isLoading: false };

    if (this.isUpdating) {
      this.state = { ...this.props.model, ...modalFields };
    } else {
      this.state = { isActive: true, ...modalFields };
    }
    console.log(this.state);
    this.getNewTeams = this.getNewTeams.bind(this);
    this.handleTeams = this.handleTeams.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.renderTeams = renderTeams.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(api.teams.get());
  }

  getNewTeams(){
    const teams = this.props.teams.items;
    return teams.filter(team =>
       this.state.teams.indexOf(team._id) === -1
  )}


  handleTeams(isAdding, e) {
		//e.preventDefault();
    const id = e.value;
    if (!id) {
      return;
    }

    const teams = [].slice.call(this.state.teams) || [];
    console.log(teams);
    if (isAdding) {
      teams.push(id);
    } else {
      teams.splice(teams.indexOf(id), 1);
    }

    this.setState({ teams });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors, isLoading: false });
      this.props.dispatch(notify('failed!', 'danger'));
    }
    return isValid;
  }

  onChange(e) {
    let val = e.target.value;

    if (e.target.type === 'checkbox') {
      val = !this.state.isActive;
    }
    this.setState({ [e.target.name]: val });
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

  onSubmit(event) {
    const { dispatch } = this.props;

    event.preventDefault();
    this.setState({ isLoading: true, errors: {} });

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
    const { errors } = this.state;
    const { ErrorWrapper, Button, Input } = components;
    return (
      <div>
        {this.isUpdating
           ? <h4>Update Event: {this.state.desc}</h4>
           : <h4>Create New Event</h4>
         }
        <form onSubmit={this.onSubmit}>
          <ErrorWrapper error={errors.desc}>
            <Input
              value={this.state.desc}
              onChange={this.onChange}
              name="desc"
              placeholder="Description"
            />
          </ErrorWrapper>
          <ErrorWrapper error={errors.info}>
            <Input
              value={this.state.info}
              onChange={this.onChange}
              name="info"
              placeholder="Info"
            />
          </ErrorWrapper>
          is Active?
          <input
            checked={this.state.isActive}
            onChange={this.onChange}
            className="form-control"
            name="isActive"
            type="checkbox"
          />
          {this.isUpdating && this.renderTeams()
          }
          <Button
            disabled={this.state.isLoading}
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
      </div>
    );
  }

}

EventForm.propTypes = {
  closeModalAction : PropTypes.func.isRequired,
  model: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapDispachToProps = (dispatch, props) => {
  return {
    closeModalAction() { dispatch(props.closeModalAction); }
  }
};

export default connect(state => ({
  events: event.selectors.getAll(state),
  teams: team.selectors.getAll(state),
}),
  mapDispachToProps,
)(EventForm);
