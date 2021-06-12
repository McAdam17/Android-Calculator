const screenOperation = document.getElementById('input_operations');
const screenOutput = document.getElementById('output_operations');

screenOperation.addEventListener('input', () =>{
    const lastValue = screenOperation.value;
    checkPatternOperation(lastValue);
})

function checkPatternOperation(lastValue){
    if(lastValue.length>0){
        if(validateInput(lastValue)){
            screenOperation.style.boxShadow = '10px 20px 30px blue';
        }else{
            screenOperation.style.boxShadow= '10px 20px 30px red';
        }
    }else{
        screenOperation.style.boxShadow= null;
    }
}

function validateInput(value){
    let res = false;
    try{
        res = eval(value);
    }catch(err){
        conlog(err);
    }
    return res
}

function handleOperations(){
    const lastValue = screenOperation.value;
    const result = validateInput(lastValue)
    if(!!result && lastValue.length>0){
        screenOutput.value=result;
    }else{
        screenOperation.value = '';
        checkPatternOperation('');
    }
}

function getInputs(input) {
    if(input==='r'){
        removeLast();
    }else if(input==='='){
        handleOperations();
    }else{
        addData(input);
    }
}

function removeLast(){
    const lastValue = screenOperation.value;
    if(lastValue.length>0){
        screenOperation.value = lastValue.slice(0, -1)
    }else{
        screenOutput.value = '';
    }
    checkPatternOperation(screenOperation.value);
}

function addData(input){
    const lastValue = screenOperation.value;
    screenOperation.value = lastValue + input;
    checkPatternOperation(screenOperation.value);
}

function conlog(print){
    const development = false;
    if(development){
        console.log(print);
    }
}