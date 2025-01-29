// Modüller
const GameManager = {
    penguinY: 0,
    isJumping: false,
    
    startPenguinGame() {
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
            <div id="penguin" style="position:relative;bottom:0">🐧</div>
            <button onclick="GameManager.jumpPenguin()">ZIPLAT!</button>
        `;
    },

    jumpPenguin() {
        if(this.isJumping) return;
        this.isJumping = true;
        const penguin = document.getElementById('penguin');
        let y = 0;
        const jumpInterval = setInterval(() => {
            y += 5;
            penguin.style.bottom = y + 'px';
            if(y >= 100) {
                clearInterval(jumpInterval);
                this.fallPenguin();
            }
        }, 20);
    },

    fallPenguin() {
        const penguin = document.getElementById('penguin');
        let y = 100;
        const fallInterval = setInterval(() => {
            y -= 5;
            penguin.style.bottom = y + 'px';
            if(y <= 0) {
                clearInterval(fallInterval);
                this.isJumping = false;
            }
        }, 20);
    }
};

const QuizManager = {
    questions: [
        "Sıla'nın en sevdiği meyve? 🍌",
        "Sıla kaç penguen boyunda? 🐧",
        "Göktaş ailesinin kökeni? 🌠"
    ],
    currentQuestion: 0,

    showQuiz() {
        Swal.fire({
            title: 'Sıla Bilgi Yarışması!',
            text: this.questions[this.currentQuestion],
            input: 'text',
            showCancelButton: true
        }).then((result) => {
            if(result.value) this.checkAnswer(result.value);
        });
    },

    checkAnswer(answer) {
        const correctAnswers = [
            {keywords: ['muz', 'banana'], response: '🍌 Doğru! Muz kraliçesi!'},
            {keywords: ['1.5', 'bir buçuk'], response: '🐧 Penguenler onayladı!'},
            {keywords: ['uzay', 'meteor'], response: '🚀 Gizli bilgiyi buldun!'}
        ];

        const response = correctAnswers[this.currentQuestion];
        if(response.keywords.some(keyword => answer.toLowerCase().includes(keyword))) {
            showToast(response.response, 'success');
            this.currentQuestion = (this.currentQuestion + 1) % this.questions.length;
        } else {
            showToast('❌ Yanlı
