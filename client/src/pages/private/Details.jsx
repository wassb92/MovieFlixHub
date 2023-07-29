import React, { useState, useEffect } from "react";
import axios from "axios";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const Video = ({ videos }) => {
  const index = Math.floor(Math.random() * videos.length);
  console.log("index", index);
  return (
    <div className="flex flex-col items-center justify-center">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videos[index].key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

const Details = ({
  title,
  poster_path,
  vote_average,
  vote_count,
  release_date,
  overview,
  id,
}) => {
  const [show, setShow] = useState(false);
  const [video, setVideo] = useState();

  const fetchVideo = async () => {
    const url = `${global.TMDB_API}/movie/${id}/videos?api_key=${global.API_KEY}&include_video_language=fr`;

    try {
      const res = await axios.get(url);
      const data = await res.data.results;
      setVideo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

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
                <h3>
                  Vote : {vote_average} / 10 ({vote_count} votes)
                </h3>
                <h4>
                  Date de sortie : {release_date.split("-").reverse().join("-")}
                </h4>
                <br />
                {video.length ? (
                  <Video videos={video} />
                ) : (
                  <div>Aucune vidéo disponible pour le moment</div>
                )}
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
