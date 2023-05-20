import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './GiveExam.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../StudentHeader/StudentHeader';

export const GiveExam = () => {
	const Tonavigate = useNavigate() ;
	const [message , setmessage] = useState("")
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [questions, setQuestions] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0)
	const [successMsg , setSucessMsg]= useState(false);
	const [optionValidation , setOptionValidation] = useState(false)
	const [currentState, SetCurrentState] = useState({
		question: "",
		options: [
			{
				id: "", text: "", isAnswer: false
			},
			{
				id: "", text: "", isAnswer: false
			},
			{
				id: "", text: "", isAnswer: false
			},
			{
				id: "", text: "", isAnswer: false
			}
		],
		answer: ""
	})
	const { id } = useParams();
	console.log("this is id ", id)
	const fetchIntialDetails = async () => {
		const response = await axios.get(`https://examination.onrender.com/student/examPaper?id=${id}`, {
			headers: {
				"access-token": localStorage.getItem("token")
			}
		})
		console.log("response >>>>:", (response.data))
		setLoading(false)
		if (response.data.statusCode === 200) {
			setData([...response.data.data])
			const editedArr = response.data.data.map((item) => {
				return {
					question: item.question,
					options: item.options.map((o, index) => {
						return {
							id: index + 1, text: o, isAnswer: false
						}
					}),
					answer: ''
				}
			})
			console.log("edited arr is here", editedArr)
			setQuestions([...editedArr])

		}
	}
	useEffect(() => {
		SetCurrentState(questions[currentIndex])
	}, [questions])
	useEffect(() => {
		fetchIntialDetails()
		setLoading(true)
	}, [])
	useEffect(() => {
		console.log("currentState", currentState)
	}, [currentState])
	const optionOnChangeHandler = (e) => {
		const newOption = currentState.options.map((item) => {
			if (item.id == e.target.id) {
				return {
					...item, isAnswer: true
				}
			} else {
				return {
					...item, isAnswer: false
				}
			}
		})

		SetCurrentState({
			...currentState,
			options: [...newOption],
			answer: e.target.value
		})
		setOptionValidation(false)

	}
	useEffect(() => {
		console.log("current state in useEffect", currentState)
		questions.splice(currentIndex, 1, currentState)
		console.log("questions", questions)

	}, [currentState])
	const onNextHandler = () => {
		if(currentState.answer === ""){
			// alert("please select the answer")
			setOptionValidation(true)
			return false
		}
		setCurrentIndex(currentIndex + 1)
	}
	const onPreviousHandler = () => {
		setCurrentIndex(currentIndex - 1)
	}
	useEffect(() => {
		SetCurrentState(questions[currentIndex])
	})
	const onExamSubmitHandler = (e) => {
		e.preventDefault();
		console.log("exam is submitted");
		const payload = questions.map((item) => {
			return {
				question: item.question,
				answer: item.answer
			}
		})
		console.log("payload while submitting the data", payload);
		axios.post(`https://examination.onrender.com/student/giveExam?id=${id}`, payload, {
			headers: {
				"access-token": localStorage.getItem("token")
			}
		}).then((response) => {
			console.log("response from the given exam", response.data.statusCode)
			if(response.data.statusCode === 200){
				setmessage(String(response.data.message))
				setSucessMsg(true)
				navigate()
			}
		})

	}
	const navigate = ()=>{
		setTimeout(()=>{
			Tonavigate('/studentDashBord/viewAllExam')
		},2000)
	}

	return (
		<>
		<StudentHeader/>
			{
				loading ? (<Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>) :
					<div className='giveExam__container'>
						<h4 className='giveExam__heading'>Give Exam</h4>
						<div >
							<div>
								Question : {currentState?.question}
							</div>
							Options : {
								currentState?.options?.map((option, index) => {
									return (
										<div key={index}>
											<input type='radio' value={option.text} checked={option.isAnswer} onChange={(e) => optionOnChangeHandler(e)} name={currentState.question} id={index + 1} /><label>{option.text}</label>
										</div>
									)
								})
							}
							<label>Answer : {currentState.answer}</label><br/>
							{optionValidation && <label className='validation__field'>Please select alteast one option</label>}
						</div>
						<div>
							<button onClick={onPreviousHandler} disabled={currentIndex === 0} className='button'>Previous</button>
							<button onClick={onNextHandler} disabled={currentIndex === questions.length - 1} className='button'>Next</button>
						</div>
						<div>
							<button onClick={onExamSubmitHandler} className='button' disabled={currentIndex < 6}>Submit</button>
						</div>
					</div>
			}
			{		
				successMsg && (<div className='message__giveExam'>{message}</div>)
			}
		</>
	)
}
