import React, { Component } from 'react';
import TimeSlot from './time_slot';

const BASE_URL = '/api/v1';

class Restaurant extends Component {
  constructor() {
    super();
    this.state = {
      timeSlotsToday: [],
    };
  }

  componentDidMount() {
    const { restaurant } = this.props;
    const start = new Date().setHours(0, 0, 0, 0);
    const end = new Date().setHours(23, 59, 59, 999);
    fetch(`${BASE_URL}/restaurants/${restaurant.id}/time_slots?start=${start}&end=${end}`)
      .then(response => response.json())
      .then(data => this.setState({ timeSlotsToday: data }));
  }

  render() {
    const { timeSlotsToday } = this.state;
    return (
      <div className="restaurant-container">
        <h1>{this.props.restaurant.name}</h1>
        {timeSlotsToday.map(timeSlot => <TimeSlot key={timeSlot.id} timeSlot={timeSlot} />)}
      </div>
    );
  }
}
export default Restaurant;
