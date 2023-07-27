import { useState } from "react";
const API_IMG = "https://image.tmdb.org/t/p/w500/";

const Details = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  if (!poster_path) {
    return <div>no poster_path</div>;
  }
  return (
    <div className="text-center my-3">
      <img className="mx-auto rounded-lg" src={API_IMG + poster_path} />
      <div className="my-4">
        <button
          type="button"
          className="bg-white text-gray-900 py-2 px-4 rounded"
          onClick={handleShow}
        >
          View More
        </button>
        {show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-container bg-gray-100 rounded w-1/3 p-4">
              <div className="modal-header">
                <h2 className="text-4xl my-4">{title}</h2>
              </div>
              <div className="modal-body">
                <img
                  className="mx-auto rounded-lg"
                  style={{ width: "14rem" }}
                  src={API_IMG + poster_path}
                />
                <h3>Vote : {vote_average} / 10</h3>
                <h4>
                  Date de sortie : {release_date.split("-").reverse().join("-")}
                </h4>
                <br />
                <h2 className="text-2xl my-4">Résumé</h2>
                <p>{overview}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="bg-gray-800 text-white py-2 px-4 rounded"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
