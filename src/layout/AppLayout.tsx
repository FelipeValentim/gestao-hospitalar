import React from "react";
import Header from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="site">
      <Header />
      <main className="main">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
