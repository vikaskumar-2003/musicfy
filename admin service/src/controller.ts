import cloudinary from "cloudinary";
import type { Request, Response } from "express";
import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import { sql } from "./config/db.js";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
  };
}

export const addAlbum = TryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    if (req.user?.role !== "admin") {
      res.status(401).json({
        message: "You are not admin",
      });

      return;
    }

    const { title, description } = req.body;
    console.log("body", req.body);

    const file = req.file;

    if (!file) {
      res.status(400).json({
        message: "No file to upload",
      });

      return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      return res.status(500).json({
        message: "failded to generate file buffer",
      });
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
      folder: "albums",
    });

    const result = await sql`
   INSERT INTO albums (title,description,thumbnail) VALUES(${title},${description},${cloud.secure_url}) RETURNING *
   `;
    res.json({
      message: "album created",
      album: result[0],
    });
  },
);

export const addSong = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    return res.status(401).json({
      message: "You are not admin",
    });
  }

  const { title, description, album } = req.body;

  const isAlbum = await sql`
     SELECT * FROM albums WHERE id=${album}
    `;
  if (isAlbum.length === 0) {
    res.status(404).json({
      message: "No file to upload",
    });
  }

  const file = req.file;

  if (!file) {
    res.status(400).json({
      message: "No file to upload",
    });

    return;
  }

  const fileBuffer = getBuffer(file);

  if (!fileBuffer || !fileBuffer.content) {
    return res.status(500).json({
      message: "",
    });
  }

  const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
    folder: "songs",
    resource_type: "video",
  });

  const result = await sql`
    INSERT INTO songs (title,description,audio,album_id) VALUES
    (${title},${description},${cloud.secure_url},${album})
   `;

  res.json({
    message: "Song Added",
  });
});

export const addThumbnail = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    return res.status(401).json({
      message: "You are not admin",
    });
  }

  const song = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`;

  if (song.length === 0){
    return res.status(400).json({
      message: "no song with this id",
    });
  }

  const file = req.file;

  if (!file) {
    res.status(400).json({
      message: "No file to upload",
    });

    return;
  }

  const fileBuffer = getBuffer(file);

  if (!fileBuffer || !fileBuffer.content) {
    return res.status(500).json({
      message: "",
    });
  }

  const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);

  const result = await sql`
  UPDATE songs SET thumbnail =${cloud.secure_url} WHERE id =${req.params.id} RETURNING * `;

  res.json({
    message: "Thumbnail added",
    song: result[0],
  });
});

export const deleteAlbum = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (req.user?.role !== "admin") {
    res.status(401).json({
      message: "you are not admin",
    });
    return;
  }

  const { id } = req.params;

  await sql`DELETE FROM songs WHERE album_id = ${id}`;

  await sql`DELETE FROM albums WHERE id =${id}`;

  const isAlbum = await sql`
     SELECT * FROM albums WHERE id=${id}
    `;
  if (isAlbum.length === 0) {
    res.status(404).json({
      message: "No album with this id",
    });
  }

  res.json({
    message: "Album deleted successfully",
  });
});


export const deleteSong=TryCatch(async(req:AuthenticatedRequest,res)=>{

     if (req.user?.role !== "admin") {
    res.status(401).json({
      message: "you are not admin",
    });
    return;
  }


  const {id}=req.params

   const isAlbum = await sql`
     SELECT * FROM albums WHERE id=${id}
    `;
  if (isAlbum.length === 0) {
    res.status(404).json({
      message: "No song with this id",
    });
  }


  await sql`DELETE FROM songs WHERE id=${id}`

  res.json({
    message:"songs delted successfully"
  })

})
