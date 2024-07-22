// main/parent  module

import { qaData } from "./data-question.js";
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
} from "./global.js";
import { progressAnimation } from "./tryNext.js";

//global variable (This)
export let flowState = 0;

//looping question array
export const qaMap = qaData.map((qa) => {
	return qa;
});

//current question generation
let currentQuestion = qaMap[flowState];

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
		span.id = opt
		inputLabelContainer.className = "input-label-container";
		inputLabel.innerText = opt;
		inputLabel.htmlFor = index;
		inputLabel.className = "input-container__label";
		inputLabelContainer.appendChild(input);
		inputLabelContainer.appendChild(span);
		inputLabelContainer.appendChild(inputLabel);
		inputContainer.appendChild(inputLabelContainer);
		label.appendChild(inputContainer);

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
};
globalFunc(currentQuestion);

//global variable from generated HTMLnode
const inputClass = document.querySelectorAll(".input-container__input");
export const spanEle = document.querySelectorAll(".input-container__input-custom");

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


//clickEvent for submitBtn
submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	if (!globalVar.inputState) {
		submitBtn.classList.add("btn-container__btn-submit-no-selection-anim");
		setTimeout(() => {
			submitBtn.classList.remove("btn-container__btn-submit-no-selection-anim");
			submitBtn.style.backgroundColor = "rgb(140,0,0)";
		}, 200);
	} else {
		progressAnimation();
		const answerStatusHandler = (srcValue, altValue, classStyle) => {
			answerStatus.setAttribute("src", srcValue);
			answerStatus.className = classStyle;
			answerStatus.setAttribute("alt", altValue);
			answerStatus.style.width = "36px";
			nextMoveBtn.textContent = "next";
			nextMoveBtn.className = "btn-container__nextMoveBtn";
			nextMoveBtn.type = "button";
			submitBtn.classList = "hidden";
			answerContainer.appendChild(answerStatus);
			answerContainer.appendChild(nextMoveBtn);
			globalVar.answerMode = true;
		};

		if (globalVar.inputState === globalVar.answer) {
			answerStatusHandler(
				"/assets/img/correctBtn.svg",
				"correct",
				"btn-container__answerResultSym-correct"
			);
			const loadgap = nextObj.completedValue / nextObj.questionCount;
			globalVar.score.total += loadgap;
		} else if (globalVar.inputState !== globalVar.answer) {
			answerStatusHandler(
				"/assets/img/WrongBtn.svg",
				"wrong",
				"btn-container__answerResultSym-wrong"
			);
			
		}
	}
});
