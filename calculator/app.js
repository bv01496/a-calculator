//selecting elements for DOM
const numbers = document.querySelectorAll("[data-number]")
const operations = document.querySelectorAll("[data-symbol]")
const ac = document.querySelector("[data-clear]")
const del = document.querySelector("[data-delete]")
const equals = document.querySelector("[data-equals]")
const pote = document.querySelector(".prev")
const cote = document.querySelector(".current")

//declaring variables
var opp = ""
var prevOparand = 0
var currentOparand = 0

//functions declarations
clear=()=>{
    pote.innerText = ""
    cote.innerText = ""
};
delet=()=>{
    cote.innerText = cote.innerText.slice(0,-1)
}
updateDispaly=(number)=>{
    if(cote.innerText.includes("-")  && number==="-" ||(cote.innerText.includes(".")  && number==="."))return;
    else if(isNaN(number) && (number !== (".") && number !==("-"))){
        pote.innerText = cote.innerText + opp
        prevOparand = parseFloat(cote.innerText)
        cote.innerText = ""
        return
    }
    cote.innerText += number
    currentOparand = parseFloat(cote.innerText)
}
selectOprt=(operation)=>{
     if(operation === "-"){
        updateDispaly(operation)
    }else if(cote.innerText.includes(operation) || cote.innerText==="") return;
    
    else if(cote.innerText !== "" && pote.innerText!== "" ){
        calc()
        opp = operation
        pote.innerText = cote.innerText + operation
        prevOparand = parseFloat(cote.innerText)
        cote.innerText = ""
    }
    else{
        opp = operation
        updateDispaly(operation)
    }
    
}
calc=()=>{
    var result = 0
    if(cote.innerText !== "" && pote.innerText!== ""){
    switch(opp){
        case("+"):
            result = prevOparand + currentOparand
            cote.innerText = result
            pote.innerText = prevOparand + opp + currentOparand
            break;
        case("-"):
            result = parseFloat(prevOparand) - parseFloat(currentOparand)
            cote.innerText = result
            pote.innerText = prevOparand + opp + currentOparand
            break;
        case("*"):
            result = prevOparand * currentOparand
            cote.innerText = result
            pote.innerText = prevOparand + opp + currentOparand
            break;
        case("÷"):
            result = parseFloat(prevOparand) / parseFloat(currentOparand)
            cote.innerText = result
            pote.innerText = prevOparand + opp + currentOparand
            break;
        case("^"):
            result = 1
            for(let i=1; i<=(currentOparand); i++){
                result *= parseFloat(prevOparand)
            }
            cote.innerText = result
            pote.innerText = prevOparand + opp + currentOparand
            break;

    }
    } 
}

numbers.forEach((number)=>{
    number.addEventListener("click",()=>updateDispaly(number.innerText))
})
ac.addEventListener("click",()=>{
    clear()
})
operations.forEach((operation)=>{
    operation.addEventListener("click",()=> selectOprt(operation.innerText))
})
equals.addEventListener("click",()=>{
    calc()
})
del.addEventListener("click",()=>delet())
