import { useNavigate } from "react-router-dom";

export default function Book({ book }) {
  const navigate = useNavigate();
  
  const { title, image_url, publication_year, author } = book;

  return (
    <li
      className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/book/${book.id}`)}
      onKeyPress={(e) => e.key === "Enter" && navigate(`/book/${book.id}`)}
      tabIndex={0}
      role="button"
    >
      <img
        className="w-full h-48 object-cover rounded"
          src={image_url}
        
        alt={`${title} cover`}
      />
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{author}</p>
        <p className="text-gray-600">Published: {publication_year}</p>
      </div>
    </li>
  );
}
