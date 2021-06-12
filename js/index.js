const getInputs = (function(){
    const screenOperation = document.getElementById('input_operations');
    const screenOutput = document.getElementById('output_operations');
    const ScreenStates = {VALID:'VALID',INVALID:'INVALID',DEFAULT:'DEFAULT'};
    const noResultYet = '&';
    let totalResult = noResultYet;

    screenOperation.addEventListener('input', () =>{
        const currentValue = screenOperation.value;
        checkInputPattern(currentValue);
    });

    function checkInputPattern(currentValue){
        const isThereContent = currentValue.length>0
        if(isThereContent){
            const res = validateInput(currentValue);
            const isInputValid = !!res;
            if(isInputValid){
                screenOutput.value=res;
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
            const hasDecimals = !!((res+'').split('.')[1]);
            if(hasDecimals){
                res = res.toFixed(2);
            }
        }catch(err){
            conlog(err);
        }
        return res;
    }

    function getInputs(input) {
        if(input==='r'){
            removeLast();
        }else if(input==='c'){
            clearScreens();
        }else if(input==='='){
            handleOperations();
        }else if(isOperator(input) && totalResult!=noResultYet){
            drawOperationWithLastResult(input);
        }else{
            addData(input);
        }
    }

    function drawOperationWithLastResult(operator){
        screenOperation.value = totalResult+''+operator;
        totalResult=noResultYet;
    }

    function isOperator(input){
        return input==='/' || input==='*' || input==='-' || input==='+';
    }

    function clearScreens(){
        totalResult=noResultYet;
        resetScreen(screenOperation);
        resetScreen(screenOutput);
    }

    function handleOperations(){
        const currentValue = screenOperation.value;
        const result = validateInput(currentValue)
        if(!!result && currentValue.length>0){
            screenOutput.value='';
            totalResult=result;
            screenOperation.value=result;
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
            clearScreens();
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