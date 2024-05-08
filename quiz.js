// function getData() {
//     const myRequest = new XMLHttpRequest();

//     myRequest.onreadystatechange = function () {
//         if (this.status === 200 && this.readyState === 4) {
//             console.log(JSON.parse(this.responseText))
//         }
//     }

//     myRequest.open("GET", "quiz.json", true)
//     myRequest.send()

// }
const quizArea = document.querySelector(".quiz-area")
const answerArea = document.querySelector(".answers-area")
const numberOFQuiz = document.querySelector(".count span")
const contnerOFBullets = document.querySelector(".spans")
const btn = document.querySelector("button")
const countdownElment = document.querySelector(".count-down")

// settings
let currentQouiz = 0;
let rightAnswers = 0;
let countDownIntrvel;
let timeQ = 90;
async function getData() {
    //getData
    const data = await fetch("quiz.json")
    const dataJSon = await data.json()
    //get number of quiz
    const quizLenth = dataJSon.length
    // add number of Quiz  
    addnumberOFQuiz(quizLenth)
    //add bullets
    addbullets(quizLenth)

    addQuiz(dataJSon[currentQouiz], quizLenth)
    addAnswers(dataJSon[currentQouiz], quizLenth)

    countDown(timeQ, quizLenth)

    btn.addEventListener("click", () => {


        if (currentQouiz < quizLenth) {

            //get right answer
            const rightAnswer = dataJSon[currentQouiz].right_Answer
            // increase current Qouiz
            checkAnswer(rightAnswer)

            currentQouiz++

            answerArea.innerHTML = "";
            quizArea.innerHTML = "";

            addQuiz(dataJSon[currentQouiz], quizLenth)
            addAnswers(dataJSon[currentQouiz], quizLenth)

            checkbullet()

            clearInterval(countDownIntrvel)
            countDown(timeQ, quizLenth)

            showResult(quizLenth)


        }

    })




}
getData()

function addbullets(num) {
    for (let i = 0; i < num; i++) {
        const span = document.createElement("span")
        contnerOFBullets.appendChild(span)
        if (i === 0) {
            span.classList.add("on")
        }
    }
}


function addQuiz(quiz, num) {
    if (currentQouiz < num) {
        const quizText = document.createTextNode(quiz.title)
        const h2 = document.createElement("h2")
        h2.appendChild(quizText)
        quizArea.appendChild(h2)
    }

}
function addAnswers(quiz, num) {

    if (currentQouiz < num) {
        for (let i = 1; i <= 4; i++) {
            const answers = quiz[`answer-${[i]}`]

            const answeContaner = document.createElement("div")

            answeContaner.classList.add("answer")

            const input = document.createElement("input")
            input.type = "radio"
            input.name = "questions";
            input.id = `answer-${[i]}`
            input.dataset.answer = answers
            // input.value = answers
            // if (i === 1) {
            //     input.checked = true
            // }
            // // OR
            input.checked = i === 1
            const label = document.createElement("label")
            label.htmlFor = `answer-${[i]}`
            label.innerHTML = answers;
            answeContaner.append(input, label)
            answerArea.appendChild(answeContaner)


        }
    }
}

function addnumberOFQuiz(num) {
    numberOFQuiz.innerHTML = num
}




function checkAnswer(rAnswer) {
    const inputs = document.getElementsByName("questions")
    // let choosenAnswer;
    // for (let i = 0; i < inputs.length; i++) {
    //     if (inputs[i].checked) {
    //         // console.log(inputs[i].dataset.answer) //or we can use value insted of dataset
    //         choosenAnswer = inputs[i].dataset.answer
    //         break;
    //     }
    // }
    // if (rAnswer === choosenAnswer) {
    //     rightAnswers++
    // }
    //OR
    const inputsAryy = Array.from(inputs)
    const choosenAnswer = inputsAryy.find((e) => {
        return e.checked
    })
    if (rAnswer === choosenAnswer.dataset.answer) {
        rightAnswers++
    }
    console.log(rightAnswers)
}

function checkbullet() {
    const bullets = document.querySelectorAll(".spans span")
    const arrybulltets = Array.from(bullets)
    arrybulltets.forEach((e, i) => {
        if (currentQouiz === i) {
            e.classList.add("on")
        }
    })
}

function showResult(quizLenth) {
    if (currentQouiz === quizLenth) {
        quizArea.remove();
        answerArea.remove();
        btn.remove();
        const resultArea = document.querySelector(".results ")
        const spanArea = document.querySelector(".results span ")
        let result;
        if (rightAnswers === quizLenth) {
            // spanArea.classList.add("perfect")
            result = "perfect";
            // const spanText = document.createTextNode("perfect")
            // spanArea.appendChild(spanText)
            // const resultText = document.createTextNode(`Your Answer ${rightAnswers} from ${quizLenth}`)
            // resultArea.appendChild(resultText)
            //OR 
            // resultArea.innerHTML = `<span class="perfect"> perfect </span>Your Answer ${rightAnswers} from ${quizLenth}`

        } else if (rightAnswers > (quizLenth / 2) && rightAnswers < quizLenth) {
            // spanArea.classList.add("good")
            result = "good";
            // const spanText = document.createTextNode("good")
            // spanArea.appendChild(spanText)
            // const resultText = document.createTextNode(`Your Answer ${rightAnswers} from ${quizLenth}`)
            // resultArea.appendChild(resultText)

        } else {
            // spanArea.classList.add("bad")
            result = "bad";
            // const spanText = document.createTextNode("bad")
            // spanArea.appendChild(spanText)
            // const resultText = document.createTextNode(`Your Answer ${rightAnswers} from ${quizLenth}`)
            // resultArea.appendChild(resultText)
        }

        spanArea.classList.add(result)
        const spanText = document.createTextNode(result)
        spanArea.appendChild(spanText)
        const resultText = document.createTextNode(`Your Answer ${rightAnswers} from ${quizLenth}`)
        resultArea.appendChild(resultText)
        console.log("finish")

    }
}

window.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        btn.click()
    }
})



function countDown(duration, num) {

    if (currentQouiz < num) {
        let miunts, scounds;
        countDownIntrvel = setInterval(() => {
            miunts = (Math.floor(duration / 60))
            scounds = (Math.floor(duration % 60))
            miunts = miunts < 10 ? `0${miunts}` : miunts
            scounds = scounds < 10 ? `0${scounds}` : scounds
            countdownElment.innerHTML = `${miunts}:${scounds}`

            if (duration > 0) {
                duration--
            } else {
                clearInterval(countDownIntrvel)
                btn.click()
            }


        }, 1000)

    }

}



// let contDown = setInterval(() => {
//     const nowDate = new Date().getTime()

//     const countDate = birthDay - nowDate

//     const days = Math.floor(countDate / (1000 * 60 * 60 * 24));
//     const hours = Math.floor(countDate % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
//     const mint = Math.floor(countDate % (1000 * 60 * 60) / (1000 * 60))
//     const scond = Math.floor(countDate % (1000 * 60) / 1000)

//     document.querySelector(".days").innerHTML = days < "10" ? `0${days}` : days < "10" ? `0${days}` : days;
//     document.querySelector(".hours").innerHTML = hours < "10" ? `0${hours}` : hours;
//     document.querySelector(".mint").innerHTML = mint < "10" ? `0${mint}` : mint;
//     document.querySelector(".second").innerHTML = scond < "10" ? `0${scond}` : scond;


// }, 1000)

