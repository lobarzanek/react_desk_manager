import ReactPaginate from "react-paginate";
import "./table.scss";
import { useState } from "react";

const Table = ({ tableData }) => {
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const rowsPerPage = 9;
  const pagesVisited = pageNumber * rowsPerPage;
  const pageCount = Math.ceil(tableData.length / rowsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  {
    return (
      <div className="tableComponent">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Piętro</th>
              <th>Pokój</th>
              <th>Biurko</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {tableData
              .slice(pagesVisited, pagesVisited + rowsPerPage)
              .map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.floorNumber}</td>
                  <td>{row.roomNumber}</td>
                  <td>{row.deskNumber}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="paginate">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousClassName={"pagination-previous"}
            nextClassName={"pagination-next"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
          />
        </div>
      </div>
    );
  }
};

export default Table;
