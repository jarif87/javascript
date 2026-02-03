// script.js
const pdf1Input = document.getElementById("pdf1");
const pdf2Input = document.getElementById("pdf2");
const pdf1Name = document.getElementById("pdf1-name");
const pdf2Name = document.getElementById("pdf2-name");
const mergeBtn = document.getElementById("mergeBtn");
const btnText = document.getElementById("btn-text");
const status = document.getElementById("status");
const progressCont = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const downloadLink = document.getElementById("downloadLink");

let pdf1File = null;
let pdf2File = null;

pdf1Input.addEventListener("change", (e) => {
  pdf1File = e.target.files[0];
  pdf1Name.textContent = pdf1File ? pdf1File.name : "No file chosen";
  checkReady();
});

pdf2Input.addEventListener("change", (e) => {
  pdf2File = e.target.files[0];
  pdf2Name.textContent = pdf2File ? pdf2File.name : "No file chosen";
  checkReady();
});

function checkReady() {
  const ready = pdf1File && pdf2File;
  mergeBtn.disabled = !ready;
  if (!ready) {
    progressCont.style.display = "none";
    status.textContent = "";
  }
}

mergeBtn.addEventListener("click", async () => {
  if (!pdf1File || !pdf2File) return;

  try {
    mergeBtn.disabled = true;
    btnText.textContent = "Merging...";
    status.textContent = "Preparing files...";
    progressCont.style.display = "block";
    progressBar.style.width = "10%";

    const pdf1Bytes = await pdf1File.arrayBuffer();
    progressBar.style.width = "30%";

    const pdf2Bytes = await pdf2File.arrayBuffer();
    progressBar.style.width = "50%";

    status.textContent = "Loading PDFs...";

    const pdf1 = await PDFLib.PDFDocument.load(pdf1Bytes);
    progressBar.style.width = "65%";

    const pdf2 = await PDFLib.PDFDocument.load(pdf2Bytes);
    progressBar.style.width = "80%";

    const mergedPdf = await PDFLib.PDFDocument.create();
    status.textContent = "Combining pages...";

    const pages1 = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
    pages1.forEach((p) => mergedPdf.addPage(p));

    const pages2 = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
    pages2.forEach((p) => mergedPdf.addPage(p));

    progressBar.style.width = "95%";

    const mergedBytes = await mergedPdf.save();
    progressBar.style.width = "100%";

    const blob = new Blob([mergedBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = "merged-document.pdf";
    downloadLink.style.display = "block";

    status.textContent = "Done! Your merged PDF is ready ↓";
    btnText.textContent = "Merge Again";
  } catch (err) {
    status.textContent = "Error occurred. Try again.";
    console.error(err);
    progressBar.style.width = "0%";
    progressCont.style.display = "none";
  } finally {
    mergeBtn.disabled = false;
  }
});
