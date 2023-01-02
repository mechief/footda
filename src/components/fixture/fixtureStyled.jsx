import React from "react";
import styled from "styled-components";

export const FixtureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  background: #f5f5f5;
`;

export const FixtureInfo = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: #222;
  text-align: center;
`;

export const FixtureSummary = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  position: relative;
  max-width: 1000px;
  margin: 0 auto 40px;
`;

export const FixtureDetailSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
`;

export const FixtureStatusWrapper = styled.div`
  padding-top: 30px;
  font-size: 18px;
  font-weight: 500;
`;

export const FixtureScoreWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 160px;
  margin-left: -80px;
  text-align: center;
  line-height: 42px;
  font-size: 28px;
  font-weight: 700;
  color: #222;
  letter-spacing: 5px;
`;

export const LineupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
`;