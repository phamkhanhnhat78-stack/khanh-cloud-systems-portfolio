const scenes = {
  "scene-a": {
    title: "Scene A: Street entrance + café floor / network and frontend layer",
    image: "assets/cloud-cafe-network.png",
    alt: "Cloud Café front floor with street entrance, customer area, counter, and cats."
  },
  "scene-b": {
    title: "Scene B: Inventory warehouse / storage layer",
    image: "assets/cloud-cafe-storage.png",
    alt: "Cloud Café warehouse with staff counting stock, shelves, boxes, and a small mouse thief."
  },
  "scene-c": {
    title: "Scene C: Manager office / orders, access, encryption, and operations",
    image: "assets/cloud-cafe-office.png",
    alt: "Cloud Café manager office with ledgers, order cards, laptop, locks, and secure operations tools."
  }
};

const issues = [
  { id: "door-path", sceneKey: "scene-a", title: "Street route is broken", instruction: "The street-to-door route is visibly broken. Click the unnatural route object to reconnect outside traffic.", fixedTitle: "You fixed the network route.", real: "Customers outside could not reach the café entrance because the path from the street was broken.", cloud: "This is similar to a public subnet missing a route to an Internet Gateway. Without the route table entry, external users cannot reach public resources.", services: "Amazon VPC, Route Tables, Internet Gateway, Public Subnet" },
  { id: "open-sign", sceneKey: "scene-a", title: "Wrong customer-facing sign", instruction: "A CLOSED placard appears in the operating front-of-house scene. Click it to correct the customer endpoint.", fixedTitle: "You corrected the customer endpoint.", real: "Customers thought the café was closed because the public-facing sign pointed them to the wrong state.", cloud: "This is similar to DNS or domain routing pointing users to the wrong endpoint or unavailable service.", services: "Route 53, DNS, CloudFront or Load Balancer DNS name", textClass: "sign-text", textValue: "OPEN" },
  { id: "guard", sceneKey: "scene-a", title: "Door rule blocks normal visitors", instruction: "A BLOCKED barrier appears at the customer entrance. Click it to allow normal frontend traffic.", fixedTitle: "You adjusted the access rule.", real: "The café was open, but the door rule blocked ordinary customers from entering.", cloud: "This is similar to an overly restrictive Security Group inbound rule that blocks legitimate web traffic.", services: "Security Groups, Inbound Rules, EC2 or Load Balancer" },
  { id: "chair", sceneKey: "scene-a", title: "Frontend path is obstructed", instruction: "A hazard cone appears in the customer walking path. Click it to clear the route from entrance to service counter.", fixedTitle: "You cleared the frontend path.", real: "Customers entered the café but could not reach the service counter smoothly.", cloud: "This is similar to frontend traffic reaching the edge but failing before the application because a rule or routing hop blocks it.", services: "Network ACL, Security Groups, Load Balancer Target Group" },
  { id: "storage-box", sceneKey: "scene-b", title: "Storage box has no label", instruction: "A question mark appears on an inventory box. Click it to label and organize the storage object.", fixedTitle: "You organized the storage object.", real: "Staff could not tell which box contained which stock because the inventory object had no label.", cloud: "This is similar to organizing S3 buckets and objects with clear naming, prefixes, tags, and access boundaries.", services: "Amazon S3, object prefixes, tags, IAM Policy" },
  { id: "log-book", sceneKey: "scene-b", title: "Mouse thief leaves no audit trail", instruction: "A NO LOGS marker appears near the warehouse thief corner. Click it to start recording suspicious storage activity.", fixedTitle: "You enabled storage audit records.", real: "When stock went missing, staff needed records showing what changed and when.", cloud: "This is similar to enabling object-level audit and operational logs so teams can investigate unusual storage access.", services: "CloudTrail data events, CloudWatch Logs, S3 server access logs" },
  { id: "register", sceneKey: "scene-c", title: "Order system is offline", instruction: "The manager office order system shows OFF. Click it to restore order processing.", fixedTitle: "You restored order processing.", real: "Customer orders reached the office, but the system used to process them was unavailable.", cloud: "This is similar to an application service, EC2 process, or backend worker being stopped or unhealthy.", services: "EC2, application service health, CloudWatch" , textClass: "register-text", textValue: "ON" },
  { id: "order-pile", sceneKey: "scene-c", title: "Orders arrive faster than staff can process", instruction: "A 99+ order overflow appears on the manager desk. Click it to buffer the order workload.", fixedTitle: "You buffered the order workload.", real: "Too many customer orders arrived at once, so the manager needed a safe queue.", cloud: "This is similar to using a message queue to absorb spikes and decouple producers from workers.", services: "Amazon SQS, asynchronous processing, decoupling" },
  { id: "staff-pass", sceneKey: "scene-c", title: "Manager access is not secure", instruction: "A NO ACCESS pass appears in the office security area. Click it to grant controlled admin access.", fixedTitle: "You granted secure admin access.", real: "The manager needed controlled access to private operations without exposing the back office publicly.", cloud: "This is similar to using IAM roles and Systems Manager Session Manager to reach private resources without public SSH.", services: "IAM Role, Systems Manager Session Manager, Private EC2" },
  { id: "coffee-machine", sceneKey: "scene-c", title: "Order data is not encrypted", instruction: "A warning badge appears near the office laptop and lock area. Click it to protect the order data.", fixedTitle: "You protected sensitive order data.", real: "Customer order records should be protected before they are stored or sent.", cloud: "This is similar to encrypting data at rest and in transit so stored records and messages are not exposed.", services: "AWS KMS, TLS, S3 encryption, encrypted application secrets" }
];

