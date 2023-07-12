/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
const container = document.querySelector('.cardsContainer');

const setBg = () => {
	let localStorFav = localStorage.getItem('favorites');
	const items = Array.from(container.children);
	items.forEach((item) => {
		localStorFav.includes(item.id) ? item.classList.add('red') : item.classList.remove('red');
	})
}

const addStorage = (id) => {
	let localStorFav = localStorage.getItem('favorites');
	if (localStorFav || typeof localStorFav === 'string') {
		if (localStorFav.length > 0) {
			let newItem = localStorFav += `,${id}`;
			localStorage.setItem('favorites', newItem);
		} else {
			localStorage.setItem('favorites', id);
		}
	} else if (localStorFav === null) {
		localStorage.setItem('favorites', id);
	}
}

const removeStorage = (id) => {
	let localStorFav = localStorage.getItem('favorites').split(',');
	localStorFav.splice(localStorFav.indexOf(id), 1).join(',');
	localStorage.setItem('favorites', localStorFav);
}

container.addEventListener('click', function(e) {
	let localStorFav = localStorage.getItem('favorites');
	const item = e.target;
	console.log(typeof item.id);
	if (localStorFav === null) {
		addStorage(item.id);
	} else if (localStorFav.includes(item.id) && item.id.length > 0) {
		removeStorage(item.id);
	} else if (!localStorFav.includes(item.id) && item.id.length > 0) {
		addStorage(item.id);
	}
	setBg();
})

if (localStorage.getItem('favorites')) {
	setBg();
}
