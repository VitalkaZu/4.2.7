const searchInput = document.querySelector(".search-form__search-input");
const autoComplete = document.querySelector(".auto-complete");
const listRepo = document.querySelector(".list-repo");

async function loadData(name) {
    const resultLoad = await fetch(`https://api.github.com/search/repositories?q=${name}&sort=stars&order=desc&per_page=5`);
    const arrResult = await resultLoad.json();
    console.log(arrResult);
    clear(autoComplete);
     const listSearch = document.createElement("ul");
     listSearch.classList.add("list-search");
     if(arrResult.items) {
         arrResult.items.forEach(item => {
                 const rowSearch = document.createElement("li");
                 rowSearch.classList.add("item-search");
                 rowSearch.textContent = item.name;
                 rowSearch.addEventListener("click",()=> {
                     // console.log(item.stargazers_count);
                     clear(autoComplete);
                     searchInput.value = "";
                     addCardRepo(item.name, item.owner.login, item.stargazers_count);
                 })
                 listSearch.appendChild(rowSearch);
             }
         )
     }
    autoComplete.appendChild(listSearch);
}

function clear(domElem) {
    domElem.innerHTML = "";
}

const debouncePrintInputValue = debounce(printInputValue, 500);
searchInput.addEventListener("input", debouncePrintInputValue)

function printInputValue () {
    if(searchInput.value) {
        loadData(searchInput.value);
        console.log(searchInput.value);
    } else clear(autoComplete);
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

function addCardRepo(name, owner, stars) {
    const cardRepo = document.createElement("div");
    cardRepo.classList.add("item-repo");
    cardRepo.innerHTML = `<div class="item-repo__text"><p>Name: ${name}</p>
                            <p>Owner: ${owner}</p>
                            <p>Stars: ${stars}</p>
                            </div>
                            <div class="delete-icon"></div>`
    listRepo.appendChild(cardRepo);
}

listRepo.onclick = function(event) {
    if (event.target.className == "delete-icon") {
        let item = event.target.closest('.item-repo');
        if (!item) return;
        if (!listRepo.contains(item)) return;
        item.remove();
    }
};