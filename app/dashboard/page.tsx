"use client";
import React, { useEffect } from "react";
import { usePageTitle } from "../context/PageTitleContext";
import StatsCard from "./StatsCard";
import Volunteers from "./Volunteers";

const dashboard = () => {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Dashboard"); // Set the Navbar title when the page loads
  }, []);
  return (
    <div className="flex">
      <main className="flex-grow p-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <StatsCard
            title="Plastic Collected"
            value="230 Tons"
            description="Since 2020"
          />
          <StatsCard
            title="Volunteers"
            value="12,000+"
            description="Active participants"
          />
          <StatsCard
            title="Cleanups Organized"
            value="350+"
            description="In various locations"
          />
        </div>

        <Volunteers />
        {/* Add your dashboard content here */}
      </main>
    </div>
  );
};

export default dashboard;
