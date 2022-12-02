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
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;