import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../TeacherDashBord/Header";
import "./ViewExamDetail.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const ViewExamDetail = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();
  console.log("this is the id from the view exam details", _id);
  const fetchIntialDetails = () => {
    axios
      .get(
        `https://examination.onrender.com/dashboard/Teachers/examDetail?id=${_id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(
          "this is the response from the view exam in details",
          response
        );
        // console.log("this is the question" , response.data.data.questions)
        setExamData([...response.data.data.questions]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error from the view exam details", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    fetchIntialDetails();
  }, []);

 
  return (
    <>
      <Header />
      {loading ? (
        <Box sx={{ display: "flex" , justifyContent:'center' , alignItems:'center',height:'100vh'}}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="containerForViewExam">
          {examData?.map((info, index) => {
            console.log("this is info id" , info)
            return (
              <div className="cardForExamDetails" key={index}>
                <div>
                  {index + 1} : {info.question}
                </div>
                <div>
                  Options :
                  {
                    <ol className="ol">
                      {info.options.map((option , index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ol>
                  }
                </div>
                <div>Answer : {info.answer}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ViewExamDetail;
