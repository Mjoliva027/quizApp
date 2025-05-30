const quizData = [
    {
      question: "What does HTML stand for?",
      choices: ["Hyper Text Markup Language", "Hot Mail", "How to Make Lumpia", "HighText Machine Language"],
      answer: 0,
      explanation: "HTML stands for Hyper Text Markup Language. It's the standard language for creating web pages."
    },
    {
      question: "Which language is used for styling web pages?",
      choices: ["HTML", "JQuery", "CSS", "XML"],
      answer: 2,
      explanation: "CSS (Cascading Style Sheets) is used to style the visual appearance of HTML elements."
    },
    {
      question: "Which is not a JavaScript Framework?",
      choices: ["Python Script", "React", "Angular", "Vue"],
      answer: 0,
      explanation: "Python Script is a programming language, not a JavaScript framework."
    },
    {
      question: "Which is used for web apps?",
      choices: ["PHP", "Python", "JavaScript", "All"],
      answer: 3,
      explanation: "All listed languages can be used to build web apps depending on the stack."
    },
    {
      question: "Which of these is a NoSQL database?",
      choices: ["MySQL", "MongoDB", "Oracle", "PostgreSQL"],
      answer: 1,
      explanation: "MongoDB is a NoSQL database that stores data in JSON-like documents."
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let timerInterval;
  let timeLeft = 15;

  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  const progressBar = document.getElementById("progressBar");
  const timerEl = document.getElementById("timer");

  function launchConfetti() {
    var duration = 2 * 1000;
    var end = Date.now() + duration;
  
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
  
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadQuestion() {
    clearInterval(timerInterval);
    startTimer();
    updateProgressBar();

    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    feedbackEl.textContent = '';
    feedbackEl.className = "text-lg font-semibold mb-4 h-8";
    nextBtn.disabled = true;

    choicesEl.innerHTML = '';
    q.choices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.className = "bg-gray-700 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
      btn.onclick = () => handleAnswer(index, btn);
      choicesEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, clickedBtn) {
    clearInterval(timerInterval);

    const correct = quizData[currentQuestion].answer;

    Array.from(choicesEl.children).forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correct) {
        btn.classList.add("bg-green-400");
      } else if (btn === clickedBtn && idx !== correct) {
        btn.classList.add("bg-red-400");
      }
    });

    if (selectedIndex === correct) {
      score++;
      feedbackEl.textContent = "✅ Correct!";
      feedbackEl.classList.add("text-green-600");
    } else {
      feedbackEl.textContent = "❌ Wrong answer!";
      feedbackEl.classList.add("text-red-600");
    }

    feedbackEl.innerHTML += `<p class="text-sm mt-1 mb-4">${quizData[currentQuestion].explanation}</p>`;
    scoreEl.textContent = `Score: ${score}/${quizData.length}`;
    nextBtn.disabled = false;
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showFinalScore();
    }
  }

  function showFinalScore() {
    clearInterval(timerInterval);
    questionEl.textContent = "🎉 Quiz Complete!";
    choicesEl.innerHTML = '';
    feedbackEl.textContent = '';
    scoreEl.innerHTML = `Final Score: ${score} out of ${quizData.length} <div class="text-3xl mt-2">🎉🎉🎉</div>`;
    nextBtn.style.display = "none";
    timerEl.textContent = '';
    restartBtn.classList.remove("hidden");

    launchConfetti();

  }

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = '';
    nextBtn.style.display = "inline-block";
    restartBtn.classList.add("hidden");
    shuffle(quizData);
    loadQuestion();
  }

  function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  function startTimer() {
    timeLeft = 15;
    timerEl.textContent = `⏰Time left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `⏰Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        feedbackEl.textContent = "⏰ Time's up!";
        feedbackEl.classList.add("text-yellow-600");
        Array.from(choicesEl.children).forEach(btn => btn.disabled = true);
        nextBtn.disabled = false;
      }
    }, 1000);
  }

  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", restartQuiz);
// === PARTICLE BACKGROUND ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create particles
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    // Move
    p.x += p.dx;
    p.y += p.dy;

    // Bounce
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();
  
  // Shuffle questions before starting
  shuffle(quizData);
  loadQuestion();