import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="site">
      {/* <Header /> */}
      <main className="main">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
