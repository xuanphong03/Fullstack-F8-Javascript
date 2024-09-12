import React from 'react';
import PropTypes from 'prop-types';
import Welcome from './components/Welcome';
import MyAwesomeClients from './components/MyAwesomeClients';

Home.propTypes = {};

function Home(props) {
  return (
    <div>
      <Welcome />
      <MyAwesomeClients />
    </div>
  );
}

export default Home;
