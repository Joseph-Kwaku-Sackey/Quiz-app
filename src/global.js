//Global Variables

//variable of inputState
export const globalVar = {
	inputState: null,
	wrongAnswerId: JSON.parse(sessionStorage.getItem('incorrectAnswer')) || [],
	wrongAnswerObj: [],
	spanState: null,
	answerMode: false,
	answer: null,
	score: {
		total: JSON.parse(sessionStorage.getItem('score')) || 0,
	},
};

//variable for nextBtn func and progressbar animation
const quizState = JSON.parse(sessionStorage.getItem("quizLevelState")) || [0,0];

export const nextObj = {
	initialLevelLoadStart: quizState[0],
	initialLevelLoadEnd: quizState[0],
	questionCount: 5,
	questionCountProgress: quizState[1],
	completedValue: 100,
};

//html element extract -g
export const quizCont = document.querySelector(".quiz-container");
export const inputContainer = document.querySelector(
	".quiz-answer-sub-container__input-container"
);
export const submitBtn = document.querySelector(".btn-container__btn-submit");
export const answerContainer = document.querySelector(
	".quiz-answer-container__btn-container"
);

//html element creation -g
export const answerStatus = document.createElement("img");
export const nextMoveBtn = document.createElement("button");
export const label = document.querySelector(
	".quiz-answer-container__quiz-answer-sub-container"
);

export const levelLoader = document.createElement("div");
levelLoader.classList = "btn-container__level-loader";

//appending html element
answerContainer.appendChild(levelLoader);

//CSS stylesheet
const stylesheet = document.styleSheets[0];

export const pseudoAlter = () => {
	for (let pseudoStyle of stylesheet.cssRules) {
		if (
			pseudoStyle.selectorText ===
			".quiz-answer-container__btn-container::before"
		) {
			pseudoStyle.style.display = "none";
		}
	}
};
