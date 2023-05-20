import React, { useEffect } from "react";
import StudentHeader from "../StudentHeader/StudentHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllExamFailure,
  fetchAllExamRequest,
  fetchAllExamSucess,
} from "../../Redux/viewAllExam/viewAllExamAction";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link ,useNavigate} from "react-router-dom";

const ViewAllExam = () => {
  const navigate = useNavigate()
  const data = useSelector((state) => state.viewAllExamReducer);
  const [currentPage, setCurrentPage] = useState(0);
  const redirectToLogin = ()=>{
    setTimeout(()=>{
      navigate('/sign-in')
    },200)
  }

  if(data?.data?.data?.statusCode === 401){ 
    redirectToLogin()
  }
  const itemsPerPage = 13;
  let pageCount = Math.ceil(data?.data?.data?.data?.length / itemsPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displyedData = data?.data?.data?.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const dispatch = useDispatch();
  // console.log("view All exam ", data?.data?.data?.data);
  useEffect(() => {
    const fetchIntialDetails = () => {
      dispatch(fetchAllExamRequest());
      axios
        .get(`https://examination.onrender.com/student/studentExam`, {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if(response.data.statusCode === 500){
            navigate('/sign-In')
          }
          // console.log("view exam response " , response.data.data)
          dispatch(fetchAllExamSucess(response));
        })
        .catch((error) => {
          console.log("error in view exam details", error);
          dispatch(fetchAllExamFailure(error));
        });
    };
    
    fetchIntialDetails();
  },[]);

  
  
  return (
    <div>
      <StudentHeader />
      {data?.loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Subject Name</th>
                <th scope="col">Email</th>
                <th scope="col">Notes </th>
                <th scope="col">Give Exam</th>
              </tr>
            </thead>
            <tbody>
              {displyedData?.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{info.subjectName}</td>
                    <td>{info.email}</td>
                    <td>
                      {info.notes.map((note, index) => {
                        return <label key={index}>{`${note} ,`}</label>;
                      })}
                    </td>
                    <td><Link to={`/studentDashBord/viewAllExam/giveExam/${info._id}`}><button className="btn btn-primary">Give Exam</button></Link></td>
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
    </div>
  );
};

export default ViewAllExam;
