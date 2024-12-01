import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
const Index = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div className="loading" />}>
        <Outlet />
      </Suspense>
    </React.Fragment>
  );
};
export default Index;
