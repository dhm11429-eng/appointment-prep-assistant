/* HTML Elements */
const patientForm = document.getElementById("patient-form");
const currentSymptoms = document.getElementById("current-symptoms");
const medicationList = document.getElementById("medication-list");
const medicationButton = document.getElementById("medication-button");
const patientQuestion = document.getElementById("patient-question");
const additionalConcerns = document.getElementById("additional-concerns");
const errorMessage = document.getElementById("error-message");
const summary = document.getElementById("summary");
const summaryContent = document.getElementById("content");
const summaryTitle = document.getElementById("summary-title");
const printButton = document.getElementById("print-button");

let medicationCount = 1;

/* Button logic to add new medication */
medicationButton.addEventListener("click", () => {
  medicationCount++;

  const entry = document.createElement("div");
  entry.className = "medication-entry";

  const label = document.createElement("label");
  label.htmlFor = `medication-${medicationCount}`;
  label.textContent = `Medication ${medicationCount}`;

  const input = document.createElement("input");
  input.type = "text";
  input.name = "medication";
  input.id = `medication-${medicationCount}`;
  input.placeholder = "Type your medication name here...";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Remove";
  deleteButton.className = "remove-medication";

  entry.append(label, input, deleteButton);
  medicationList.appendChild(entry);

  input.focus();
});

/* Button logic using event delegation to delete */
medicationList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-medication")) {
    event.target.closest(".medication-entry").remove();
  }
});

/* Create patient summary using form inputs */
function addSummarySection(heading, text) {
  const section = document.createElement("section");

  const title = document.createElement("h3");
  title.textContent = heading;

  const paragraph = document.createElement("p");
  paragraph.textContent = text || "None provided.";

  section.append(title, paragraph);
  summaryContent.appendChild(section);
}

/* Submit Button Logic */
patientForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const symptoms = currentSymptoms.value.trim();
  const questions = patientQuestion.value.trim();
  const concerns = additionalConcerns.value.trim();

  /* Error message logic for empty inputs */
  if (!symptoms || !questions) {
    errorMessage.textContent = "Please complete the required fields.";
    return;
  }

  errorMessage.textContent = "";
  // Create medication List
  const medications = [...medicationList.querySelectorAll("input")]
    .map((input) => input.value.trim())
    .filter((value) => value !== "");

  // Ensure there is no preious summary
  summaryContent.replaceChildren();

  // Add summary section
  addSummarySection("Current Symptoms", symptoms);
  addSummarySection(
    "Medications",
    medications.length ? medications.join(", ") : "None listed.",
  );
  addSummarySection("My Questions", questions);
  addSummarySection("Additional Concerns", concerns);

  // Show the summary and print button
  summary.hidden = false;
  printButton.hidden = false;

  // Change keyboard and screen reader focus to the summary section
  summaryTitle.focus();
});

// Open the browser print option
printButton.addEventListener("click", () => {
  window.print();
});
