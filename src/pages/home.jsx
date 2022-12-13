import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRoundFixtures } from "../apiFootball/fixtures";
import fixtureSlice from "../slices/fixtureSlice";

import ScheduleFixture from "../components/schedule/scheduleFixture";

const Home = () => {
  const fixtures = useSelector((state) => state.fixture.fixtures);
  const dispatch = useDispatch();

  useEffect(() => {
    getRoundFixtures()
      .then((res) => {
        dispatch(fixtureSlice.actions.addFixtures(res));
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      {fixtures.map(v => <ScheduleFixture key={v.fixture.id} fixture={v} />)}
    </>
  );
}

export default Home;