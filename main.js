const prompt = require('prompt-sync')({sigint: true});



class Field {
    constructor(field, row, column) {
            this.field = field;
            this.row = row;
            this.column = column;
            this.multiplier = 0;
            //this.counter = 0;
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
            //this.askDirection()
            this.next()
        }else {
            //console.log(`your direction is ${input}`)
            return(input)
        }
    }
    run(multiplier){
        this.multiplier = multiplier;
        let randomStart = () => {
            let rs = Math.floor(Math.random()*this.field.length);
            let cs = Math.floor(Math.random()*this.field[0].length)
            if(this.field[rs][cs] === '░' ){
                this.field[rs][cs] = '*'
                this.row = rs;
                this.column = cs;
            }else{
                randomStart()
            }
        }
        let randomHat = () => {
            let rh = Math.floor(Math.random()*this.field.length);
            let ch = Math.floor(Math.random()*this.field[0].length)
            if(this.field[rh][ch] === '░'){
                this.field[rh][ch] = '^'
            }else{
                randomHat()
            }
        }

        randomStart()
        randomHat()
        this.print()
        this.next()
    }
    randomHole(){
        let rh =Math.floor(Math.random()*this.field.length);
        let ch = Math.floor(Math.random()*this.field[0].length);


        /*if(this.row > this.field.length - 2 && this.column > this.field[0].length - 5){
            rh = this.row - Math.floor(Math.random()*10);
            ch = this.column - Math.floor(Math.random()*10);
        }else if( this.row > 2 && this.column > 2){
            rh = this.row + Math.floor(Math.random()*10);
            ch = this.column + Math.floor(Math.random()*10);
        }*/

        if(this.field[rh][ch] !== '^' && this.field[rh][ch] !== this.field[this.row][this.column]){
            this.field[rh][ch] = 'O'
        }else{
            //this.counter++;
            this.randomHole();
        }
    }
    XRandomHole(){
        for(let i=0;i<this.multiplier;i++){
            this.randomHole();
        }
    }
    step(){
        this.field[this.row][this.column] = '*';
        this.XRandomHole()
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

    static generateField(height, width, POH){
        let items = height * width;
        let numOfHoles = Math.floor(items * POH / 100);
        let field = [] ;

        let condition = () => {
            let r = Math.floor(Math.random()*height);
            let c = Math.floor(Math.random()*width)
            if(field[r][c] === '░' ){
                field[r][c] = 'O'
            }else{
                condition()
            }
        }

        for(let i = 0; i < height; i++){
            field.push([])
        }
        for(let i = 0; i < field.length; i++ ){
            for(let j = 0; j < width; j++){
                field[i].push('░')
            }
        }
        for(let i=0; i < numOfHoles; i++){
            condition();
        }
        return field
    }

}
//Field.generateField(11,12,5)

const myField = new Field(Field.generateField(20,60,5));

myField.run(10)