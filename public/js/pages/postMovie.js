"use strict";

function ekUpload(id) {
  function fileDragHover(e) {
    var fileDrag = document.getElementById("".concat(id, "-file-drag"));
    e.stopPropagation();
    e.preventDefault();
    fileDrag.className = e.type === 'dragover' ? 'hover' : 'modal-body file-upload';
  }

  function output(msg) {
    var m = document.getElementById("".concat(id, "-messages"));
    m.innerHTML = msg;
  }

  function parseFile(file) {
    output("<strong>".concat(file.name, "</strong>"));
    var imageName = file.name;
    var isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);

    if (isGood) {
      document.getElementById("".concat(id, "-start")).classList.add('hidden');
      document.getElementById("".concat(id, "-response")).classList.remove('hidden');
      document.getElementById("".concat(id, "-notimage")).classList.add('hidden');
      document.getElementById("".concat(id, "-file-image")).classList.remove('hidden');
      document.getElementById("".concat(id, "-file-image")).src = URL.createObjectURL(file);
    } else {
      document.getElementById("".concat(id, "-file-image")).classList.add('hidden');
      document.getElementById("".concat(id, "-notimage")).classList.remove('hidden');
      document.getElementById("".concat(id, "-start")).classList.remove('hidden');
      document.getElementById("".concat(id, "-response")).classList.add('hidden');
      document.getElementById("".concat(id, "-file-upload-form")).reset();
    }
  }

  function fileSelectHandler(e) {
    var fileSelect = document.getElementById("".concat(id, "-file-upload"));

    if (e.dataTransfer !== undefined) {
      fileSelect.files = e.dataTransfer.files;
    }

    var files = fileSelect.files;
    fileDragHover(e);

    for (var i = 0, f;; i++) {
      f = files[i];

      if (f) {
        parseFile(f);
      } else {
        break;
      }
    }
  }

  function Init() {
    var fileSelect = document.getElementById("".concat(id, "-file-upload"));
    var fileDrag = document.getElementById("".concat(id, "-file-drag"));
    var xhr = new XMLHttpRequest();
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
    document.getElementById("".concat(id, "-file-drag")).style.display = 'none';
  }
}

ekUpload('vertical');
ekUpload('horizontal');