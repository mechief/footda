import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFixturesFromDate } from "../../apiFootball/fixtures";
import fixtureSlice from "../../slices/fixtureSlice";

import ScheduleFixtureItem from "./scheduleFixtureItem";

const ScheduleFixture = () => {
  const fixtures = useSelector((state) => state.fixture.fixtures);
  const dispatch = useDispatch();

  useEffect(() => {
    getFixturesFromDate()
      .then((res) => {
        dispatch(fixtureSlice.actions.addFixtures(res));
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  
  return (
    <div>
      { fixtures.map(v => 
        <ScheduleFixtureItem key={v.fixture.id} fixture={v} />
      )}
    </div>   
  );
}

export default ScheduleFixture;