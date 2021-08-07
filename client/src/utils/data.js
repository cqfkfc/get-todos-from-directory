

export function fetchData(files) {
  return new Promise((resolve) => {
    if (files.length === 0) {
      resolve({ data: [] });
    }
    const formData = new FormData();
    for (const i in files) {
      const file = files[i];
      formData.append(file.name, file);
    }
    fetch("/api/upload/files", {
      method: "POST",
      body: formData,
    }).then((res) => resolve(res.json()));
  });
}
