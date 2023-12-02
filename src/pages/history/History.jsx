import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../components/table/Table";

import "./history.scss";

const History = () => {
  const userId = 1;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getTableData = async () => {
      try {
        await axios
          .get(`http://localhost:8000/history?userId=${userId}`)
          .then((response) => {
            if (response.statusText === "OK") {
              setTableData(response.data.slice(0).reverse());
            }
          });
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
