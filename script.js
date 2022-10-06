const searchInput = document.querySelector(".search-form__search-input");
const autoComplete = document.querySelector(".auto-complete");




const url = "https://api.github.com/search/repositories?q=tetris&sort=stars&order=desc&per_page=2";




async function loadData(name) {
    const resultLoad = await fetch(`https://api.github.com/search/repositories?q=${name}&sort=stars&order=desc&per_page=5`);
    console.log(resultLoad);
    const arrResult = await resultLoad.json();
    autoComplete.innerHTML = "";
     const listSearch = document.createElement("ul");
     if(arrResult.items) {
         arrResult.items.forEach(item => {
                 const rowSearch = document.createElement("li");
                 rowSearch.classList.add("item-search");
                 rowSearch.textContent = item.name;
                 listSearch.appendChild(rowSearch);
             }
         )
     }

    autoComplete.appendChild(listSearch);
    // console.log(arrResult.items)
    //
    // arrResult.then(result => {
    //     console.log(result.items);
    //     // result.items.forEach(item => {
    //     //     autoComplete.appendChild(item.name)
    //     // })
    // })
    //

    // resultLoad.then(response =>{
    //     const arrResult = response.json();
    //     arrResult.then(result => {
    //         console.log(result.items);
    //         // result.items.forEach(item => {
    //         //     autoComplete.appendChild(item.name)
    //         // })
    //     })
    //     // response.forEach(item => {
    //     //     autoComplete.appendChild(response.json())
    //     // })
    //
    //     console.log(arrResult);
    // }).catch ((e) => {
    //     console.log(e)
    // })
}


const debouncePrintInputValue = debounce(printInputValue, 500);

searchInput.addEventListener("input", debouncePrintInputValue)

function printInputValue () {
    if(searchInput.value) {
        loadData(searchInput.value);
        console.log(searchInput.value);
    }
}

function debounce (func, timeInterval) {
    return function debounceFunc(...arg) {
        const prevCall = this.lastCall
        this.lastCall = Date.now();

        if (prevCall && prevCall - this.lastCall <= timeInterval) {
            clearTimeout(this.lastCallTimer)
        }
        this.lastCallTimer = setTimeout(() => func(...arg),timeInterval);
    }
}