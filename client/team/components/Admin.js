import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../core/components';
import team from '../';

//console.log(event);


const Admin = ({ showModal, teams }) => {
  return (
    <div>
      <Button
        value="Add"
        type="primary"
        onClick={() => showModal(null)}
      />
      <h4>Events:</h4>
      <ol>
        {teams.items.map(e => (
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
    showModal(obj) { dispatch(team.actions.showModal(obj)); },
  };
};

export default connect(
  state => ({ teams: team.selectors.getAll(state) }),
  mapDispatchToProps,
)(Admin);
