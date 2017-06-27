
import React from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import News from './News';
import user from '../../user';
import event from '../../event';
import api from '../../api';
// import Teams from '../../teams';
// import Matches from '../../matches';
// import Events from '../../events';
// import EventsList from '../../events/eventsList';
// import resultsTable from '../../events/resultsTable';
// import MatchesTable from '../../matches/MatchesTable';
// import common from '../../common/actions';
// import {FormControl} from 'react-bootstrap';
// const teamQuantity = 3;
/*
function renderContent(props, eventId) {
  const { events, teams, matches, onClickTeam } = props;

  const event = events.find(x => x._id === eventId);


  if (!event || !teams) {
    return (
        <div>
          <News />
        </div>
    );
  }

  return (
    <div>
      {resultsTable(event, teams, matches, onClickTeam)}
      <hr />
      <h3>Matches</h3>
      <h4>Upcoming</h4>
      <MatchesTable
        {...this.props}
				hideDetails
				played={false}
				matches={matches.filter(x=>x.eventId === eventId)}
				onClickMatch={this.onClickMatch}
			/>

			<h4>Played</h4>
			<MatchesTable
				{...this.props}
				hideDetails
				played
				matches={matches.filter(x=>x.eventId === eventId)}
				onClickMatch={this.onClickMatch}
			/>

		</div>
	);
}
*/

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDesc: this.props.params.eventDesc || null,
    };
    this.showEvent = this.showEvent.bind(this);

  }

  componentDidMount() {
    api.events.get({ isActive: true });
  }

  showEvent(_id, text) {
    //hashHistory.push('/'+ text);
    this.setState({ eventId: _id });
    this.props.dispatch(event.actions.home.getEvent(_id))
  }

  render() {
   //const { eventId, eventDesc } = this.state;
    const { dispatch, events } = this.props;
    //console.log(this.props.event);
    return (
      <div>
        { !events.items.length && event.isLoading
          ? <p>Loading...</p>
          : events.items.map( evt => <p key={evt._id}>
            <Link to={`event/${evt.desc}`}>{evt.desc}</Link>
          </p>)
        }
      </div>

    );
  }
}

/*
class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			eventId: this.props.params.eventId || null,
		};
    console.log('user=>',this.props.user);
		this.showEvent = this.showEvent.bind(this);
		this.onClickMatch = this.onClickMatch.bind(this);
		this.renderContent = renderContent.bind(this);
		this.onClickTeam = this.onClickTeam.bind(this);
	}

	onClickTeam(team) {
		const {dispatch} = this.props;
		console.log(common.showModal('team-details')(team));
		dispatch(common.showModal('team-details')(team));
	}

	onClickMatch(data) {
		console.log(data);
	}

  showEvent(id) {
    hashHistory.push('/' + id);
    this.setState({ eventId: id });
	}

  render() {
    const { eventId } = this.state;
    const { loaders } = this.props;

    for (let key in loaders) {
				if(loaders[key]) {
					return <p>Loading...</p>;
				}
      }
  return (
			<div>
				<EventsList showEvent={this.showEvent} defaultValue={eventId} />
				<p></p>
				{this.state.eventId
					? this.renderContent({ onClickTeam: this.onClickTeam, ...this.props }, eventId)
					: <News />
				}
        {this.props.user.items.length}

			</div>
    );
  }
}
*/

export default connect(state => ({
  user: user.selectors.getAll(state),
  event: state.home,
  events: event.selectors.getAll(state),
  active: state.active,
}))(Home);

/*
<h3>Events:</h3>
<Events showOnlyActive />
<h3>Matches:</h3>
<Matches />
*/
