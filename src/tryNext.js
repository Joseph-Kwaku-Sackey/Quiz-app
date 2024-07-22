// Next btn module

import {
	globalVar,
	nextMoveBtn,
	submitBtn,
	answerStatus,
	answerContainer,
	pseudoAlter,
	inputContainer,
	nextObj,
} from "./global.js";
import {
	input,
	answerView,
	quest,
	globalFunc,
	progressStatusDigit,
	viewQuestSessionStorage,
	isTryQuest,
	isTryQuestObj,
	categoryType,
} from "./main.js";
import { qaData } from "./data-question.js";
import { levelLoader } from "./global.js";

// func to handle clickEvent for try-again and next btn

export const progressAnimation = () => {
	const loadgap = nextObj.completedValue / nextObj.questionCount;
	nextObj.initialLevelLoadEnd += loadgap;
	const scaleValueStart = String(nextObj.initialLevelLoadStart);
	const scaleValueEnd = String(nextObj.initialLevelLoadEnd);
	const animateKeyframe = [
		{ transform: `scaleX(${scaleValueStart}%)` },
		{ transform: `scaleX(${scaleValueEnd}%)` },
	];
	const animateOptions = {
		duration: 1000,
		fill: "forwards",
		easing: "ease-in-out",
	};

	return levelLoader.animate(animateKeyframe, animateOptions);
};

export const nextTryClickHandler = () => {
	input();
	globalVar.answerMode = false;
	nextObj.initialLevelLoadStart = nextObj.initialLevelLoadEnd;
	submitBtn.classList = "btn-container__btn-submit";
	nextMoveBtn.classList = "hidden";
	answerStatus.classList = "hidden";
	globalVar.inputState = null;

	if (
		nextObj.initialLevelLoadEnd === 100 &&
		JSON.parse(sessionStorage.getItem("completed"))
	) {
		answerView();
		progressStatusDigit.innerText = null;
		const viewGradeBtn = document.createElement("button");
		viewGradeBtn.textContent = "View Score";
		viewGradeBtn.classList.add("btn-container__btn-submit");
		viewGradeBtn.style.backgroundColor = "rgba(44, 44, 44)";
		viewGradeBtn.style.color = "rgba(16, 199, 255	)";
		viewGradeBtn.type = "button";
		answerContainer.appendChild(viewGradeBtn);
		answerContainer.style.flexDirection = "column";

		viewGradeBtn.addEventListener("click", () => {
			viewGradeBtn.classList = "hidden";
			levelLoader.classList = "hidden";
			pseudoAlter();
			let initialState = 0;
			const scoreContainer = document.createElement("div");
			const completedScore = document.createElement("p");
			const completedText = document.createElement("p");
			const refreshBtn = document.createElement("button");
			const solutionBtn = document.createElement("button");
			const solutionContainer = document.createElement("div");

			scoreContainer.className = "score-container";
			solutionContainer.className = "solution-container";
			completedScore.style.fontSize = "1.5rem";
			completedScore.style.fontWeight = "bold";
			completedText.style.position = "relative";
			completedText.style.opacity = 0;
			completedText.style.fontSize = ".9rem";
			completedText.style.filter = "brightness(1.5)";
			refreshBtn.classList.add("btn-container__refreshBtn");
			refreshBtn.addEventListener("click", () => {
				sessionStorage.removeItem("score");
				sessionStorage.removeItem("incorrectAnswer");
				sessionStorage.removeItem("quizLevelState");
			});
			solutionBtn.type = "button";
			solutionBtn.textContent = "view solution";
			solutionBtn.classList.add("btn-container__solutionBtn");
			solutionBtn.addEventListener("click", () => {
				let questionNum = 0;

				globalVar.wrongAnswerObj.map((value) => {
					questionNum += 1;
					const solutionQuestion = document.createElement("p");
					const solutionAnswer = document.createElement("p");
					const solutionSubContainer = document.createElement("div");
					solutionSubContainer.className = "solution-subcontainer";
					solutionAnswer.className = "solution-container__answer";
					solutionQuestion.innerText = `${questionNum}.  ${value.question}`;
					solutionAnswer.innerText = value.answer;
					solutionSubContainer.appendChild(solutionQuestion);
					solutionSubContainer.appendChild(solutionAnswer);
					solutionContainer.appendChild(solutionSubContainer);
				});
				answerContainer.appendChild(solutionContainer);

				solutionBtn.style.display = "none";
			});
			scoreContainer.appendChild(completedScore);
			scoreContainer.appendChild(completedText);
			scoreContainer.appendChild(refreshBtn);
			answerContainer.appendChild(scoreContainer);

			if (globalVar.score.total > 70) {
				sessionStorage.removeItem("isTryQuest");
				refreshBtn.style.background =
					"url('/assets/img/next-arrow.svg') no-repeat center";
				refreshBtn.style.rotate = "180deg";
			}

			if (globalVar.score.total !== 100) {
				answerContainer.appendChild(solutionBtn);
			}

			let intervalId = setInterval(() => {
				globalVar.score.total !== 0 ? (initialState += 1) : null;
				if (initialState >= 70 && globalVar.score.total >= 70) {
					completedScore.style.color = "rgb(70,250,70)";
					completedText.style.color = "rgb(70,250,70)";
					completedText.innerText = "Well done!";
				} else {
					completedScore.style.color = "rgb(250,70,70)";
					completedText.style.color = "rgb(250,70,70)";
					completedText.innerText = "try again!";
				}
				completedScore.innerHTML = `${initialState}%`;
				completedScore.animate([{ scale: 1 }, { scale: 2 }, { scale: 1 }], {
					duration: 500,
					fill: "forwards",
					easing: "ease-out",
				});
				completedText.animate(
					[{ top: ".5em" }, { opacity: 0 }, { top: 0 }, { opacity: 1 }],
					{
						duration: 2500,
						fill: "forwards",
						easing: "ease-out",
					}
				);
				refreshBtn.animate(
					[{ opacity: 0 }, { padding: "1.5em 1.3em", opacity: 1 }],
					{
						fill: "forwards",
						duration: 1000,
						delay: 1300,
						easing: "ease-out",
					}
				);
				const soluAnimFunc = (durationValue) => {
					solutionBtn.animate(
						[
							{
								visibility: "hidden",
								opacity: 0,
								position: "relative",
							},
							{
								opacity: 1,
								visibility: "visible",
								marginBottom: "1em",
								position: "relative",
							},
						],
						{
							duration: durationValue,
							delay: 1300,
							easing: "ease-in-out",
							fill: "forwards",
						}
					);
				};
				if (globalVar.score.total === 0) {
					soluAnimFunc(200);
				} else {
					soluAnimFunc(1000);
				}
				if (initialState == Math.floor(globalVar.score.total)) {
					clearInterval(intervalId);
					completedScore.innerText = `${initialState}%`;
				}
			}, 0);
		});
	}
};


