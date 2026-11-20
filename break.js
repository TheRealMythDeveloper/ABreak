
//get list of all hidden text
const thoughts = document.querySelectorAll(".BeforeScroll");


function checkforscroll() {
    thoughts.forEach(thought => {
        const position = thought.getBoundingClientRect();

        if (position.top < window.innerHeight * 0.8) {
            thought.classList.add("AfterScroll");

         }     

    });

}

window.addEventListener("scroll", checkforscroll);

checkforscroll();