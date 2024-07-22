// main/parent  module

import { qaData } from "./data-question.js";
import { qaDataGenK } from "./data-question-genK.js";
import {
	globalVar,
	nextMoveBtn,
	label,
	submitBtn,
	answerStatus,
	answerContainer,
	quizCont,
	inputContainer,
	nextObj,
	levelLoader,
} from "./global.js";
import { nextTryClickHandler, progressAnimation } from "./tryNext.js";

//global variable (This)
let viewedCurrentQuest = [];
let viewedQuest = [];
let isTryAgainQuest = [];
export let isTryQuestObj = [];
let wrongAnswer;

//getting viewQuestions in sessionStorage
export const viewQuestSessionStorage =
	JSON.parse(sessionStorage.getItem("viewedQuestions")) || [];
viewedQuest = viewQuestSessionStorage;
const quizState = JSON.parse(sessionStorage.getItem("quizLevelState")) || [
	0, 0,
];
export const isTryQuest =
	JSON.parse(sessionStorage.getItem("isTryQuest")) || [];
isTryAgainQuest = isTryQuest;

// html dom  extraction
const main = document.querySelector('main');
window.addEventListener('load', ()=>{
	setTimeout(()=>{
		main.style.visibility = 'visible'
	}, 100)
})

levelLoader.style.transform = `scaleX(${quizState[0]}%)`;

//looping question array
const cat = JSON.parse(sessionStorage.getItem("categoryType") || 0);
const unviewed = [];
export let categoryType =
	cat === 1 ? qaDataGenK : cat === 2 ? qaData : qaData;

const unviewedLoad = (catType) => {
	catType.map((my) => {
		if (!viewQuestSessionStorage.includes(my.id)) {
			unviewed.push(my);
		}
	});
};
unviewedLoad(categoryType);
categoryType.map((value) => {
	isTryAgainQuest.map((val) => {
		// console.log(val);
		if (val === value.id) {
			isTryQuestObj.push(value);
		}
	});
});
const randomQuestion = Math.floor(Math.random() * unviewed.length);
const randomTryQuestion =
	JSON.parse(sessionStorage.getItem("tryCurrentQuest")) || 0;
export const currentQuestion =
	isTryAgainQuest.length === 5
		? isTryQuestObj[randomTryQuestion]
		: unviewed[randomQuestion];

//question display
export const quest = document.querySelector(
	".quiz-question-container__quiz-question"
);
quest.innerText = currentQuestion.question;

export const globalFunc = (data) => {
	data.options.forEach((opt, index) => {
		globalVar.answer = data.answer;
		const input = document.createElement("input");
		const inputLabel = document.createElement("label");
		const span = document.createElement("span");
		const inputLabelContainer = document.createElement("div");
		input.type = "radio";
		input.id = index;
		input.value = opt;
		input.name = "animals";
		input.className = "input-container__input";
		span.className = "input-container__input-custom";
		span.id = opt;
		inputLabelContainer.className = "input-label-container";
		inputLabel.innerText = opt;
		inputLabel.htmlFor = index;
		inputLabel.className = "input-container__label";
		inputLabelContainer.appendChild(input);
		inputLabelContainer.appendChild(span);
		inputLabelContainer.appendChild(inputLabel);
		inputContainer.appendChild(inputLabelContainer);
		label.appendChild(inputContainer);

		viewedCurrentQuest.push(data.id);
		wrongAnswer = data.id;

		//clickEvent for radio and label
		span.addEventListener("click", () => {
			if (!globalVar.answerMode) {
				input.checked = true;
				globalVar.inputState = input.value;
				submitBtn.style.backgroundColor = "rgb(120, 110, 0";
			}
		});
		inputLabel.addEventListener("click", () => {
			if (!globalVar.answerMode) {
				input.checked = true;
				globalVar.inputState = input.value;
				submitBtn.style.backgroundColor = "rgb(120, 110, 0";
			} else {
				inputLabel.htmlFor = null;
			}
		});
	});

	if (globalVar.wrongAnswerId.length) {
		categoryType.map((val) => {
			globalVar.wrongAnswerId.map((wrongVal) => {
				if (wrongVal === val.id) {
					if (!globalVar.wrongAnswerObj.includes(val)) {
						globalVar.wrongAnswerObj.push(val);
					}
				}
			});
		});
	}
};
globalFunc(currentQuestion);

