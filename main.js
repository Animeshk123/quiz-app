const startBtn = document.querySelector(".start button");
const rulepage = document.querySelector(".rules");
const exit = document.querySelector(".exit");
const conti = document.querySelector(".contineue");
const questionpage = document.querySelector(".question");
const question = document.querySelector(".main_ques h3");
const hints = document.querySelectorAll(".hint");
const nextbtn = document.querySelector(".next button");
const status = document.querySelector(".first");
const status2 = document.querySelector(".sec");
const greet = document.querySelector(".greet");
const close = document.querySelector("#exitlast");
const tryagain = document.querySelector("#tryagain");
const time_sec = document.querySelector(".timer_sec");
const timerstatus = document.querySelector(".timer_status");
const total = document.querySelector(".number");
const greetingText = document.querySelector("#greetingText");
const totalquestionNUMber = document.querySelector(".totalnum");
const wrong = document.querySelector(".wrongSound");
const right = document.querySelector(".rightSound");


let number = 0;
let totaltrue = 0;
let time = 14;
let width = 6.66666667;
let counter;
let click = false;

totalquestionNUMber.innerText = quizApi.length;

// start button to start the quiz
startBtn.addEventListener("click", () => {
    rulepage.style.display = "block";
    setTimeout(() => {
        rulepage.style.opacity = "1";
    }, 100);
})

// quit button to quit the quiz
exit.addEventListener("click", () => {
    rulepage.style.opacity = "0";
    setTimeout(() => {
        rulepage.style.display = "none";
    }, 200);
})

//continue the quiz 
conti.addEventListener("click", () => {
    rulepage.style.opacity = "0";
    setTimeout(() => {
        rulepage.style.display = "none";
    }, 200);
    questionpage.style.display = "block";
    setTimeout(() => {
        questionpage.style.opacity = "1";
    }, 100);
    setvalue(0);
    clearInterval(counter);
    timercount(15,0);
    setTimeout(() => {
    bgmusic.play();
    },800)
})


// close the quiz at the end of the quiz end
close.addEventListener("click", () => {
    greet.style.opacity = "0",
        setTimeout(() => {
            greet.style.display = "none";
        }, 300);
})

// try the quiz again
tryagain.addEventListener("click", () => {
    totaltrue = 0;
    greet.style.opacity = "0";
    setTimeout(() => {
        greet.style.display = "none";
    }, 300);
    questionpage.style.display = "block";
    setTimeout(() => {
        questionpage.style.opacity = "1";
    }, 100);
    setvalue(0);
    bgmusic.pause();
     bgmusic.currentTime = 0;
    bgmusic.play();
    clearInterval(counter);

    timercount(15, 0);
})

//next button to get into next quiz  question
nextbtn.addEventListener("click", () => {
  if(click) {
    number++;
    setvalue(number);
    hints.forEach(items => {
        items.classList.remove("corrcet");
        items.classList.remove("wrong");
        items.style.pointerEvents = "unset";
    });
if(number > 5) {
  bgmusic.pause();
}
    clearInterval(counter);
    timercount(15, 0);
    click = false;
    
  }
else{
  const model = document.querySelector(".model");
  model.classList.add("active");
  const okay = document.querySelector(".model button");
  okay.addEventListener("click", () =>{
    model.classList.remove("active");
  })
}
});


//timecount function
function timercount(time, width) {
    counter = setInterval(() => {
        if (time >= 0) {
            timerstatus.style.width = `${width}%`;
            time_sec.innerText = time;
            width = width + 6.66666667;
            time--;
        }
        else {
          song.currentTime = 0;
            song.play();
            hints.forEach(item => {
                item.style.pointerEvents = "none";
            })
            clearInterval(counter);
        }
    }, 1000)
}

//set arry value in html
function setvalue(num) {
    if (num < quizApi.length) {
        question.innerText = `${quizApi[num].id}. ${quizApi[num].question}`;
        hints[0].querySelector("li").innerText = quizApi[num].hints.hint1;
        hints[1].querySelector("li").innerText = quizApi[num].hints.hint2;
        hints[2].querySelector("li").innerText = quizApi[num].hints.hint3;
        hints[3].querySelector("li").innerText = quizApi[num].hints.hint4;
        status.innerText = quizApi[num].id;
        status2.innerText = quizApi.length;
        bgmusic.pause();
     bgmusic.currentTime = 0;
     setTimeout(()=> {
    bgmusic.play();
     },600);
    }
    else {
        number = 0;
        bgmusic.currentTime = 0;
        bgmusic.pause();
       
        total.innerText = totaltrue;
        if (totaltrue >= quizApi.length / 2) {
            greetingText.innerText = "cogreets";
        }
        else {
            greetingText.innerText = "sorry";
        }
        questionpage.style.opacity = "0";
        setTimeout(() => {
            questionpage.style.display = "none";
        }, 200);
        greet.style.display = "block";
        setTimeout(() => {
            greet.style.opacity = "1";
        }, 100);

    }
}

//clicking on the answers 
for (let i = 0; i < hints.length; i++) {
    hints[i].addEventListener("click", e => {
        selectItem(e);
    });
}

function selectItem(element) {
  click = true;
    const ans = quizApi[number].Ans;
    const you = element.target.innerText;
    let corrcetHTML = document.createElement("i");
    corrcetHTML.setAttribute("class", "far fa-check-circle");
    let wrongHTML = document.createElement("i");
    wrongHTML.setAttribute("class", "fa fa-times");
    // let wrongHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
    hints.forEach(items => {
        items.style.pointerEvents = "none";
    })
    clearInterval(counter);
    if (ans === you) {
        totaltrue++;
        element.target.classList.add("corrcet")
        rightsong.currentTime = 0;
          rightsong.play();
          bgmusic.pause();
    }
    else {
      element.target.classList.add("wrong");
      song.currentTime = 0;
        song.play();
        bgmusic.pause();
        
    }
}

     const song = new Audio("Wrong Buzzer - Sound Effect.mp3");
     const rightsong = new Audio("Correct answer effect for youtubers _ Copyright free tone.mp3");
     const bgmusic = new Audio("15 Second Timer with Voice Countdown.mp3");