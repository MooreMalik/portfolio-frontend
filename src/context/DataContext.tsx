import React, { createContext, useContext, useState, useEffect } from 'react';

interface DataContextType {
  data: any;
  loading: boolean;
  takingLongTime: boolean;
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [takingLongTime, setTakingLongTime] = useState(false);

  const fetchData = async () => {
    let timer: any;
    try {
      setLoading(true);
      setTakingLongTime(false);
      timer = setTimeout(() => {
        setTakingLongTime(true);
      }, 3000);

      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/data`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      clearTimeout(timer);
      setLoading(false);
      setTakingLongTime(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, takingLongTime, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
