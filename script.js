let fields = [];
let currentShape = 'cross';
gameOver = false;
let AUDIO_END = new Audio('audio/win-fanfare.mp3')


function fillShape(id) { // Zuweisung einer Zahl an jedes Kästchen durch (id)
    
    if (!fields[id] &&!gameOver) { // Code wird ausgeführt, solang noch nicht game over ist
        if (currentShape == 'circle') { // Wechselt sich zwischen Kreis und Kreuz ab
            currentShapeCross();

        } else {
            currentShapeCircle();
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}


function currentShapeCross() {
    currentShape = 'cross';
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
}


function currentShapeCircle() {
    currentShape = 'circle';
    document.getElementById('player-1').classList.add('player-inactive');
    document.getElementById('player-2').classList.remove('player-inactive');
}


function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }

        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}


function checkForWin() {
    let winner;
    showorizontalLines(winner);
    showVerticalLines(winner);
    showDiagonalLines(winner);
    noWinner();
}


function showWinner(winner) { // Ermittelt den Gewinner
    if (winner) {
        gameOver = true;
        animationImage();
        AUDIO_END.play();
    }
}


function showorizontalLines(winner) {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-0').style.transform = 'scale(1)';
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-1').style.transform = 'scale(1)';
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-2').style.transform = 'scale(1)';
    }
    showWinner(winner);
}


function showVerticalLines(winner) {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-3').style.transform = 'rotate(90deg) scale(1)';
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scale(1)';
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scale(1)';
    }
    showWinner(winner);
}


function showDiagonalLines(winner) {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-6').style.transform = 'rotate(45deg) scale(1.4)';
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-7').style.transform = 'rotate(-45deg) scale(1.4)';
    }
    showWinner(winner);
}


function animationImage() { 
    setTimeout(function () {
        document.getElementById('game-over').classList.remove('d-none');
        document.getElementById('restart-btn').classList.remove('d-none');
    }, 1000);
}


function restart() {
    gameOver = false;
    fields = [];
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    resetDraw();
    resetLines();
}


function noWinner() {
    if(!gameOver && fields[0] && fields[1] && fields[2] && fields[3] && fields[4] && fields[5] && fields[6] && fields[7] && fields[8]) {
       gameOver = true;
       
       setTimeout(function () {
        document.getElementById('game-over').classList.remove('d-none');
        document.getElementById('restart-btn').classList.remove('d-none');
       }, 1000); 
    }
}


function resetLines() {
    for (let i = 0; i < 8; i++) {
        document.getElementById('line-' + i).style = '';
    }
}


function resetDraw() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
}