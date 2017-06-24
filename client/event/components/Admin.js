import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../core/components';
import event from '../';

// console.log(event);


const ManageEvent = ({ showModal, events }) => {
  return (
    <div>
      <Button
        value="Add"
        type="primary"
        onClick={() => showModal(null)}
      />
      <h4>Events:</h4>
      <ol>
        {events.items.map(e => (
          <li key={e._id}>
            <span className="link" onClick={() => showModal(e)}>
              {e.desc}
            </span>
          </li>))}
      </ol>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showModal(obj) { dispatch(event.actions.showModal(obj)); },
  };
};

export default connect(
  state => ({ events: event.selectors.getAll(state) }),
  mapDispatchToProps,
)(ManageEvent);
