let global = 0;

document.getElementById("chat").addEventListener("click", () => {
    if (document.getElementById("chatbox").style.display === "block") {
        document.getElementById("chatbox").style.right = "-450px"
        document.getElementById("chatbox").style.transition = ".75s"
        setTimeout(() => {
            document.getElementById("chatbox").style.display = "none";
            document.getElementById("chat").children[0].src = "https://s3.us-west-2.amazonaws.com/calc.masa.space/speech-bubble.svg"
        }, 750)

    } else {
        document.getElementById("chatbox").style.right = "15px"
        document.getElementById("chatbox").style.display = "block";
        document.getElementById("chat").children[0].src = "https://s3.us-west-2.amazonaws.com/calc.masa.space/right-arrow.svg"
    }
})

document.getElementById("chat-input-submit").addEventListener("click", () => {
    appendTextToChat()
})

document.getElementById('chat-inputbox').onkeypress = (e) => {
    if (!e) {
        e = window.event;
    }
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter') {
        appendTextToChat();
        return false;
    }
}

const appendTextToChat = () => {
    const input = document.getElementById("chat-inputbox")
    if (input.value !== "") {
        const d = document.createElement("div")
        d.classList.add("message-user")
        const iv = input.value;
        d.innerText = iv;
        document.querySelector(".messages-list").appendChild(d);
        document.getElementById("chat-inputbox").value = "";
        document.querySelector(".chat-body").scrollTop = document.querySelector(".chat-body").scrollHeight;

        // now given user input, append the bot's response
        scanUserInput(iv)
    }
}

const scanUserInput = (uip) => {

    const possibleKeywords = ["niche", "community", "population", "immigration", "emigration", "keystone", "competition", "species"];

    let ifKeywordExists =
        possibleKeywords.map((item) => {
            return (uip.toLowerCase().includes(item))
        })
    // iterate over array to check if it includes a true value
    for (let i = 0; i < ifKeywordExists.length; i++) {
        if (ifKeywordExists[i] === true) {
            ifKeywordExists = true;
        }
    }
    // if still array containing values of false, then set value to false
    if (Array.isArray(ifKeywordExists)) {
        ifKeywordExists = false;
    }

    let fresponse = "";

    if (global === 0) {

        fresponse = "Hi " + uip + "! You can ask me anything about niches, competition, population, species, keystone species, immigration, emigration, and more. If you want to stop my service, you can type in 'goodbye' to exit the chatbot window."

        global++;

    } else if (ifKeywordExists) {
        fresponse = personalizedResponse(uip.toLowerCase());

    } else if (uip.toLowerCase() === "goodbye") {

        // goodbye method
        fresponse = goodbye();

        // close chatbot window
        setTimeout(() => {
            document.getElementById("chatbox").style.right = "-450px"
            document.getElementById("chatbox").style.transition = ".75s"
            setTimeout(() => {
                document.getElementById("chatbox").style.display = "none";
                document.getElementById("chat").children[0].src = "https://s3.us-west-2.amazonaws.com/calc.masa.space/speech-bubble.svg"
            }, 750)
        }, 1500)


    } else {
        // does not match anything
        fresponse = dunno();
    }

    const input = document.getElementById("chat-inputbox")
    const d = document.createElement("div")
    d.classList.add("message-bot")
    d.innerText = fresponse;

    setTimeout(() => {
        document.querySelector(".messages-list").appendChild(d);
        document.querySelector(".chat-body").scrollTop = document.querySelector(".chat-body").scrollHeight;
    }, 200)
}

// see if input contains
const personalizedResponse = (input) => {
    if (input.includes("niche")) {
        return niche(input);
    }
    else if (input.includes("competition")) {
        return competition(input);
    }
    else if (input.includes("population") || input.includes("community")) {
        return population(input);
    }
    else if (input.includes("immigration")) {
        return immigration(input);
    }
    else if (input.includes("emigration")) {
        return emigration(input);
    }
    else if (input.includes("keystone")) {
        return keystone(input);
    }
   
    else if (input.includes("species")) {
        return species(input);
    }
}

// unsure answer - dunno()
const dunno = () => {

    const dunnoResponses = ["Please rephrase your response.", "Sorry, I don't understand.", "I'm not sure.", "Can you ask another question? I don't understand.", "Sorry, I'm not sure."]

    const possibleQ = ["niches", "keystone species", "community", "populations", "competition", "immigration", "emigration", "species"]

    const x = "Maybe you can ask me a question about " + possibleQ[Math.floor(Math.random() * possibleQ.length)] + "?"

    return dunnoResponses[Math.floor(Math.random() * dunnoResponses.length)] + " " + x;
}

// goodbye func
const goodbye = () => {
    return "I hope I answered all the questions you had. Bye!"
}

