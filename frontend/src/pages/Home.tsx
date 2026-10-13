
import React from "react";
import Layout from "../components/Layout";
import { useSongData } from "../context/SongContext";
import AlbumCard from "../components/AlbumCard";
import SongCard from "../components/SongCard";
import Loading from "../components/Loading";

const Home = () => {
  const { albums, songs, loading } = useSongData();

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Featured Charts
        </h1>

        <div className="flex overflow-auto">
          {albums?.map((e) => (
            <AlbumCard
              key={e.id}
              image={e.thumbnail}
              name={e.title}
              desc={e.description}
              id={e.id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Today's biggest hits
        </h1>

        <div className="flex overflow-auto">
          {songs?.map((e) => (
            <SongCard
              key={e.id}
              image={e.thumbnail}
              name={e.title}
              desc={e.description}
              id={e.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
