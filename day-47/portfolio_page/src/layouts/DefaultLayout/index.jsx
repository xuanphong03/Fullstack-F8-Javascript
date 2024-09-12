import React from 'react';
import PropTypes from 'prop-types';

DefaultLayout.propTypes = {};

function DefaultLayout({ children }) {
  return (
    <main className="mt-[72px] bg-white py-8">
      <div className="mx-auto max-w-[1300px]">{children}</div>
    </main>
  );
}

export default DefaultLayout;