// backBtn eventListener
const backBtn = document.querySelector(".back-arrow-container__btn ");
backBtn.addEventListener("click", ()=>{
	window.location.href = '/index.html'
	backBtn.style.display = "none"
})

// progress status digit
export const progressStatusDigit = document.createElement("p");
progressStatusDigit.className = "progress-status-digit";
progressStatusDigit.innerText = `${quizState[1]} / 5`;
answerContainer.appendChild(progressStatusDigit);

//global variable from generated HTMLnode
const inputClass = document.querySelectorAll(".input-container__input");
export const spanEle = document.querySelectorAll(
	".input-container__input-custom"
);

//func for other module
export const input = () => {
	inputClass.forEach((input) => {
		return (input.checked = false);
	});
};
export const answerView = () => {
	quizCont.style.width = "370px";
	quizCont.style.gap = "0";
	inputContainer.classList = "hidden";
	quest.style.display = "none";
	submitBtn.classList = "hidden";
};
//viewScore Page display
nextTryClickHandler();

//clickEvent for submitBtn
submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	console.log(viewedCurrentQuest);
	unviewedLoad(categoryType);
	if (!globalVar.inputState) {
		submitBtn.classList.add("btn-container__btn-submit-no-selection-anim");
		setTimeout(() => {
			submitBtn.classList.remove("btn-container__btn-submit-no-selection-anim");
			submitBtn.style.backgroundColor = "rgb(140,0,0)";
		}, 200);
	} else {
		progressAnimation();
		if (isTryAgainQuest.length < 5) {
			isTryAgainQuest.push(viewedCurrentQuest[0]);
			sessionStorage.setItem("isTryQuest", JSON.stringify(isTryAgainQuest));
		}

		if (nextObj.questionCountProgress !== nextObj.questionCount) {
			nextObj.questionCountProgress += 1;
		}
		progressStatusDigit.innerText = `${nextObj.questionCountProgress} / 5`;

		if (nextObj.initialLevelLoadEnd <= 100) {
			sessionStorage.setItem(
				"quizLevelState",
				JSON.stringify([
					nextObj.initialLevelLoadEnd,
					nextObj.questionCountProgress,
				])
			);
		}
		//setting viewedQuestions
		console.log(viewedCurrentQuest);
		viewedQuest.push(viewedCurrentQuest[0]);
		viewedCurrentQuest = [];
		sessionStorage.setItem("viewedQuestions", JSON.stringify(viewedQuest));
		// sessionStorage.removeItem("viewedQuestions")
		const answerStatusHandler = (srcValue, altValue, classStyle) => {
			answerStatus.setAttribute("src", srcValue);
			answerStatus.className = classStyle;
			answerStatus.setAttribute("alt", altValue);
			nextMoveBtn.textContent = "next";
			nextMoveBtn.className = "btn-container__nextMoveBtn";
			nextMoveBtn.type = "button";
			submitBtn.classList = "hidden";
			answerContainer.appendChild(answerStatus);
			answerContainer.appendChild(nextMoveBtn);
			globalVar.answerMode = true;
			answerStatus.animate(
				[{ width: 0 }, { width: "55px" }, { width: "35px" }],
				{
					duration: 550,
					fill: "forwards",
					easing: "ease-in-out",
				}
			);
		};

		if (globalVar.inputState === globalVar.answer) {
			answerStatusHandler(
				"/assets/img/correctBtn.svg",
				"correct",
				"btn-container__answerResultSym-correct"
			);

			const loadgap = nextObj.completedValue / nextObj.questionCount;
			globalVar.score.total += loadgap;
			sessionStorage.setItem("score", JSON.stringify(globalVar.score.total));
		} else if (globalVar.inputState !== globalVar.answer) {
			answerStatusHandler(
				"/assets/img/WrongBtn.svg",
				"wrong",
				"btn-container__answerResultSym-wrong"
			);
			globalVar.wrongAnswerId.push(wrongAnswer);
			sessionStorage.setItem(
				"incorrectAnswer",
				JSON.stringify(globalVar.wrongAnswerId)
			);
		}
	}
});
