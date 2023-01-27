let headerEl = document.getElementById('page-header');
let titleEl = document.getElementById('page-title');
let tagEl = document.getElementById('tag-line');
let landingPageEl = document.getElementById('landing-page');
let findOutButtonEl = document.getElementById('find-out-btn');
let mindsetEl = document.querySelector('.question-mindset');

findOutButtonEl.addEventListener('click', mindsetPage);

function mindsetPage(event) {
    event.preventDefault();    
    mindsetEl.classList.remove('hidden');
    landingPageEl.classList.add('hidden');
    tagEl.classList.add('hidden');
    titleEl.classList.add('text-white');
    headerEl.classList.replace('bg-blue-300', 'bg-blue-900');
    titleEl.textContent = 'Which best describes your current mindset?';
    titleEl.classList.replace('text-5xl', 'text-3xl');
    titleEl.classList.remove('italic');
    titleEl.classList.add('text-center');
};