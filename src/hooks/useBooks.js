import { useState, useEffect } from "react";

const KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export function useBooks(query) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      setError(null);

      try {
        const subjects = [
          "science",
          "history",
          "biography",
          "philosophy",
          "technology",
        ];
        const randomSubject =
          subjects[Math.floor(Math.random() * subjects.length)];

        const url = query
          ? "https://bookappbackend-production.up.railway.app/book/books"
          : "https://bookappbackend-production.up.railway.app/book/books";

        const res = await fetch(url);
        console.log(res,"new rizzz");
        
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

        const efgh = await res.json();
        setBooks(efgh.data || []);
        console.log(efgh.data,"efghDATA");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, [query]);
  
  
  return { books, isLoading, error };
}
