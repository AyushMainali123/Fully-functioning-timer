// Class to add=> start, pause

const playButton = document.querySelector('[data-play-button]');
const hourSelector = document.querySelector('#hour');
const minuteSelector = document.querySelector('#minute');
const secondSelector = document.querySelector('#second');

const timerSelector = document.querySelector('[data-timer]');
const resetBtnSelector = document.querySelector('[data-reset]');
const addOneSelector = document.querySelector('[data-add-one]');
const musicPlayerSelector = document.querySelector('audio');


let hour, minute, second, id;





checkForInputValue(hourSelector);
checkForInputValue(minuteSelector);
checkForInputValue(secondSelector);

function checkForInputValue(selector){

    selector.addEventListener('keyup', ()=>{
        
        let res = selector.value;
        ans = res.split('');
        if(ans.length >= 1){
            if(isNaN(parseInt(ans[ans.length-1]))){
                ans.pop();
                ans.join();
                selector.value = ans;
            }
        }
        if(ans.length === 2){
            if(isNaN(parseInt(ans[0]))){
                ans.shift();
                ans.join();
                selector.value = ans;
            }
        }
        
    })

}










playButton.addEventListener('click', ()=>{
    if(!checkForStart()){
        startTimer();
    }else{
        controlPausePlay();       
    }
})


resetBtnSelector.addEventListener('click',()=>{

    resetEverything();
    
})


addOneSelector.addEventListener('click', ()=>{
    if(minute < 60)
        minute += 1;
    else{
        hour++;
        minute = 0;
    }
    displayOutput();
})




function checkForStart(){
    return timerSelector.classList.contains('start')?true:false;
}

function startTimer(){

    if((hourSelector.value === '' || hourSelector.value === '00' )&&
    (minuteSelector.value === '' || minuteSelector.value === '00') &&
    (secondSelector.value === '' || secondSelector.value === '00')){
        return;
    }
    else{
        if(hourSelector.value === '' || hourSelector.value === '00'){
            hour = 0;
        }
        else{
            hour = parseInt(hourSelector.value);
        }
        if(minuteSelector.value === '' || minuteSelector.value === '00'){
            minute = 0;
        }
        else{
            minute = parseInt(minuteSelector.value);
            if(minute >= 60)minute = 59;
        }
        if(secondSelector.value === '' || secondSelector.value === '00'){
            second = 0;
        }
        else{
            second = parseInt(secondSelector.value);
            if(second >= 60)second = 59;
        }

        displayOutput();
        
        // Events after starting timer
        playButton.classList.add('fa-pause');
        playButton.classList.remove('fa-play');
        timerSelector.classList.add('start');
        addOneSelector.classList.remove('hide');
        goThroughEnd();
    }
}


function goThroughEnd(){



     id = setInterval(()=>{

        
        second--;
        if(second < 0){
            minute--;
            if(minute < 0){
                hour--;
                if(hour < 0){
                    hour = 0;
                    minute = 0;
                    second = 0;
                    hourSelector.value = '00';
                    minuteSelector.value = '00';
                    secondSelector.value = '00';
                    musicPlayerSelector.play();
                    musicPlayerSelector.currentTime = 0;
                    resetBtnSelector.classList.remove('hide');
                    addOneSelector.classList.add('hide');
                    playButton.classList.remove('fa-pause');
                    playButton.classList.add('fa-check');
                    clearInterval(id);
                }
                else{
                    second = 59;
                    minute = 59;
                }
            }
            else{
                second = 59;
            }
        }

        // Display For Output
        displayOutput();
    }, 1000)



}


function controlPausePlay(){

    if(playButton.classList.contains('fa-play')){
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
        resetBtnSelector.classList.add('hide');
        goThroughEnd();
    }
    else if(playButton.classList.contains('fa-pause')){
        resetBtnSelector.classList.remove('hide');
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        clearInterval(id);
    }
    else{
        resetEverything();
    }

}



function displayOutput(){

    if(second < 10){
        secondSelector.value = '0'+second;
    }
    else{
        secondSelector.value = second;
    }
    if(minute < 10){
    minuteSelector.value = '0'+minute;
    }
    else{
        minuteSelector.value = minute;
    }
    if(hour < 10){
        hourSelector.value = '0'+hour;    
    }
    else{
        hourSelector.value = hour;
    }
}


function resetEverything(){

    hour = 0;
    minute = 0;
    second = 0;
    musicPlayerSelector.pause();
    timerSelector.classList.remove('start');
    hourSelector.value = '';
    minuteSelector.value = '';
    secondSelector.value = '';
    resetBtnSelector.classList.add('hide');
    if(playButton.classList.contains('fa-check')){
        playButton.classList.remove('fa-check');
        playButton.classList.add('fa-play');
    }
}

