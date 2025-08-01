const API_URL = 'https://bookstore-api-six.vercel.app/api/books';

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

function fetchBooks() {
    fetch(API_URL)
    .then(Response => Response.json())
    .then(data => {
        console.log('API returned:', data);
        data.forEach(book => renderBook(book));
        })
    .catch((error) => { console.error('Error fetching books:', error); });
}


function renderBook(book) {
    const pastelColors = [
    'bg-[#f7e6da]', // soft peach
    'bg-[#f1e8dc]', // warm parchment
    'bg-[#e3e1d5]', // soft mossy gray
    'bg-[#f8ebd8]', // buttercream ivory
    'bg-[#eedfe0]', // rose-tinted cream
    'bg-[#e8d4c3]', // warm tan
    'bg-[#d9e4dc]', // muted mint
    'bg-[#f6e7b7]', // soft gold
    'bg-[#f1eee9]'  // off-white beige
    ];
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    const bookDiv = document.createElement('div');
    const container = document.getElementById('books-container');
    
    bookDiv.className = `
             ${randomColor} book-card w-70 h-48 flex items-center justify-center text-ex font-bold text-brown-800 transform rotate-180  writing-vertical relative`;

    bookDiv.className = `
            ${randomColor} book-card w-70 h-60 rounded shadow-sm
            flex flex-col justify-between items-center 
            text-brown-800 font-semibold
            relative p-2 shadow-sm text-center  hover:shadow-lg transition-transform duration-300 ease-in-out hover:--translate-y-1 hover:rotate-1`;

    bookDiv.innerHTML = `
            <p class="text-sm font-semibold text-center justify-center whitespace-pre-line leading-tight mt-auto mb-auto">${book.title.replace(/ /g, '\n')}</p>
            <p class="text-[10px] italic text-center mt-auto">${book.author}</p>
            <button class="absolute top-1 right-1 text-[10px] text-red-500" data-id="${book.id}">X</button>
        `;

    container.appendChild(bookDiv);

}



document.getElementById('book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();

    console.log('Submitting book:', { title, author });
    
    if (!title || !author) {
        alert('Please fill in both fields.');
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(newBook => {
        renderBook(newBook);
        event.target.reset();
    })
        .catch(error => console.error('Error adding book:', error));
    });

    document.getElementById('books-container').addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.id) {
            const bookId = event.target.dataset.id;
            fetch(`${API_URL}/${bookId}`, {
                method: 'DELETE'
            })
            .then(() => {
                event.target.parentElement.remove();
            })
        }});