const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
            this.field = field;
            this.row = 0;
            this.column = 0;
    }

    print(){
        for(let row in this.field){
            console.log(this.field[row].join(''))
        }
    }

    askDirection() {
        let input = prompt('WHICH WAY? ')
        if (input !== 'r' && input !== 'l' && input !== 'd' && input !== 'u') {
            console.log('ERROR: WRONG INPUT!');
            this.askDirection()

        }else {
            //console.log(`your direction is ${input}`)
            return(input)
        }
    }
    run(){
        this.print()
        this.row = 0;
        this.column = 0;
        this.next()
    }
    step(){
        this.field[this.row][this.column] = '*';
        this.print()
    }
    win(){
        if(this.field[this.row][this.column] === '^'){
            console.log('you win! :)')
            return true
        }
    }
    lose() {
        if(this.field[this.row][this.column] === 'O') {
            console.log('you lose, sorry :(')
            return true
        }
    }
    process(){
        if(this.win()){
            this.field[this.row][this.column] = 'W'
            this.print()
            return 0;
        }else if(this.lose()) {
            this.field[this.row][this.column] = 'L'
            this.print()
            return 0;
        }else{
            this.step()
            this.next()
        }

    }

    next(){
        let direction = this.askDirection()

        if(direction === 'd'){
            this.row++;
            this.process()
        }else if(direction === 'r'){
            this.column++;
            this.process()
        }else if(direction === 'l'){
            this.column--;
            this.process()
        }else if(direction === 'u'){
            this.row--;
            this.process()
        }
    }
    generateField(){

    }

}
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

myField.run()