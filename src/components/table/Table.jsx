import ReactPaginate from "react-paginate";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./table.scss";
import errorImg from "../../assets/images/cross.png";
import { DeleteDeskReservation } from "../../data/restService.js";

const Table = ({ tableData }) => {
  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const rowsPerPage = 9;
  const pagesVisited = pageNumber * rowsPerPage;
  const pageCount = Math.ceil(tableData.length / rowsPerPage);

  const isDayBeforeToday = (date) => {
    const today = Date.now();
    const inputDate = new Date(date);

    return inputDate > today;
  };

  const handleDeleteReservation = async (id) => {
    try {
      const response = await toast.promise(DeleteDeskReservation(id), {
        pending: "Usuwanie rezerwacji..",
        success: "Rezerwacja usunięta! 👌",
        error: "Nie udało się usunąć rezerwacji.",
      });
    } catch {}
  };

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
              <th>Anuluj</th>
            </tr>
          </thead>
          <tbody>
            {tableData
              .slice(pagesVisited, pagesVisited + rowsPerPage)
              .map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.floorName}</td>
                  <td>{row.roomName}</td>
                  <td>{row.deskName}</td>
                  <td>{row.date.slice(0, 10)}</td>
                  <td>
                    {isDayBeforeToday(row.date.slice(0, 10)) ? (
                      <img
                        onClick={() => handleDeleteReservation(row.id)}
                        className="deleteBtn"
                        src={errorImg}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </td>
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
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
};

export default Table;
