import React, { useEffect, useState, useSyncExternalStore } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../TeacherDashBord/Header";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const EditExam = ({ editExamData }) => {
  const navigate = useNavigate()
  const [flag , setFlag] = useState(false)
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    editExamData.subjectName
  );
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [
      { id: 1, text: "", isAnswer: false },
      { id: 2, text: "", isAnswer: false },
      { id: 3, text: "", isAnswer: false },
      { id: 4, text: "", isAnswer: false },
    ],
    answer: null,
  });
  const [notes, setNotes] = useState(editExamData.notes.join(","));
  const dropdown_options = [
    { value: "Electromegnetics theory", label: "Electromegnetics theory" },
    { value: "advanced communications", label: "advanced communications" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Artificial Inteligence", label: "Artificial Inteligence" },
    { value: "Probablity and statistics", label: "Probablity and statistics" },
    { value: "MicorProcessor and MicroController", label: "MicorProcessor and MicroController" },
    { value: "signal and systems", label: "signal and systems" },
    { value: "Computer networks", label: "Computer networks" },
    { value: "Antenna and wavepropogation", label: "Antenna and wavepropogation" },
  ];
  console.log("edit exam data under edit exam component", editExamData);
  const { _id } = useParams();

  useEffect(() => {
    fetchIntialData();
    setLoading(true);
  }, []);
  const fetchIntialData = async () => {
    let response = await axios.get(
      `https://examination.onrender.com/dashboard/Teachers/examDetail?id=${_id}`,
      {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      }
    );
    if(response.data.statusCode === 200) {
      setLoading(false);
      const arr = response.data.data.questions.map((item) => {
        console.log("item in maps", item);
        return {
          question: item.question,
          options: [
            { id: 1, text: item.options[0], isAnswer:  item.options[0] === item.answer},
            { id: 2, text: item.options[1], isAnswer: item.options[1] === item.answer},
            { id: 3, text: item.options[2], isAnswer: item.options[2] === item.answer },
            { id: 4, text: item.options[3], isAnswer: item.options[3] === item.answer },
          ],
          answer: item.answer,
        };
      });
      setQuestions([...arr]);
      //   setCurrentQuestion(questions[currentIndex]);
    }
  };
  useEffect(() => {
    console.log("questions under useEffect", questions);
    setCurrentQuestion(questions[currentIndex]);
  }, [questions]);
  useEffect(() => {
    console.log("current question", currentQuestion);
  }, [currentQuestion]);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex - 1);
    setCurrentQuestion(questions[currentIndex - 1]);
  };
  useEffect(() => {
    // console.log("current question:" , questions[currentIndex].answer :

    questions.splice(currentIndex, 1, currentQuestion);
  }, [currentQuestion, selectedOption]);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
    setCurrentQuestion(questions[currentIndex + 1]);
  };

  const onPatchExamHandler = () => {
    const newQeustionArray = questions.map((item) => {
      return {
        question: item.question,
        answer: item.answer,
        options: item.options.map((item) => item.text),
        answer: item.answer,
      };
    });
    const payload = {
      subjectName: selectedOption,
      questions: newQeustionArray,
      notes: notes?.split(",")
    };
    console.log("payload edit exam", payload);
    axios
      .put(
        `https://examination.onrender.com/dashboard/Teachers/editExam?id=${_id}`,
        payload,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("response from the edit exam", response.data.statusCode);
        if(response.data.statusCode === 200){
          setFlag(true)
          redirectToViewExam()
        }
      });
  };

  const redirectToViewExam = ()=>{
    setTimeout(()=>{
      navigate('/teacherDashBord/viewExam')
    },2000)
  }
  

  return (
    <div>
      <Header />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      ) : (
        <>
          <h4 className="header">Edit Exam</h4>
          <div className="formStyle">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select a subject</option>
              {dropdown_options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <form className="formStyle">
            <div>
              <label>
                Question:
                <input
                  type="text"
                  value={currentQuestion?.question}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      question: e.target.value,
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Options:
                {currentQuestion?.options.map((option) => (
                  <div key={option.id}>
                    <input
                      type="radio"
                      checked={option.isAnswer}
                      onChange={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: currentQuestion?.options?.map((o, index) =>
                            o.id === option.id
                              ? { ...o, isAnswer: true }
                              : { ...o, isAnswer: false }
                          ),
                          answer: option.text,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={option?.text}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: currentQuestion?.options.map((o) =>
                            o.id === option.id
                              ? { ...o, text: e.target.value }
                              : o
                          ),
                        })
                      }
                    />
                  </div>
                ))}
                <label> answer -{currentQuestion?.answer}</label>
              </label>
            </div>
            {/* <button type="submit" onSubmit={handleSubmit}>
          Add question
        </button> */}
            <div>
              <label>Notes</label>
              <br />
              {/* <input type='textArea' placeholder='Enter the notes' value={notes} onChange={(e)=> e.target.value}/> */}
              <textarea
                placeholder="Enter the notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="2"
                cols="20"
              />
            </div>
          </form>
          <div className="buttonDiv">
            <button onClick={handlePrevious} disabled={currentIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
          <div className="buttonDiv">
            <button onClick={onPatchExamHandler}>Update Exam</button>
          </div>
        </>
      )}
      {
        flag && <div className="sucess">Exam Edited Sucessfully</div>
      }
      
    </div>
  );
};
