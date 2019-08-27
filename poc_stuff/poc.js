document.body.lang = 'en';
const log = document.querySelector('#log');
// log.innerHTML = document.body.lang;


//setTimeout(() => document.body.lang = 'pt', 2000);
setTimeout(() => {
	const li = document.querySelector('li:nth-child(1)');
	li.setAttribute('data-arg0', '999');

}, 2000);


//log.innerHTML = li || 'none';