const clickableObjects = Array.from(document.querySelectorAll(".cafe-object"));
const cafeStage = document.querySelector(".cafe-stage");
const sceneArt = document.getElementById("scene-art");
const issueTitle = document.getElementById("issue-title");
const issueInstruction = document.getElementById("issue-instruction");
const sceneTitle = document.getElementById("scene-title");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");
const newIssueButton = document.getElementById("new-issue-button");
const previousIssueButton = document.getElementById("previous-issue-button");
const nextIssueButton = document.getElementById("next-issue-button");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalNewIssue = document.getElementById("modal-new-issue");
const modalTitle = document.getElementById("modal-title");
const modalReal = document.getElementById("modal-real");
const modalCloud = document.getElementById("modal-cloud");
const modalServices = document.getElementById("modal-services");
let currentIssue = null;
let currentIssueIndex = 0;

function objectById(id) {
  return clickableObjects.find((item) => item.dataset.object === id);
}

function resetText() {
  const openSign = objectById("open-sign");
  const register = objectById("register");
  if (openSign) openSign.querySelector(".sign-text").textContent = "CLOSED";
  if (register) register.querySelector(".register-text").textContent = "OFF";
}

function renderIssue(issue) {
  currentIssue = issue;
  currentIssueIndex = issues.findIndex((item) => item.id === issue.id);
  const scene = scenes[issue.sceneKey];
  issueTitle.textContent = issue.title;
  issueInstruction.textContent = issue.instruction;
  sceneTitle.textContent = scene.title;
  sceneArt.src = scene.image;
  sceneArt.alt = scene.alt;
  cafeStage.classList.remove("scene-a", "scene-b", "scene-c");
  cafeStage.classList.add(issue.sceneKey);
  statusText.textContent = "Waiting for fix";
  statusDot.classList.remove("fixed");
  modal.classList.add("hidden");
  resetText();
  let activeObject = null;
  clickableObjects.forEach((item) => {
    item.classList.remove("active-target", "fixed", "scene-object");
    if (item.dataset.object === issue.id) {
      item.classList.add("active-target", "scene-object");
      activeObject = item;
    }
  });
  if (activeObject) {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        activeObject.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }, 80);
    });
  }
}

function pickRandomIssue() {
  const issue = issues[Math.floor(Math.random() * issues.length)];
  renderIssue(issue);
}

function moveIssue(direction) {
  const nextIndex = (currentIssueIndex + direction + issues.length) % issues.length;
  renderIssue(issues[nextIndex]);
}

function pickInitialIssue() {
  const requestedIssueId = new URLSearchParams(window.location.search).get("issue");
  const requestedIssue = issues.find((issue) => issue.id === requestedIssueId);
  renderIssue(requestedIssue || issues[Math.floor(Math.random() * issues.length)]);
}

function fixIssue(id) {
  if (!currentIssue || id !== currentIssue.id) {
    statusText.textContent = "That prop is not the current issue. Try the highlighted café object.";
    return;
  }
  const target = objectById(id);
  target.classList.remove("active-target");
  target.classList.add("fixed");
  if (currentIssue.textClass) {
    const textElement = target.querySelector("." + currentIssue.textClass);
    if (textElement) textElement.textContent = currentIssue.textValue;
  }
  statusDot.classList.add("fixed");
  statusText.textContent = "Issue fixed";
  modalTitle.textContent = currentIssue.fixedTitle;
  modalReal.textContent = currentIssue.real;
  modalCloud.textContent = currentIssue.cloud;
  modalServices.textContent = currentIssue.services;
  modal.classList.remove("hidden");
}

clickableObjects.forEach((item) => {
  item.addEventListener("click", () => fixIssue(item.dataset.object));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fixIssue(item.dataset.object);
    }
  });
});

newIssueButton.addEventListener("click", pickRandomIssue);
previousIssueButton.addEventListener("click", () => moveIssue(-1));
nextIssueButton.addEventListener("click", () => moveIssue(1));
modalNewIssue.addEventListener("click", pickRandomIssue);
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.add("hidden");
});

window.cloudCafePreviewIssue = (id) => {
  const issue = issues.find((item) => item.id === id);
  if (!issue) return false;
  renderIssue(issue);
  return true;
};

pickInitialIssue();