//
// subfunctions for the personalizedResponse() method
//
const niche = (input) => {

    const r = ["if one more than one animal occupy the same niche?", "to give an example of a niche?", "how niches interact with each other?", "if more than one animal can occupy the same niche?"]

    if (input.includes("what is a niche") || input.includes("define niche") || input.includes("whats a niche") || input.includes("what's a niche") || input.includes("what are niches")) {
        return "A niche is the perfect environment in which an organism lives in." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("more than one animal")) {
        return "They compete until one species dies." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("example of niche") || input.includes("example of a niche")) {
        return "An example of a niche is a polar bear in Antarctica." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("interact with each other")) {
        return "They can interact with each other through abiotic conditions, food type, behavior." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("can more than one animal occupy the same niche")) {
        return "No." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else {
        return "A niche is the perfect environment in which an organism lives in."
    }
}


const population = (input) => {

    const r = ["if a population is smaller than a community?", "about the difference between a population and community?"]

    if (input.includes("define population") || input.includes("whats a population") || input.includes("what's a population") || input.includes("what is a population")) {
        return "A population is a group of the same species living in the same area." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("population smaller than")) {
        return "A population is smaller than a community." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("difference between")) {
        return "A population is a group of the same species living in the same area. A community is a group of different species living in the same area." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("community") || input.includes("define community") || input.includes("whats a community") || input.includes("what's a community") || input.includes("what is a community")) {
        return "A community is an interacting group of various species in a common location."
    } else {
        return "A population is a group of the same species living in the same area."
    }
}

const immigration = (input) => {

    if (input.includes("define immigration") || input.includes("whats immigration") || input.includes("what's immigration") || input.includes("what is immigration")) {
        return "Immigration is when the organism is moving into a new place. \n Maybe you can ask me what the difference between immigration and emigration is?"
    } else if (input.includes("difference between")) {
        return "Emigration is leaving an area and immigration is going into an area."
    } else {
        return "Immigration is when the organism is moving into a new place"
    }
}

const emigration = (input) => {
    if (input.includes("define emigration") || input.includes("whats emigration") || input.includes("what's emigration") || input.includes("what is emigration")) {
        return "Emigration is the place the organism is moving out of. \n Maybe you can ask me what the difference between immigration and emigration is?"
    } else if (input.includes("difference between")) {
        return "Emigration is leaving an area and immigration is going into an area."
    } else {
        return "Emigration is the place the organism is moving out of."
    }
}

const keystone = (input) => {

    const r = ["what happens when keystone species are removed?"];

    if (input.includes("define keystone") || input.includes("whats keystone") || input.includes("what's keystone") || input.includes("what is keystone") || input.includes("what are keystone")) {
        return "Keystone species are a species the entire ecosystem relies on, without the species the ecosystem would collapse. Both abiotic and biotic factors would be effected." + "\n Maybe you could ask me " + r[0]
    } else if (input.includes("removed")) {
        return "If the keystone species is removed from an environment, then the entire ecosystem will be destroyed since the keystone species is very important to the environment."
    } else {
        return "Keystone species are a species the entire ecosystem relies on, without the species the ecosystem would collapse. Both abiotic and biotic factors would be effected."
    }
}

const competition = (input) => {

    const r = ["when competition occurs?", "why competition is important?", "about the different types of competition?", "how competition affects the population?"];

    if (input.includes("define competition") || input.includes("whats competition") || input.includes("what's competition") || input.includes("what is competition")) {
        return "Competition is animals fighting for the same resources."  + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("competition occur")) {
        return "Competition occurs when two species occupy the same niche."  + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("necessary") || input.includes("important")) {
        return "Competition is important because of population control. It makes sure the population doesn't go over carrying capacity"  + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("different types") || input.includes("types")) {
        return "The different types of competition are competition for resources, food, habitat, and partners"  + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("how does competition affect the population") || input.includes("how does competition influence the population")) {
        return "Because it maintains equilibrium."  + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("how does competition affect an organism's niche") || input.includes("how does competition affect an organisms niche")) {
        return "Two organisms with the same niche would have to compete for same resources which would lead to less population of the worse species"  + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else {
        return "Competition is animals fighting for the same resources."
    }
}

const species = (input) => {

    const r = ["which species is the highest in the food chain?", "how species adapt?"];

    if (input.includes("define species") || input.includes("whats species") || input.includes("what's species") || input.includes("what is a species") || input.includes("what are species")) {
        return "A species is a type of living organism." + "\n Maybe you could ask me " + r[Math.floor(Math.random()*r.length)]
    } else if (input.includes("adapt")) {
        return "Species can adapt to competition through immigration, emigration, and evolution."
    } else if (input.includes("highest in the food chain") || input.includes("highest in food chain")) {
        return "Apex predators are highest in the food chain."
    } else {
        return "A species is a type of living organism."
    }
}
