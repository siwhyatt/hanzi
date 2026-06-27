// Shared interactive widgets for the Simplified Hanzi teaching workspace.
// No dependencies. Two widgets:
//   1. Flashcards:   <div class="flashcard"><div class="front">..</div><div class="back">..</div></div>
//      Click toggles the .revealed class, which shows .back.
//   2. MC quizzes:    <div class="quiz-mc" data-answer="2">
//                        <p class="quiz-question">...</p>
//                        <div class="quiz-options">
//                          <button>option</button>  <!-- 1-indexed; data-answer picks the correct one -->
//                          ...
//                        </div>
//                        <p class="quiz-feedback"></p>
//                      </div>

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.flashcard').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('revealed');
    });
  });

  document.querySelectorAll('.quiz-mc').forEach(function (quiz) {
    var correctIndex = parseInt(quiz.dataset.answer, 10); // 1-indexed
    var buttons = quiz.querySelectorAll('.quiz-options button');
    var feedback = quiz.querySelector('.quiz-feedback');

    buttons.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        var isCorrect = (i + 1) === correctIndex;
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        buttons.forEach(function (b) { b.disabled = true; });
        if (!isCorrect) {
          buttons[correctIndex - 1].classList.add('correct');
        }
        if (feedback) {
          feedback.textContent = isCorrect ? 'Correct.' : 'Not quite — correct answer highlighted.';
        }
      });
    });
  });
});
