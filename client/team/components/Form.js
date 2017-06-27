import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import components from '../../core/components';
import api from '../../api';
import team from '../../team';
import notify from '../../core/actions/notify';
import validateInput from '../../../server/shared/validations/checkTeam';

const modelApi = api.teams;


class ModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.isUpdating = !!this.props.model;
    const modalFields = { errors: {}, isLoading: false };

    if (this.isUpdating) {
      this.state = { ...this.props.model, ...modalFields };
    } else {
      this.state = { isActive: true, ...modalFields };
    }

    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
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

  onSubmit(team) {
    const { dispatch } = this.props;

    team.preventDefault();
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
           ? <h4>Update Team: {this.state.desc}</h4>
           : <h4>Create New Team</h4>
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
          <Input
            value={this.state.city}
            onChange={this.onChange}
            name="city"
            placeholder="City"
          />
          <br />
          <Input
            value={this.state.logo}
            onChange={this.onChange}
            name="logo"
            placeholder="logo"
          />
          <br />
          <Input
            value={this.state.link}
            onChange={this.onChange}
            name="link"
            placeholder="Link"
          />
          <br />
          <Input
            value={this.state.sponsor}
            onChange={this.onChange}
            name="sponsor"
            placeholder="sponsor"
          />
          <br />  
          is Active?
          <input
            checked={this.state.isActive}
            onChange={this.onChange}
            className="form-control"
            name="isActive"
            type="checkbox"
          />
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

ModelForm.propTypes = {
  closeModalAction : PropTypes.func.isRequired,
  model: PropTypes.object,
};

const mapDispachToProps = (dispatch, props) => {
  return {
    closeModalAction() { dispatch(props.closeModalAction); }
  }
};

export default connect(state => ({
  teams: team.selectors.getAll(state),
}),
  mapDispachToProps,
)(ModelForm);
