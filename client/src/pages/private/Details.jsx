import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThumbUpAlt, LiveTv, ControlPoint, AddBox } from "@mui/icons-material";
import { UserContext } from "UserContext";
import { Button } from "components/Button";
import { AutoComplete } from "components/Input";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const Video = ({ videos }) => {
  const index = Math.floor(Math.random() * videos.length);
  return (
    <div className="flex flex-col items-center justify-center">
      <iframe
        className="w-full h-96"
        src={`https://www.youtube.com/embed/${videos[index].key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

const AddMovieInPlaylistModal = ({
  movieId,
  title,
  poster_path,
  setShowAddPlaylist,
}) => {
  const { user } = useContext(UserContext);
  const { playlists } = user;
  const [playlistSelected, setPlaylistSelected] = useState(
    (playlists && playlists[0].name) || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playlistSelected) return;

    setShowAddPlaylist(false);

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const body = {
      playlistName: playlistSelected,
      movieId: movieId,
      title: title,
      poster_path: poster_path,
    };

    try {
      const { data } = await axios.put(
        `${global.API_ENDPOINT}/api/private/playlists/add-movie`,
        body,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center">
      <div className="bg-gray-100 rounded w-1/3 p-4 space-y-4">
        <div>
          <h2 className="text-4xl my-4">Ajouter à une playlist</h2>
        </div>
        <div className="flex items-center justify-center space-y-2">
          <AutoComplete
            options={playlists.map((playlist) => playlist.name)}
            value={playlistSelected}
            setValue={setPlaylistSelected}
          />
          <AddBox
            onClick={handleSubmit}
            color="success"
            className="cursor-pointer"
            style={{ fontSize: "3.5rem", marginBottom: "0.7rem" }}
          />
        </div>

        <div>
          <Button onClick={() => setShowAddPlaylist(false)}>Fermer</Button>
        </div>
      </div>
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
  id,
}) => {
  const handleClose = () => setShow(false);
  const [showAddPlaylist, setShowAddPlaylist] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center z-100">
      <div className="bg-gray-100 rounded md:w-1/2 w-full p-4">
        <div className="flex justify-end">
          <ControlPoint
            onClick={() => setShowAddPlaylist(!showAddPlaylist)}
            fontSize="large"
            className="cursor-pointer"
          />
        </div>
        <div>
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
        {showAddPlaylist && (
          <AddMovieInPlaylistModal
            movieId={id}
            title={title}
            poster_path={poster_path}
            setShowAddPlaylist={setShowAddPlaylist}
          />
        )}

        <div>
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
          <div className="m-4">
            <p className="overflow-y-auto h-36 text-center">{overview}</p>
          </div>
        </div>
        <div>
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
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="cursor-pointer">
        <ThumbUpAlt
          onClick={handleLike}
          style={{ color: like ? "red" : "white" }}
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
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="cursor-pointer z-1" onClick={handleAlreadySeen}>
        <LiveTv
          fontSize="large"
          style={{
            color: movieAlreadySeen ? "green" : "white",
          }}
        />
      </div>
    );
  };

  if (!poster_path) {
    return <div>No poster_path</div>;
  }

  return (
    <>
      <div className="my-3">
        <img
          className="mx-auto rounded-lg cursor-pointer"
          src={API_IMG + poster_path}
          onClick={handleShow}
        />
        <div className="flex justify-around items-center md:mt-0 mt-2">
          <div>
            <Like id={id} title={title} poster_path={poster_path} />
          </div>
          <div className="hidden md:block">
            <ShowMore />
          </div>
          <div className="flex justify-around items-center gap-x-4">
            <AlreadySeen id={id} title={title} poster_path={poster_path} />
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
            id,
          }}
        />
      )}
    </>
  );
};

export default Details;
