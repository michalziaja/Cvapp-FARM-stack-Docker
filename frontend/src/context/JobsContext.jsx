import React, { createContext, useContext, useState } from 'react';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobsData, setJobsData] = useState([]);

  const updateJobsData = (newData) => {
    setJobsData(newData);
  };

  return (
    <JobsContext.Provider value={{ jobsData, updateJobsData }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
