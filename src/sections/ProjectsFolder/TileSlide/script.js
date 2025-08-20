class SlidingPuzzle {
    constructor() {
        this.size = 3;
        this.tiles = [];
        this.emptyPos = { row: 2, col: 2 };
        this.moves = 0;
        this.isMoving = false;
        
        this.initializeGame();
        this.bindEvents();
    }
    
    initializeGame() {
        // Initialize the solved state: 1-8 and empty (0)
        this.tiles = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]
        ];
        
        this.renderPuzzle();
        this.shuffle();
        this.updateMoveCounter();
    }
    
    renderPuzzle() {
        const puzzleElement = document.getElementById('puzzle');
        puzzleElement.innerHTML = '';
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const tile = document.createElement('div');
                const value = this.tiles[row][col];
                
                if (value === 0) {
                    tile.className = 'tile empty';
                    this.emptyPos = { row, col };
                } else {
                    tile.className = 'tile';
                    tile.textContent = value;
                    tile.dataset.row = row;
                    tile.dataset.col = col;
                    tile.dataset.value = value;
                    
                    // Check if tile is clickable (adjacent to empty space)
                    if (this.isAdjacent(row, col)) {
                        tile.classList.add('clickable');
                    }
                    
                    tile.addEventListener('click', () => this.moveTile(row, col));
                }
                
                puzzleElement.appendChild(tile);
            }
        }
    }
    
    isAdjacent(row, col) {
        const emptyRow = this.emptyPos.row;
        const emptyCol = this.emptyPos.col;
        
        return (
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow)
        );
    }
    
    moveTile(row, col) {
        if (this.isMoving || !this.isAdjacent(row, col)) {
            return;
        }
        
        this.isMoving = true;
        
        // Swap tile with empty space
        const emptyRow = this.emptyPos.row;
        const emptyCol = this.emptyPos.col;
        
        this.tiles[emptyRow][emptyCol] = this.tiles[row][col];
        this.tiles[row][col] = 0;
        this.emptyPos = { row, col };
        
        this.moves++;
        this.updateMoveCounter();
        
        // Add moving animation class
        const tileElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (tileElement) {
            tileElement.classList.add('moving');
        }
        
        // Re-render puzzle with animation
        setTimeout(() => {
            this.renderPuzzle();
            this.isMoving = false;
            
            // Check for win condition
            if (this.checkWin()) {
                setTimeout(() => this.showWinMessage(), 300);
            }
        }, 300);
    }
    
    checkWin() {
        const winState = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]
        ];
        
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.tiles[row][col] !== winState[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    shuffle() {
        // Perform random valid moves to shuffle the puzzle
        // This ensures the puzzle remains solvable
        const shuffleMoves = 1000;
        
        for (let i = 0; i < shuffleMoves; i++) {
            const possibleMoves = this.getPossibleMoves();
            if (possibleMoves.length > 0) {
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                this.performMove(randomMove.row, randomMove.col);
            }
        }
        
        // Reset move counter and re-render
        this.moves = 0;
        this.updateMoveCounter();
        this.renderPuzzle();
    }
    
    getPossibleMoves() {
        const moves = [];
        const emptyRow = this.emptyPos.row;
        const emptyCol = this.emptyPos.col;
        
        // Check all four directions
        const directions = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 },  // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }   // right
        ];
        
        directions.forEach(dir => {
            const newRow = emptyRow + dir.row;
            const newCol = emptyCol + dir.col;
            
            if (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size) {
                moves.push({ row: newRow, col: newCol });
            }
        });
        
        return moves;
    }
    
    performMove(row, col) {
        // Silent move for shuffling (no animation or move counting)
        const emptyRow = this.emptyPos.row;
        const emptyCol = this.emptyPos.col;
        
        this.tiles[emptyRow][emptyCol] = this.tiles[row][col];
        this.tiles[row][col] = 0;
        this.emptyPos = { row, col };
    }
    
    updateMoveCounter() {
        document.getElementById('moveCount').textContent = this.moves;
    }
    
    showWinMessage() {
        document.getElementById('finalMoveCount').textContent = this.moves;
        document.getElementById('winMessage').classList.remove('hidden');
    }
    
    hideWinMessage() {
        document.getElementById('winMessage').classList.add('hidden');
    }
    
    newGame() {
        this.hideWinMessage();
        this.moves = 0;
        this.isMoving = false;
        this.shuffle();
    }
    
    bindEvents() {
        document.getElementById('shuffleBtn').addEventListener('click', () => {
            this.newGame();
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.newGame();
        });
        
        // Close win message when clicking outside
        document.getElementById('winMessage').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.newGame();
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.isMoving) return;
            
            const emptyRow = this.emptyPos.row;
            const emptyCol = this.emptyPos.col;
            let targetRow = emptyRow;
            let targetCol = emptyCol;
            
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    targetRow = emptyRow + 1; // Move tile up (empty goes down)
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    targetRow = emptyRow - 1; // Move tile down (empty goes up)
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    targetCol = emptyCol + 1; // Move tile left (empty goes right)
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    targetCol = emptyCol - 1; // Move tile right (empty goes left)
                    break;
                case ' ':
                case 'Enter':
                    this.newGame();
                    e.preventDefault();
                    return;
                default:
                    return;
            }
            
            if (targetRow >= 0 && targetRow < this.size && 
                targetCol >= 0 && targetCol < this.size) {
                this.moveTile(targetRow, targetCol);
                e.preventDefault();
            }
        });
        
        // Touch support for mobile
        let touchStartX, touchStartY;
        
        document.getElementById('puzzle').addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }, { passive: true });
        
        document.getElementById('puzzle').addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touch = e.changedTouches[0];
            const touchEndX = touch.clientX;
            const touchEndY = touch.clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 30;
            
            if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
                const emptyRow = this.emptyPos.row;
                const emptyCol = this.emptyPos.col;
                let targetRow = emptyRow;
                let targetCol = emptyCol;
                
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    // Horizontal swipe
                    if (deltaX > 0) {
                        targetCol = emptyCol - 1; // Swipe right, move tile left
                    } else {
                        targetCol = emptyCol + 1; // Swipe left, move tile right
                    }
                } else {
                    // Vertical swipe
                    if (deltaY > 0) {
                        targetRow = emptyRow - 1; // Swipe down, move tile up
                    } else {
                        targetRow = emptyRow + 1; // Swipe up, move tile down
                    }
                }
                
                if (targetRow >= 0 && targetRow < this.size && 
                    targetCol >= 0 && targetCol < this.size) {
                    this.moveTile(targetRow, targetCol);
                }
            }
            
            touchStartX = touchStartY = null;
        }, { passive: true });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SlidingPuzzle();
});
