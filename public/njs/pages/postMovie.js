function ekUpload(id) {
  function fileDragHover(e) {
    const fileDrag = document.getElementById(`${id}-file-drag`);
    e.stopPropagation();
    e.preventDefault();
    fileDrag.className = e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
  }
  function output(msg) {
    const m = document.getElementById(`${id}-messages`);
    m.innerHTML = msg;
  }
  function parseFile(file) {
    output(`<strong>${file.name}</strong>`);
    const imageName = file.name;
    const isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
    if (isGood) {
      document.getElementById(`${id}-start`).classList.add('hidden');
      document.getElementById(`${id}-response`).classList.remove('hidden');
      document.getElementById(`${id}-notimage`).classList.add('hidden');
      document.getElementById(`${id}-file-image`).classList.remove('hidden');
      document.getElementById(`${id}-file-image`).src = URL.createObjectURL(file);
    } else {
      document.getElementById(`${id}-file-image`).classList.add('hidden');
      document.getElementById(`${id}-notimage`).classList.remove('hidden');
      document.getElementById(`${id}-start`).classList.remove('hidden');
      document.getElementById(`${id}-response`).classList.add('hidden');
      document.getElementById(`${id}-file-upload-form`).reset();
    }
  }
  function fileSelectHandler(e) {
    const fileSelect = document.getElementById(`${id}-file-upload`);
    if (e.dataTransfer !== undefined) {
      fileSelect.files = e.dataTransfer.files;
    }
    const { files } = fileSelect;
    fileDragHover(e);
    for (let i = 0, f; ; i++) {
      f = files[i];
      if (f) {
        parseFile(f);
      } else {
        break;
      }
    }
  }
  function Init() {
    const fileSelect = document.getElementById(`${id}-file-upload`);
    const fileDrag = document.getElementById(`${id}-file-drag`);
    const xhr = new XMLHttpRequest();
    fileSelect.addEventListener('change', fileSelectHandler, false);
    if (xhr.upload) {
      fileDrag.addEventListener('dragover', fileDragHover, false);
      fileDrag.addEventListener('dragleave', fileDragHover, false);
      fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  }

  if (window.File && window.FileList && window.FileReader) {
    Init();
  } else {
    document.getElementById(`${id}-file-drag`).style.display = 'none';
  }
}
ekUpload('vertical');
ekUpload('horizontal');
