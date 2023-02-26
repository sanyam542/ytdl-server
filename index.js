const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3001", ""],
  })
);
app.get("/load", async (req, res) => {
  const v_id = await ytdl.getURLVideoID(req.query.url);
  const info = await ytdl.getInfo(req.query.url);

  const file = await ytdl.downloadFromInfo(info);

  let data = {
    url: "https://www.youtube.com/embed/" + v_id,
    file: file,
    info: info.formats.sort((a, b) => {
      return a.mimeType < b.mimeType;
    }),
  };

  return res.send(data);
});

app.get("/download", async (req, res) => {
  var url = req.query.url;

  res.header("content-Disposition", 'attachment; filename="video.mp4');

  ytdl(url, { format: "mp4", quality: "highest" }).pipe(res);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
