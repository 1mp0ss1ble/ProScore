import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import event from '../';

class EventsList extends React.Component {

  render() {
    const { events, defaultValue } = this.props;

    return (
      <select
        defaultValue={defaultValue}
        onChange={(e) => { this.props.showEvent(e.target.value); }}
      >
        <option value="">Select an event</option>
        { events.items.length &&
          events.items.filter(x => x.isActive).map(evt => (
            <option key={evt._id} value={evt._id} >
              {evt.desc}
            </option>
          ))
      }
      </select>
    );
  }
}


EventsList.propTypes = {
  showEvent: PropTypes.func.isRequired,
//  events: PropTypes.array,
  defaultValue: PropTypes.string,
};

export default connect(state => ({
  events: event.selectors.getAll(state),
}))(EventsList);
