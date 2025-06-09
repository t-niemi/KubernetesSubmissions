import axios from "axios";
import { createWriteStream, ReadStream } from "fs";
import stream from "stream";
import { promisify } from "util";

const finished = promisify(stream.finished);

async function download(fileUrl: string, outputLocationPath: string) {
  const writer = createWriteStream(outputLocationPath);
  writer.on("error", (_err) => {});
  const response = await axios<ReadStream>({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  });
  response.data.pipe(writer);
  return await finished(writer);
}

export default download;
