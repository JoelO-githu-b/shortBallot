const questionnaireButton = document.getElementById("questionnaire-button")
const questionnaireContainers = document.querySelectorAll(".questionnaire-question-container")
const submit_button_q1 = document.getElementById('submit_button_q1')

var registered_to_vote
var eligible_age

questionnaireButton.addEventListener('click', () => {
    questionnaireButton.classList.add("hidden")
    questionnaireButton.disabled = true

   // questionnaireContainers.forEach(container => container.classList.remove('hidden'));
    questionnaireContainers[0].classList.remove('hidden');
});
function get_registered_value() {
  const selectedRadio = document.querySelector('input[name="q1_bool"]:checked');
  if (selectedRadio) {
    const value = selectedRadio.value;
    switch (value) {
        case "yes":
            registered_to_vote = true
            questionnaireContainers[0].classList.add('hidden')
            questionnaireContainers[2].classList.remove('hidden')
            break;
        case "no":
            registered_to_vote = false
            questionnaireContainers[0].classList.add('hidden')
            questionnaireContainers[1].classList.remove('hidden')
            break;
    }

    
    
  }
}
function get_eligible_age() {
  const selectedRadio = document.querySelector('input[name="q2_bool"]:checked');
  if (selectedRadio) {
    const value = selectedRadio.value;
    switch (value) {
        case "yes":
            eligible_age = true
            questionnaireContainers[1].classList.add('hidden')
            questionnaireContainers[2].classList.remove('hidden')
            break;
        case "no":
            eligible_age = false
            questionnaireContainers[1].classList.add('hidden')
            questionnaireContainers[3].classList.remove('hidden')
            break;
    }
  }
}
function final_question() {
    const selectedRadio = document.querySelector('input[name="q3_bool"]:checked');
    if (selectedRadio) {
    const value = selectedRadio.value;
    switch (value) {
        case "yes":
            questionnaireContainers[2].classList.add('hidden')
            questionnaireContainers[4].classList.remove('hidden')
            break;
        case "no":
            localStorage.setItem("registered_to_vote", registered_to_vote)
            localStorage.setItem("eligible_age", eligible_age)
            window.location.replace("../shortBallot/index.html")
            break;
    }
  }
}
function done_with_questionnaire() {
    window.location.replace("../shortBallot/index.html")
    localStorage.setItem("registered_to_vote", registered_to_vote)
    localStorage.setItem("eligible_age", eligible_age)
}