let tryVar = JSON.parse(sessionStorage.getItem("tryCurrentQuest")) || 0;
nextMoveBtn.addEventListener("click", () => {
	const unviewed = [];
	const tryAgainQuest = isTryQuestObj;
	let completed = false;

	if (nextObj.initialLevelLoadEnd === 100) {
		completed = true;
		sessionStorage.setItem("completed", JSON.stringify(completed));
	}
	categoryType.map((my) => {
		if (
			unviewed.length < 2 &&
			viewQuestSessionStorage.length > categoryType.length - 1
		) {
			unviewed.push(my);
			sessionStorage.removeItem("viewedQuestions");
		} else if (!viewQuestSessionStorage.includes(my.id)) {
			unviewed.push(my);
		}
	});
	if (tryVar < tryAgainQuest.length - 1) {
		tryVar += 1;
	} else {
		tryVar = 0;
	}

	const randomVar = Math.floor(Math.random() * unviewed.length);
	let currentQuestion =
		tryAgainQuest.length === 5 ? tryAgainQuest[tryVar] : unviewed[randomVar];
	inputContainer.innerHTML = null;
	quest.innerText = currentQuestion.question;
	if (tryAgainQuest.length === 5) {
		tryAgainQuest.map((value, i) => {
			if (value.id === currentQuestion.id) {
				sessionStorage.setItem("tryCurrentQuest", JSON.stringify(i));
			}
		});
	}
	globalFunc(currentQuestion);
	nextTryClickHandler();
	return currentQuestion.answer;
});
// sessionStorage.removeItem("score");
