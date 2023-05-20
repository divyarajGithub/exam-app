import React, { useState, useEffect } from "react";
import Header from "../TeacherDashBord/Header";
import "./CreateExam.css";
import axios from "axios";
import { convertLength } from "@mui/material/styles/cssUtils";

export function CreateExamFinal() {
	const [flag, setFlag] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState("");
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
	const [notes, setNotes] = useState("");


	const [validation, setValidation] = useState({
		questionValidation: false,
		optionValidation: [false, false, false, false],
		notesValidation: false,
		optionCheckValidation: false
	})


	const dropdown_options = [
		{ value: "Electromegnetics theory", label: "Electromegnetics theory" },
		{ value: "advanced communications", label: "advanced communications" },
		{ value: "Blockchain", label: "Blockchain" },
		{ value: "Artificial Inteligence", label: "Artificial Inteligence" },
		{ value: "Probablity and statistics", label: "Probablity and statistics" },
		{
			value: "MicorProcessor and MicroController",
			label: "MicorProcessor and MicroController",
		},
		{ value: "signal and systems", label: "signal and systems" },
		{ value: "Computer networks", label: "Computer networks" },
		{
			value: "Antenna and wavepropogation",
			label: "Antenna and wavepropogation",
		},
	];
	const validate = (currentQuestion) => {
		if (currentQuestion.question === '') {
			// alert("please enter the question")
			setValidation({
				...validation,
				questionValidation: false
			})
			return false
		}
		// if(currentQuestion.options){
		//   let bool=currentQuestion.options.every((item)=>item.isAnswer === false)
		//   let boolTow = currentQuestion.options.some((item)=> item.text === '')
		//   if(boolTow){
		//     alert("please Enter the option")
		//     return false
		//   }
		//   if(bool){
		//     alert("please select the answer")
		//     return false
		//   }

		// }
		// return true


	}
	const questionValidationFun = (e) => {
		// console.log('currentQuestion', currentQuestion.question)
		console.log("e", e)
		if (e.target.value === "") {
			setValidation({
				...validation,
				questionValidation: true
			})
		} else {
			setValidation({
				...validation,
				questionValidation: false
			})
		}
	}
	const optionValidationnew = (e, index) => {
		console.log("e in option", e, index);
		if (e.target.value === "") {
			const newArray = validation.optionValidation
			newArray[index] = true
			setValidation({
				...validation,
				optionValidation: newArray
			})
		} else {
			const newArray = validation.optionValidation
			newArray[index] = false
			setValidation({
				...validation,
				optionValidation: newArray
			})

		}
	}
	const radioValidation = (e) => {
		if (e.target.value === "") {
			setValidation({
				...validation,
				optionCheckValidation: true
			})
		} else {
			setValidation({
				...validation,
				optionCheckValidation: false
			})
		}
	}


	const [emptyState, setEmptyState] = useState(false)
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('handlesubmit', currentQuestion)
		console.log('validation', validation)
		// validateToAdd()	
		if (sucessSub()) {
			setEmptyState(true)
			return false
		} else {
			setEmptyState(false)
		}
		// checkAllValidationForSubmit()
		setQuestions([...questions, currentQuestion]);
		setCurrentQuestion({
			question: "",
			options: [
				{ id: 1, text: "", isAnswer: false },
				{ id: 2, text: "", isAnswer: false },
				{ id: 3, text: "", isAnswer: false },
				{ id: 4, text: "", isAnswer: false },
			],
			answer: null,
		});
		setCurrentIndex(currentIndex + 1);
	};

	const handlePrevious = () => {
		setCurrentIndex(currentIndex - 1);
		setCurrentQuestion(questions[currentIndex - 1]);
	};
	useEffect(() => {
		questions.splice(currentIndex, 1, currentQuestion);
	}, [currentQuestion, selectedOption]);

	const handleNext = () => {
		setCurrentIndex(currentIndex + 1);
		setCurrentQuestion(questions[currentIndex + 1]);
	};
	const createExamHandler = () => {
		console.log("create Exam handler is called");
		if (notes.length === 0) {
			alert("please enter the notes")
			return false;
		}
		const notesArray = notes.split(",");
		console.log(notesArray);

		const arr = questions.map((item) => {
			return {
				question: item.question,
				answer: item.answer,
				options: item.options.map((option) => option.text),
			};
		});
		arr.pop();
		const lastPayload = {
			subjectName: selectedOption,
			questions: arr,
			notes: notesArray,
		};
		console.log("last payload is ", lastPayload);
		axios
			.post(
				"https://examination.onrender.com/dashboard/Teachers/Exam",
				lastPayload,
				{
					headers: {
						"access-token": localStorage.getItem("token"),
					},
				}
			)
			.then((response) => {
				console.log(
					"this is response from the axios create exam request",
					response
				);
				if (response.data.statusCode === 200) {
					setFlag(true);
				}
			})
			.catch((error) => {
				console.log(
					"this is the error from the create exam request axios post reqeuest",
					error
				);
			});
	};
	useEffect(() => {
		console.log("qeustion under useEffect", questions);
	}, [questions]);

	const checkAllValidationForSubmit = () => {
		let questionValidation = validation.questionValidation
		let optionsValidation = validation.optionValidation.every((option) => {
			return option === false
		})
		let optionCheck = validation.optionCheckValidation
		if (questionValidation === false && optionsValidation === true && optionCheck === false) {
			return false
		} else {
			return true
		}
	}

	const validateToAdd = () => {
		if (currentQuestion.question === "") {
			setValidation({
				...validation,
				questionValidation: true
			})
			// return false
		} else {
			setValidation({
				...validation,
				questionValidation: false
			})
		}

		if (currentQuestion.options[0].text === "") {
			const newArr = [...currentQuestion.options]
			newArr[0] = true
			setValidation({
				...validation,
				optionValidation: newArr
			})
			// return false
		} else {
			const newArr = [...currentQuestion.options]
			newArr[0] = false
			setValidation({
				...validation,
				optionValidation: newArr
			})
		}

		if (currentQuestion.options[1].text === "") {
			const newArr = [...currentQuestion.options]
			newArr[1] = true
			setValidation({
				...validation,
				optionValidation: newArr
			})
			// return false
		} else {
			const newArr = [...currentQuestion.options]
			newArr[1] = false
			setValidation({
				...validation,
				optionValidation: newArr
			})

		}

		if (currentQuestion.options[2].text === "") {
			const newArr = [...currentQuestion.options]
			newArr[2] = true
			setValidation({
				...validation,
				optionValidation: newArr
			})
			// return false
		} else {
			const newArr = [...currentQuestion.options]
			newArr[2] = false
			setValidation({
				...validation,
				optionValidation: newArr
			})
		}

		if (currentQuestion.answer === null) {
			setValidation({
				...validation,
				optionCheckValidation: true
			})
		} else {
			setValidation({
				...validation,
				optionCheckValidation: false
			})
		}

		if (currentQuestion.options[3].text === "") {
			const newArr = [...currentQuestion.options]
			newArr[3] = true
			setValidation({
				...validation,
				optionValidation: newArr
			})
			// return false
		} else {
			const newArr = [...currentQuestion.options]
			newArr[3] = false
			setValidation({
				...validation,
				optionValidation: newArr
			})
		}
	}

	const sucessSub = () => {
		// let questionValidation = validation.questionValidation
		// let optionsValidation = validation.optionValidation.every((option) => {
		// 	return option === false
		// })
		// let optionCheck = validation.optionCheckValidation
		// if (questionValidation === false && optionsValidation === true && optionCheck === false) {
		// 	return false
		// } else {
		// 	return true
		// }
		if (currentQuestion.question === "") {
			return true
		}
		const checkarr = currentQuestion.options.some((option) => {
			return option.text === ""
		})
		if (checkarr) {
			return true
		}
		if (currentQuestion.answer === null) {
			return true
		}
		return false
	}
	useEffect(() => {
		if (sucessSub) {
			setEmptyState(false)
		} else {
			setEmptyState(true)
		}
	}, [currentIndex])

	return (
		<>
			<div>
				<Header />
				<h4 className="header">Create Exam</h4>
				<div style={{ backgroundColor: '#F1F6F9' }} className="outerContainer">
					<div className="formStyle">
						<select
							value={selectedOption}
							onChange={(e) => setSelectedOption(e.target.value)}
							disabled={selectedOption === "" ? false : true}
						>
							<option value="">Select a subject</option>
							{dropdown_options.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
					<form onSubmit={handleSubmit} className="formStyle">
						<div className="questionDiv">
							<label>
								Question:
								<input
									type="text"
									value={currentQuestion.question}
									onChange={(e) => {
										setCurrentQuestion({
											...currentQuestion,
											question: e.target.value,
										})
										questionValidationFun(e)
									}
									}
									className="questionInput" /><br />
								{validation.questionValidation && <span className="validation__field">Please Enter the question</span>}
							</label>
						</div>
						<div>
							<label>
								Options:
								{currentQuestion.options.map((option, idx) => (
									<div key={option.id}>
										<input
											type="radio"
											checked={option.isAnswer}
											onChange={(e) => {
												setCurrentQuestion({
													...currentQuestion,
													options: currentQuestion.options.map((o, index) =>
														o.id === option.id
															? { ...o, isAnswer: true }
															: { ...o, isAnswer: false }
													),
													answer: option.text,
												})
												radioValidation(e)
											}
											}
										/>
										<input
											type="text"
											value={option.text}
											onChange={(e) => {
												setCurrentQuestion({
													...currentQuestion,
													options: currentQuestion.options.map((o) =>
														o.id === option.id ? { ...o, text: e.target.value } : o
													),
												})
												optionValidationnew(e, idx)
											}
											}
											className="optionInput" /><br />
										{console.log("idx in jsx>>>", idx, validation.optionValidation[idx])}
										{validation.optionValidation[idx] && <span className="validation__field">Please Enter the option </span>}
									</div>
								))}
								{validation.optionCheckValidation && <span className="validation__field">Please select any one option for answer</span>}
								<label className="answerBox"> answer : {currentQuestion.answer}</label>
							</label>
						</div>
						{
							emptyState && <span>Enter all options</span>
						}
						<button type="submit" onSubmit={handleSubmit} className="button" >
							Add question
						</button>
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
								className="notesArea"
							/>
						</div>
					</form>
					<div className="buttonDiv">
						<button onClick={handlePrevious} disabled={currentIndex === 0} className="button">
							Previous
						</button>
						<button
							onClick={handleNext}
							disabled={currentIndex === questions.length - 1}
							className="button"
						>
							Next
						</button>
					</div>
					<div className="buttonDiv">
						<button onClick={createExamHandler} className="button">Create Exam</button>
					</div>
				</div>
			</div>
			{
				flag && <div className="success">Exam created successfully</div>
			}
		</>
	);
}
export default CreateExamFinal;
