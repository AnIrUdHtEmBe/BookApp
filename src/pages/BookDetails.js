import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import StarRating from "../components/StarRating";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isBookInList, setIsBookInList] = useState(false);
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useEffect(() => {
    async function fetchBook() {
      setIsLoading(true);
      try {
        const res = await fetch(
          "http://localhost:3005/book/books"
        );
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  useEffect(() => {
    if (book) {
      const bookList = JSON.parse(localStorage.getItem("bookList")) || [];
      const storedBook = bookList.find((b) => b.id === book.id);
      if (storedBook) {
        setIsBookInList(true);
      }

      const ratings = JSON.parse(localStorage.getItem("ratings")) || {};
      if (ratings[book.id]) {
        setUserRating(ratings[book.id].userRating || 0);
        countRef.current = ratings[book.id].countRatingDecisions || 0;
      }
    }
  }, [book]);

  const updateRating = (newRating) => {
    setUserRating(newRating);
    const ratings = JSON.parse(localStorage.getItem("ratings")) || {};
    ratings[book.id] = {
      userRating: newRating,
      countRatingDecisions: countRef.current,
    };
    localStorage.setItem("ratings", JSON.stringify(ratings));
  };

  const addToBookList = () => {
    const bookList = JSON.parse(localStorage.getItem("bookList")) || [];
    const existingBookIndex = bookList.findIndex((b) => b.id === book.id);
    if (existingBookIndex !== -1) {
      bookList.splice(existingBookIndex, 1);
      localStorage.setItem("bookList", JSON.stringify(bookList));
      setIsBookInList(false);
    } else {
      const newBook = { ...book };
      const newList = [...bookList, newBook];
      localStorage.setItem("bookList", JSON.stringify(newList));
      setIsBookInList(true);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  const {
    title,
    author,
    publication_year,
    image_url,
    page,
    genre,
    description,

  } = book.data;
  console.log(book,"4am");
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="flex flex-col sm:flex-row">
        <img
          className="w-full h-auto rounded sm:w-1/2 object-contain"
          src="https://picsum.photos/id/237/536/354"
          alt={`${title} cover`}
        />
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-2 text-gray-600">{author?.join(", ")}</p>
          <p className="mt-2 text-gray-600">{publication_year}</p>
          <p className="mt-4">{description}</p>
          <p className="mt-4 text-gray-600">Page count: {page}</p>
          <p className="mt-4 text-gray-600">Average rating: {description}</p>
          <div className="mt-4">
            <h3 className="text-lg font-bold">Rate this book:</h3>
            <StarRating
              maxRating={5}
              size={24}
              onSetRating={updateRating}
              initialRating={userRating}
              readOnly={false}
            />
            {userRating > 0 && (
              <p className="mt-2 text-gray-600">
                You rated this book {userRating} stars.
              </p>
            )}
            <button
              className={`mt-4 px-4 py-2 bg-green-600 text-white rounded`}
              onClick={addToBookList}
            >
              {isBookInList
                ? "Remove from My Book List"
                : "Add to My Book List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
