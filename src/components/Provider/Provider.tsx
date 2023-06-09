"use client";

import ProgressBar from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <ProgressBar
        height="4px"
        color="#FF6663"
        options={{ showSpinner: true }}
        shallowRouting
        appDirectory
      />
    </div>
  );
};

export default Providers;
