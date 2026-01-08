
let books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';



function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return { id, title, author, year: Number(year), isComplete };
}



function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    books = data;
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}



function updateStats() {
  const total = books.length;
  const read = books.filter(b => b.isComplete).length;
  const unread = total - read;

  document.getElementById('totalBooks').innerText = total;
  document.getElementById('readBooks').innerText = read;
  document.getElementById('unreadBooks').innerText = unread;
}

function sortBooks(type) {
  const sortValue = type === 'complete' ? 
    document.getElementById('sortComplete').value : 
    document.getElementById('sortIncomplete').value;

  books.sort((a, b) => {
    return sortValue === 'newest' ? b.year - a.year : a.year - b.year;
  });

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBookElement(bookObject) {
  const container = document.createElement('div');
  container.classList.add('book-item');
  container.setAttribute('data-bookid', bookObject.id);
  container.setAttribute('data-testid', 'bookItem');

  container.innerHTML = `
    <h3 data-testid="bookItemTitle">${bookObject.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${bookObject.author}</p>
    <p data-testid="bookItemYear">Tahun: ${bookObject.year}</p>
    <div class="button-group">
      <button class="btn" style="background-color: ${bookObject.isComplete ? '#f1f5f9' : '#ecfdf5'}; color: ${bookObject.isComplete ? '#64748b' : '#10b981'}; border: 1px solid ${bookObject.isComplete ? '#e2e8f0' : '#a7f3d0'}" 
        onclick="toggleStatus(${bookObject.id})" data-testid="bookItemIsCompleteButton">
        ${bookObject.isComplete ? 'Belum Selesai' : 'Selesai Dibaca'}
      </button>
      <button class="btn" style="background-color: #fffbeb; color: #f59e0b; border: 1px solid #fef3c7" 
        onclick="editBook(${bookObject.id})" data-testid="bookItemEditButton">Edit</button>
      <button class="btn" style="background-color: #fef2f2; color: #ef4444; border: 1px solid #fecaca" 
        onclick="removeBook(${bookObject.id})" data-testid="bookItemDeleteButton">Hapus</button>
    </div>
  `;

  return container;
}



function toggleStatus(bookId) {
  const bookTarget = books.find(b => b.id === bookId);
  if (bookTarget) {
    bookTarget.isComplete = !bookTarget.isComplete;
    saveData();
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
}

function removeBook(bookId) {
  if (confirm('Yakin ingin menghapus buku ini?')) {
    books = books.filter(b => b.id !== bookId);
    saveData();
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
}

function editBook(bookId) {
  const bookTarget = books.find(b => b.id === bookId);
  if (bookTarget) {
    document.getElementById('bookFormTitle').value = bookTarget.title;
    document.getElementById('bookFormAuthor').value = bookTarget.author;
    document.getElementById('bookFormYear').value = bookTarget.year;
    document.getElementById('bookFormIsComplete').checked = bookTarget.isComplete;
    
    document.getElementById('bookForm').setAttribute('data-edit-id', bookId);
    document.getElementById('formTitle').innerText = "Edit Buku";
    document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
  }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  const bookForm = document.getElementById('bookForm');
  const searchForm = document.getElementById('searchBook');

  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = bookForm.getAttribute('data-edit-id');
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    if (editId) {
      const index = books.findIndex(b => b.id === Number(editId));
      books[index] = generateBookObject(Number(editId), title, author, year, isComplete);
      bookForm.removeAttribute('data-edit-id');
      document.getElementById('formTitle').innerText = "Tambah Buku Baru";
    } else {
      books.push(generateBookObject(generateId(), title, author, year, isComplete));
    }

    bookForm.reset();
    saveData();
    document.dispatchEvent(new Event(RENDER_EVENT));
  });

 
  document.getElementById('searchBookTitle').addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredBooks = books.filter(b => b.title.toLowerCase().includes(keyword));
    renderWithData(filteredBooks);
  });

  if (isStorageExist()) loadDataFromStorage();
});

function renderWithData(dataToRender) {
  const incompleteList = document.getElementById('incompleteBookList');
  const completeList = document.getElementById('completeBookList');
  
  incompleteList.innerHTML = '';
  completeList.innerHTML = '';

  for (const book of dataToRender) {
    const el = makeBookElement(book);
    if (book.isComplete) completeList.append(el);
    else incompleteList.append(el);
  }
  updateStats();
}

document.addEventListener(RENDER_EVENT, () => {
  renderWithData(books);
});