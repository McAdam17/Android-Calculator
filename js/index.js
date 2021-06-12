const screenOperation = document.getElementById('input_operations');
const screenOutput = document.getElementById('output_operations');

screenOperation.addEventListener('input', () =>{
    const lastValue = screenOperation.value;
    checkPatternOperation(lastValue);
})

function checkPatternOperation(lastValue){
    if(lastValue.length>0){
        if(validateInput(lastValue)){
            screenOperation.style.boxShadow = '10px 20px 30px green';
        }else{
            screenOperation.style.boxShadow= '10px 20px 30px red';
        }
    }else{
        screenOperation.style.boxShadow= null;
    }
}

function validateInput(value){
    return /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)$|[0-9]+$/.test(value);
}

function handleOperations(){
    const lastValue = screenOperation.value;
    if(validateInput(lastValue) && lastValue.length>0){
        // do operations
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
    }
    checkPatternOperation(screenOperation.value);
}

function addData(input){
    const lastValue = screenOperation.value;
    screenOperation.value = lastValue + input;
    checkPatternOperation(screenOperation.value);
}