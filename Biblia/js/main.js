let bibleData;

// Cargar datos del archivo JSON local
fetch('./rvr1960.json')
  .then(response => response.json())
  .then(data => {
    bibleData = data;
    console.log("Biblia RVR1960 cargada correctamente");
  })
  .catch(() => alert("Error al cargar el archivo JSON."));

// Array de libros en español según tu archivo JSON
const BOOKS_SPANISH = [
  "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio", 
  "Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel", 
  "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas", 
  "Esdras", "Nehemías", "Ester", "Job", "Salmos", 
  "Proverbios", "Eclesiastés", "Cantares", "Isaías", 
  "Jeremías", "Lamentaciones", "Ezequiel", "Daniel", 
  "Oseas", "Joel", "Amós", "Abdías", "Jonás", 
  "Miqueas", "Nahúm", "Habacuc", "Sofonías", 
  "Hageo", "Zacarías", "Malaquías", "Mateo", 
  "Marcos", "Lucas", "Juan", "Hechos", 
  "Romanos", "1 Corintios", "2 Corintios", 
  "Gálatas", "Efesios", "Filipenses", 
  "Colosenses", "1 Tesalonicenses", "2 Tesalonicenses", 
  "1 Timoteo", "2 Timoteo", "Tito", 
  "Filemón", "Hebreos", "Santiago", 
  "1 Pedro", "2 Pedro", "1 Juan", 
  "2 Juan", "3 Juan", "Judas", "Apocalipsis"
];

// Llenar el select con los libros en español
document.addEventListener("DOMContentLoaded", () => {
    const bookInput = document.getElementById("book");
    const chapterInput = document.getElementById("chapter");
    const verseInput = document.getElementById("verse");
    const searchBtn = document.getElementById("search-btn");
    const verseDisplay = document.getElementById("verse-display");
  
    searchBtn.addEventListener("click", () => {
      const book = bookInput.value.trim();
      const chapter = parseInt(chapterInput.value);
      const verse = parseInt(verseInput.value);
  
      if (book && chapter > 0 && verse > 0) {
        verseDisplay.textContent = `Buscando: ${book} ${chapter}:${verse}`;
      } else {
        verseDisplay.textContent = "Por favor, ingrese datos válidos.";
      }
    });
  });

// Manejo de búsqueda de versículos
document.getElementById("search-btn").addEventListener("click", () => {
  const bookIndex = document.getElementById("book").value;
  const chapter = parseInt(document.getElementById("chapter").value) - 1;
  const verse = parseInt(document.getElementById("verse").value) - 1;
  const display = document.getElementById("verse-display");

  if (bookIndex === "" || chapter < 0 || verse < 0) {
    display.textContent = "Por favor, completa todos los campos correctamente.";
    return;
  }

  const bookData = bibleData[bookIndex];
  const bookName = bookData.book;

  if (chapter >= bookData.chapters.length || chapter < 0) {
    display.textContent = `Capítulo no encontrado en ${bookName}.`;
    return;
  }

  const chapterData = bookData.chapters[chapter];

  if (verse >= chapterData.length || verse < 0) {
    display.textContent = `Versículo no encontrado en ${bookName} ${chapter + 1}.`;
    return;
  }

  const verseText = chapterData[verse];
  display.innerHTML = `<strong>${bookName} ${chapter + 1}:${verse + 1}</strong> - "${verseText}"`;
});