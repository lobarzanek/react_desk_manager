import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../components/table/Table";
import LoadingIcon from "../../components/loadingIcon/LoadingIcon";
import { GetUserHistory } from "../../data/restService.js";
import "./history.scss";

const History = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const [isError, SetIsError] = useState(false);

  useEffect(() => {
    const getTableData = async () => {
      SetIsLoading(true);
      try {
        const response = await GetUserHistory();
        if (response.status === 200) {
          setTableData(response.data);
          SetIsLoading(false);
        } else {
          SetIsError(true);
        }
      } catch (error) {
        SetIsError(true);
      }
    };

    getTableData();
  }, []);

  return (
    <div className="history">
      <div className="wrapper">
        {isLoading ? (
          <LoadingIcon error={isError} />
        ) : (
          <Table tableData={tableData} />
        )}
      </div>
    </div>
  );
};

export default History;
