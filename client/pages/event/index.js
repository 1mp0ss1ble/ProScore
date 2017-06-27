import React from 'react';
import { connect } from 'react-redux';
import event from '../../event';
import team from '../../team';
import isEmpty from 'lodash/isEmpty';


 class  List extends React.Component {

componentDidMount() {
  const { dispatch, params } = this.props;
  console.log(params);
  dispatch(event.actions.home.getEvent({ desc: params.desc }));
}

  render(){
    const eventObj = this.props.event;
    const { dispatch } = this.props;
  return (
    <div>
    { eventObj._id && !eventObj.isLoading
      ? <event.components.Table
         obj={eventObj}
         onClickTeam={t =>
           dispatch(team.actions.teamDetails(t)
          )}
         onClickMatch={(match) =>
          dispatch({
            modalType: 'matchDetails',
            type: 'OPEN_MODAL',
            payload: match,
          })}
        />
      : !eventObj._id && eventObj.isLoading
        ? <p>Loading...</p>
        : <p>Not found!</p>
      }
      </div>
     );
  }
}

export default connect(state => ({ event: state.home }))(List)
