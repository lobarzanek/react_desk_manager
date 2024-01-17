import React, { useState, useEffect } from "react";
import Table from "../../components/table/Table";
import { GetUserHistory } from "../../data/restService.js";

import "./history.scss";

const History = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getTableData = async () => {
      try {
        const response = await GetUserHistory();
        if (response.status === 200) {
          console.log(response.data);
          setTableData(response.data);
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    getTableData();
  }, []);

  return (
    <div className="history">
      <div className="wrapper">
        <Table tableData={tableData} />
      </div>
    </div>
  );
};

export default History;
