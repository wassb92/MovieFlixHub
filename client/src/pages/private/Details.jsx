import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThumbUpAlt, LiveTv, Done } from "@mui/icons-material";
import { UserContext } from "UserContext";

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
      />
    </div>
  );
};

const MovieModal = ({
  title,
  genres,
  poster_path,
  vote_average,
  vote_count,
  release_date,
  overview,
  video,
  setShow,
}) => {
  const handleClose = () => setShow(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center">
      <div className="modal-container bg-gray-100 rounded w-1/3 p-4">
        <div className="modal-header">
          <h2 className="text-4xl my-4">{title}</h2>
          <div className="flex flex-row justify-center">
            {genres &&
              genres.map((genre) => (
                <div className="bg-gray-800 text-white rounded-full px-3 mx-1 mb-4">
                  {genre}
                </div>
              ))}
          </div>
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
            Fermer
          </button>
        </div>
      </div>
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
  genres,
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

  const Like = ({ id, title, poster_path }) => {
    const { user } = useContext(UserContext);
    const { likedMovies } = user;
    const [like, setLike] = useState(
      likedMovies.some((movie) => movie.movieId === id)
    );

    const handleLike = async () => {
      setLike(!like);

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.put(
          `${global.API_ENDPOINT}/api/private/likedMovies`,
          { movieId: id, title, poster_path },
          config
        );
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="cursor-pointer">
        <ThumbUpAlt
          onClick={handleLike}
          color={like ? "error" : ""}
          fontSize="large"
        />
      </div>
    );
  };

  const ShowMore = () => {
    return (
      <div className="my-4">
        <button
          type="button"
          className="bg-white text-gray-900 py-2 px-4 rounded"
          onClick={handleShow}
        >
          Voir plus
        </button>
      </div>
    );
  };

  const AlreadySeen = () => {
    const { user } = useContext(UserContext);
    const { alreadySeen } = user;
    const [movieAlreadySeen, setMovieAlreadySeen] = useState(
      alreadySeen.some((movie) => movie.movieId === id)
    );

    const handleAlreadySeen = async () => {
      setMovieAlreadySeen(!movieAlreadySeen);

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.put(
          `${global.API_ENDPOINT}/api/private/alreadySeen`,
          { movieId: id, title, poster_path },
          config
        );
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div
        className="cursor-pointer"
        onClick={handleAlreadySeen}
        style={{
          position: "relative",
        }}
      >
        <LiveTv fontSize="large" />
        {movieAlreadySeen && (
          <Done
            color="success"
            style={{
              position: "absolute",
              top: "-4",
              right: "-10",
            }}
          />
        )}
      </div>
    );
  };

  if (!poster_path) {
    return <div>No poster_path</div>;
  }

  return (
    <>
      <div className="my-3">
        <img className="mx-auto rounded-lg" src={API_IMG + poster_path} />
        <div class="flex justify-around items-center">
          <div>
            <Like id={id} title={title} poster_path={poster_path} />
          </div>
          <div>
            <ShowMore />
          </div>
          <div class="flex justify-around items-center gap-x-4">
            <AlreadySeen id={id} title={title} poster_path={poster_path} />
            <div>04</div>
          </div>
        </div>
      </div>

      {show && (
        <MovieModal
          {...{
            title,
            genres,
            poster_path,
            vote_average,
            vote_count,
            release_date,
            overview,
            video,
            setShow,
          }}
        />
      )}
    </>
  );
};

export default Details;
