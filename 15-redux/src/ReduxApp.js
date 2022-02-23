import React, { Fragment } from 'react';
import { Dashboard } from "./features/language/Language";
import { Counter } from "./features/counter/Counter";

export default function App() {
  return <Fragment>
    <Dashboard></Dashboard>
    <Counter></Counter>
  </Fragment>
}