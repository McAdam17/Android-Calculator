const getInputs = (function(){
    const screenOperation = document.getElementById('input_operations');
    const screenOutput = document.getElementById('output_operations');
    const ScreenStates = {VALID:'VALID',INVALID:'INVALID',DEFAULT:'DEFAULT'};

    screenOperation.addEventListener('input', () =>{
        const currentValue = screenOperation.value;
        checkInputPattern(currentValue);
    });

    function checkInputPattern(currentValue){
        const isThereContent = currentValue.length>0
        if(isThereContent){
            const isInputValid = !!validateInput(currentValue);
            if(isInputValid){
                updateScreenState(ScreenStates.VALID);
            }else{
                updateScreenState(ScreenStates.INVALID);
            }
        }else{
            updateScreenState(ScreenStates.DEFAULT);
        }
    }

    function updateScreenState(state){
        if(state===ScreenStates.VALID){
            screenOperation.style.boxShadow = '10px 20px 30px blue';
        }else if(state===ScreenStates.INVALID){
            screenOperation.style.boxShadow= '10px 20px 30px red';
        }else if(state===ScreenStates.DEFAULT){
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
        return res;
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

    function handleOperations(){
        const currentValue = screenOperation.value;
        const result = validateInput(currentValue)
        if(!!result && currentValue.length>0){
            screenOutput.value=result;
        }else{
            resetScreen(screenOperation);
        }
    }

    function resetScreen(screen){
        screen.value = '';
        checkInputPattern('');
    }

    function removeLast(){
        const lastValue = screenOperation.value;
        if(lastValue.length>0){
            screenOperation.value = lastValue.slice(0, -1)
        }else{
            resetScreen(screenOutput);
        }
        checkInputPattern(screenOperation.value);
    }

    function addData(input){
        const lastValue = screenOperation.value;
        const newValue = lastValue + input;
        screenOperation.value = newValue;
        checkInputPattern(screenOperation.value);
    }

    function conlog(print){
        const development = false;
        if(development){
            console.log(print);
        }
    }

    return getInputs;
})();