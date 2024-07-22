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
import { input, answerView, qaMap, quest, globalFunc, spanEle } from "./main.js";
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

const nextTryClickHandler = () => {
	input();
	globalVar.answerMode = false;
	nextObj.initialLevelLoadStart = nextObj.initialLevelLoadEnd;
	submitBtn.classList = "btn-container__btn-submit";
	nextMoveBtn.classList = "hidden";
	answerStatus.classList = "hidden";
	globalVar.inputState = null;

	if (nextObj.initialLevelLoadEnd === 100) {
		answerView();
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
			const completedScore = document.createElement("p");
			const completedText = document.createElement("p");
			const refreshBtn = document.createElement("button");
			completedScore.style.fontFamily = "cursive";
			completedScore.style.fontSize = "1.3rem";
			completedScore.style.fontWeight = "bold";
			completedText.style.position = "relative";
			completedText.style.opacity = 0;
			completedText.style.fontFamily = "fontCus";
			completedText.style.filter = "brightness(1.5)";
			refreshBtn.classList.add("btn-container__refreshBtn");
			answerContainer.appendChild(completedScore);
			answerContainer.appendChild(completedText);
			answerContainer.appendChild(refreshBtn);

			let intervalId = setInterval(() => {
				globalVar.score.total !== 0 ? (initialState += 1) : null;
				if (initialState >= 70) {
					completedScore.style.color = "rgb(0,220,0)";
				} else {
					completedScore.style.color = "rgb(230,0,0)";
				}
				completedScore.innerHTML = `${initialState}%`;
				completedScore.animate([{ scale: 1 }, { scale: 2.5 }, { scale: 1 }], {
					duration: 500,
					fill: "forwards",
					easing: "ease-out",
				});
				completedText.animate(
					[{ top: ".5em" }, { opacity: 0 }, { top: 0 }, { opacity: 1 }],
					{
						duration: 1000,
						fill: "forwards",
						easing: "ease-out",
					}
				);
				refreshBtn.animate([{ opacity: 0 }, { opacity: 1 }], {
					fill: "forwards",
					duration: 1000,
					delay: 1000,
					easing: "ease-out",
				});
				if (initialState == Math.floor(globalVar.score.total)) {
					clearInterval(intervalId);
					completedScore.innerText = `${initialState}%`;
					if (globalVar.score.total >= 70) {
						completedText.style.color = "green";
						completedText.fontStyle = "italic";
						completedText.innerText = "Well done!";
					} else {
						completedText.style.color = "red";
						completedText.innerText = "Try again!";
					}
				}
			}, 0);
		});
	}
};

let tryIt = 0;
//clickEvent for try-again and next btn.
export const func = () => {
	nextMoveBtn.addEventListener("click", () => {
		tryIt == qaData.length - 1 ? (tryIt = 0) : (tryIt += 1);
		let currentQuestion = qaMap[tryIt];
		inputContainer.innerHTML = null;
		quest.innerText = currentQuestion.question;
		globalFunc(currentQuestion);
		nextTryClickHandler();
		return currentQuestion.answer;
	});
};
func();
