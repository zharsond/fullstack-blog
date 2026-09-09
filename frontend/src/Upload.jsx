import { useState } from "react";

function Upload() {
  const [image, setImage] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); //biar ga auto refresh

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/upload-test", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data);
      alert("Upload successful!");
      setUploaded(data.file.path);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">Upload</button>

      <img src={`http://localhost:3000/${uploaded}`} alt="" />
    </form>
  );
}

export default Upload;