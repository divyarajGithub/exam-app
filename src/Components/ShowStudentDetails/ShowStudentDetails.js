import React, { useEffect, useState } from "react";
import { useFetcher, useParams, useResolvedPath } from "react-router-dom";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import "./ShowStudentDetails.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ShowStudentDetails = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();
  console.log(_id);
  useEffect(() => {
    setLoading(true);
    fetchInitialData();
  }, []);
  const fetchInitialData = () => {
    axios
      .get(
        `https://examination.onrender.com/dashboard/Teachers/viewStudentDetail?id=${_id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("this is the response form the student details", response);
        setStudentDetails([...response.data.data]);
        setLoading(false);
        // console.log("data" , response.data.data[0].name)
        console.log("student details ", studentDetails);
      })
      .catch((error) => {
        console.log("error in product id", error);
        setLoading(false);
      });
  };
  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex" ,justifyContent:'center' , height:'100vh' ,alignItems:'center'}}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ maxWidth: 345, margin: "2rem" }}>
              <CardMedia
                component="img"
                height="100%"
                image="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {studentDetails[0]?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <div>
                    <label>Email : </label>
                    {studentDetails[0]?.email}
                  </div>
                  <div>
                    <label>Id : </label>
                    {studentDetails[0]?._id}
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div>
            <h4 style={{ textAlign: "center" }}>Student Result : </h4>
            <div className="resultDiv">
              {studentDetails[0]?.Result.map((obj) => {
                return (
                  <>
                    <section className="sectionClass">
                      <div>Subject Name :{obj.subjectName}</div>
                      <div>Rank :{obj.rank}</div>
                      <div>Score :{obj.score} </div>
                      <div>Result Status :{obj.resultStatus} </div>
                      <div>
                        <label>Student Answer :</label>
                        <table>
                          <thead>
                            <tr className="tableStyle">
                              <th className="tableStyle">Question no</th>
                              <th className="tableStyle">Question</th>
                              <th className="tableStyle">Answer</th>
                            </tr>
                          </thead>
                          <tbody>
                            {obj?.studentAnswer?.map((question, index) => {
                              return (
                                <tr>
                                  <td className="tableStyle">{index + 1}</td>
                                  <td className="tableStyle">
                                    {question.question}
                                  </td>
                                  <td className="tableStyle">
                                    {question.answer}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowStudentDetails;
