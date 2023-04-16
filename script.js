/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
let Risposte =  {one: null, two: null, three: null};

function onclick(event){
    const check = event.currentTarget;

    //scorro tutte le possibili risposte
    for(let ans of answer){   
        const image = ans.querySelector(".checkbox")
        if(ans.dataset.questionId===check.dataset.questionId){ //seleziono solo quelle con lo stesso question-id
            if(ans.dataset.choiceId===check.dataset.choiceId){
                 //seleziono la risposta sulla quale ho cliccato per contrassegnarla
                ans.classList.remove("unchecked");
                ans.classList.add("checked");
                image.src="images/checked.png";
                Risposte[check.dataset.questionId]=check.dataset.choiceId;
            }
            else{  //deseleziono l'eventuale risposta selezionata in precedenza
                ans.classList.remove("checked");
                ans.classList.add("unchecked");
                image.src="images/unchecked.png";
            }
        }
    }

    //controllo che tutte le domande del quiz abbiano una risposta selezionata
    if(Risposte.one !== null && Risposte.two !== null && Risposte.three !== null){ 
        visualizzaRis();  //allora procedo alla visualizzazione delle risposte
    }
}

function reset_function(){
    Risposte =  {one: null, two: null, three: null};  //svuoto l'array delle risposte

    for(let ans of answer){
        const image = ans.querySelector(".checkbox")
        ans.classList.remove("checked");
        ans.classList.remove("unchecked");
        console.log("rimosse le classi");
        image.src="images/unchecked.png";
        //aggiungo gli event listener di click per ogni div
        ans.addEventListener("click", onclick);
    }

    const result = document.querySelector(".ris");
    result.remove();
}


function visualizzaRis(){
    const div = document.createElement("div");
    const title = document.createElement("h1");
    const content = document.createElement("p");
    const button = document.createElement("button");
    const text = document.createElement("h3");

    div.classList.add("ris");
    button.classList.add("reset_butt");
    text.textContent = "Ricomincia il quiz!";

    if (Risposte.two == Risposte.three) {
        console.log(Risposte.two);
        title.textContent = RESULTS_MAP[Risposte.two].title;
        content.textContent = RESULTS_MAP[Risposte.two].contents;
      }
      else{
        title.textContent = RESULTS_MAP[Risposte.one].title;
        console.log(Risposte.one);
        content.textContent = RESULTS_MAP[Risposte.one].contents;
      }


      
      div.appendChild(title);
      div.appendChild(content);
      div.appendChild(button);
      button.appendChild(text);
      document.querySelector("article").appendChild(div);
      
      button.addEventListener("click", reset_function);
      //rimuovo gli eventlistener del quiz lasciando abilitato solo il pulsante di reset
      for(const ans of answer) ans.removeEventListener("click", onclick);


}



const answer = document.querySelectorAll(".choice-grid div");
for(const check_box_3 of answer) check_box_3.addEventListener("click", onclick);

//console.log(answer);