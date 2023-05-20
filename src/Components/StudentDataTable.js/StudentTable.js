import React, { useEffect } from "react";
import { useState } from "react";
import "./Pagination.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Header from "../TeacherDashBord/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
const StudentTable = () => {
  console.log("student table is called");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayFlag, setDisplayFlag] = useState(false);
  const itemsPerPage = 15;
  let pageCount = Math.ceil(studentList?.length / itemsPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displyedData = studentList?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const fetchIntialData = () => {
    setLoading(true);
    axios
      .get("https://examination.onrender.com/dashboard/Teachers", {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("response from the student data table" , response)
        console.log(response.data.statusCode)
        if(response.data.statusCode===500 || response.data.statusCode === 401){
            navigate('/sign-In')
        }
        setStudentList([...response.data.data]);
        setDisplayFlag(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchIntialData();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <Box sx={{ display: "flex" , justifyContent:'center' , height:'100vh',alignItems:"center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <table
            style={{ marginTop: "1rem", padding: "0.5rem" }}
            className="table"
          >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {displyedData?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
          />
        </div>
      )}
    </>
  );
};

export default StudentTable;
