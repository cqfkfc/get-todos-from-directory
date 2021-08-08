export function fetchData(files) {
  return new Promise((resolve) => {
    if (files.length === 0) {
      resolve({ data: [] });
    }

    const formData = new FormData();
    for (const i in files) {
      const file = files[i];
      const fileType = file.type.split("/")[0];
      // only accept text or application files, reject images/pdf
      // accept application files as MIME type for javascript is application.
      if (fileType === "text" || fileType === "application")
        formData.append(file.name, file);
    }
    fetch("/api/upload/files", {
      method: "POST",
      body: formData,
    }).then((res) => resolve(res.json()));
  });
}
