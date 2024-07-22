const categoryBtn = document.querySelectorAll("button");

categoryBtn.forEach(btn =>{
  btn.addEventListener("click", (e) => {
		window.location.href = "/src/main.html";
    sessionStorage.removeItem('viewedQuestions')
    sessionStorage.removeItem('completed')
    sessionStorage.removeItem('isTryQuest')
    sessionStorage.removeItem('incorrectAnswer')
    sessionStorage.removeItem('quizLevelState')
     if(btn.textContent === 'General Knowledge'){
       sessionStorage.setItem('categoryType', JSON.stringify(1))
     }else if (btn.textContent === 'Tech'){
       sessionStorage.setItem("categoryType", JSON.stringify(2));
     }
	});
})