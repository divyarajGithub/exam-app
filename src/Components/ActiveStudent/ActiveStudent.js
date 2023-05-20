import axios from "axios";
import React, { useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from "react-redux";
import {
  fetchActiveStudentFailure,
  fetchActiveStudentRequest,
  fetchActiveStudentSucess,
} from "../../Redux/ViewActiveStudent/viewActiveStudentAction";
import Header from "../TeacherDashBord/Header";
import { Link } from "react-router-dom";
import "./ActiveStudent.css";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export const ActiveStudent = () => {
  const data = useSelector((state) => state.activeStudentReducer);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 13;
  let pageCount = Math.ceil(data?.data?.data?.data?.length / itemsPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displyedData = data?.data?.data?.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  console.log("active student data", data?.data?.data?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActiveStudentRequest());
    setLoading(true);
    axios
      .get(
        `https://examination.onrender.com/dashboard/Teachers/StudentForExam`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        // console.log("this is response from the active student " , response)
        dispatch(fetchActiveStudentSucess(response));
        setLoading(false);
      })
      .catch((error) => {
        // console.log("something went wrong")
        dispatch(fetchActiveStudentFailure(error));
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        
            <Box sx={{ display: 'flex' , justifyContent:'center' ,alignItems:'center' ,height:'100vh'}}>
              <CircularProgress />
            </Box>
        
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {displyedData?.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{info.name}</td>
                    <td>{info.email}</td>
                    <td>{info.status}</td>
                    <td>
                      <button type="button" className="btn btn-primary" style={{backgroundColor:'#9BA4B5'}}>
                        <Link
                          className="linkColor"
                          to={`/teacherDashBord/activeStudent/showStudentDetail/${info._id}`}
                        >
                          Student Details
                        </Link>
                      </button>
                    </td>
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
