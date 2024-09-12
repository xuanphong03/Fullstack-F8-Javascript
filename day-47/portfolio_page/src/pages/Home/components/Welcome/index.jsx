/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import welcome_image from '../../../../assets/images/welcome_image.svg';
import InputField from '../../../../components/InputField';
Welcome.propTypes = {};
console.log(welcome_image);

function Welcome(props) {
  return (
    <section className="flex items-center gap-5">
      <div className="basis-1/2">
        <h1 className="mb-5 text-5xl font-semibold leading-none leading-tight text-gray-900">
          Welcome to my Web <br></br>
          Development Portofolio!
        </h1>
        <p className="mb-4 block font-sans text-xl font-normal leading-relaxed !text-gray-500 text-inherit antialiased md:pr-16 xl:pr-28">
          I'm Lily Smith, a passionate web developer based in USA. Here, you'll
          get a glimpse of my journey in the world of web development, where
          creativity meets functionality.
        </p>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Your email</label>
          <div className="flex h-10 items-center gap-5">
            <div className="h-full w-1/2">
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <button className="h-full rounded-md bg-black px-5 py-1 text-xs font-medium tracking-wide text-white hover:shadow-xl">
              REQUIRE OFFER
            </button>
          </div>
        </div>
      </div>
      <div className="basis-1/2">
        <img
          alt="welcome image"
          src={welcome_image}
          className="h-[576px] w-full rounded-xl object-cover"
        />
      </div>
    </section>
  );
}

export default Welcome;
