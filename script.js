const issues = [
  { id: "door-path", sceneKey: "scene-a", title: "Broken entrance path", scene: "Scene A: Coffee shop entrance / network access", instruction: "A broken red route appears in the entrance area. Click the unnatural object to reconnect the café path.", fixedTitle: "You fixed the customer entrance.", real: "Customers could not reach the coffee shop because the entrance was not connected to the street.", cloud: "This is similar to a public subnet missing a route to an Internet Gateway. Without the correct route table entry, external users cannot reach public resources.", services: "Amazon VPC, Route Tables, Internet Gateway, Public Subnet" },
  { id: "open-sign", sceneKey: "scene-a", title: "Wrong open sign", scene: "Scene A: Coffee shop entrance / network access", instruction: "The door area has a CLOSED placard that does not match an operating café. Click it to correct the sign.", fixedTitle: "You corrected the customer-facing endpoint.", real: "Customers thought the café was closed because the sign pointed them to the wrong state.", cloud: "This is similar to DNS or domain routing pointing users to the wrong endpoint or an unavailable service.", services: "Route 53, DNS, CloudFront or Load Balancer DNS name", textClass: "sign-text", textValue: "OPEN" },
  { id: "guard", sceneKey: "scene-a", title: "Guard blocks every customer", scene: "Scene A: Coffee shop entrance / access control", instruction: "A BLOCKED barrier appears where customers should enter. Click it to allow normal traffic.", fixedTitle: "You adjusted the access rule.", real: "The café was open, but the guard blocked normal customers from entering.", cloud: "This is similar to an overly restrictive Security Group inbound rule that blocks legitimate traffic.", services: "Security Groups, Inbound Rules, EC2" },
  { id: "chair", sceneKey: "scene-b", title: "Chair blocking the cashier", scene: "Scene B: Inside café / traffic flow", instruction: "A hazard object appears in the customer path. Click it to clear the route to the cashier.", fixedTitle: "You removed the blocked path to the cashier.", real: "Customers entered the shop but could not reach the cashier to place an order.", cloud: "This is similar to a Security Group or Network ACL blocking traffic to an EC2 instance even though the network path exists.", services: "Network ACL, Security Groups, EC2" },
  { id: "register", sceneKey: "scene-b", title: "Cash register is powered off", scene: "Scene B: Inside café / application health", instruction: "The register has an unnatural OFF screen in the middle of service. Click it to restore the cashier system.", fixedTitle: "You restored the cashier system.", real: "The cashier was reachable, but the system itself was powered off.", cloud: "This is similar to an EC2 instance, web server, or application process being stopped or unhealthy.", services: "EC2, systemctl, application service health", textClass: "register-text", textValue: "ON" },
  { id: "coffee-machine", sceneKey: "scene-b", title: "Coffee machine is overheating", scene: "Scene B: Inside café / monitoring and alerting", instruction: "A warning badge and smoke appear on the coffee machine. Click the anomaly to clear the alert.", fixedTitle: "You detected high resource usage and sent an alert.", real: "The coffee machine was overloaded and slowing down the café.", cloud: "This is similar to high EC2 CPU utilization. CloudWatch can detect the issue and SNS can notify the support team by email.", services: "CloudWatch Alarm, SNS, EC2 CPUUtilization" },
  { id: "order-pile", sceneKey: "scene-b", title: "Too many orders at once", scene: "Scene B: Inside café / workload buffering", instruction: "A 99+ order overflow appears on the counter. Click it to organize the queue.", fixedTitle: "You buffered the order workload.", real: "Too many orders arrived at once, so the café needed a queue to process them safely.", cloud: "This is similar to using a message queue to absorb traffic spikes and prevent the application from being overwhelmed.", services: "Amazon SQS, decoupling, asynchronous processing" },
  { id: "staff-pass", sceneKey: "scene-c", title: "Staff cannot enter the back office", scene: "Scene C: Back office / secure operations", instruction: "A NO ACCESS pass appears near staff operations. Click it to grant secure admin access.", fixedTitle: "You granted secure admin access.", real: "Staff needed access to the back office without exposing it to the public.", cloud: "This is similar to using IAM roles and AWS Systems Manager Session Manager to access a private EC2 instance without public SSH.", services: "IAM Role, Systems Manager Session Manager, Private EC2" },
  { id: "storage-box", sceneKey: "scene-c", title: "Storage box has no label", scene: "Scene C: Back office / storage organization", instruction: "A question mark appears on the storage box. Click it to label and organize the box.", fixedTitle: "You organized the storage box.", real: "Staff could not tell which box contained reports or logs because it had no label.", cloud: "This is similar to organizing S3 buckets and objects with clear structure and access control.", services: "Amazon S3, IAM Policy, bucket organization" },
  { id: "log-book", sceneKey: "scene-c", title: "No monitoring records", scene: "Scene C: Back office / logging and audit", instruction: "A NO LOGS marker appears in the operations area. Click it to start recording events.", fixedTitle: "You enabled operational records.", real: "After an incident, the café needed records to understand what happened and who changed what.", cloud: "This is similar to enabling audit and operational logs so teams can investigate incidents.", services: "CloudTrail, CloudWatch Logs, audit history" }
];

const clickableObjects = Array.from(document.querySelectorAll(".cafe-object"));
const cafeStage = document.querySelector(".cafe-stage");
const issueTitle = document.getElementById("issue-title");
const issueInstruction = document.getElementById("issue-instruction");
const sceneTitle = document.getElementById("scene-title");
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");
const newIssueButton = document.getElementById("new-issue-button");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const modalNewIssue = document.getElementById("modal-new-issue");
const modalTitle = document.getElementById("modal-title");
const modalReal = document.getElementById("modal-real");
const modalCloud = document.getElementById("modal-cloud");
const modalServices = document.getElementById("modal-services");
let currentIssue = null;

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
  issueTitle.textContent = issue.title;
  issueInstruction.textContent = issue.instruction;
  sceneTitle.textContent = issue.scene;
  cafeStage.classList.remove("scene-a", "scene-b", "scene-c");
  cafeStage.classList.add(issue.sceneKey);
  statusText.textContent = "Waiting for fix";
  statusDot.classList.remove("fixed");
  modal.classList.add("hidden");
  resetText();
  let activeObject = null;
  clickableObjects.forEach((item) => {
    item.classList.remove("active-target", "fixed");
    if (item.dataset.object === issue.id) {
      item.classList.add("active-target");
      activeObject = item;
    }
  });
  if (activeObject) {
    window.requestAnimationFrame(() => {
      activeObject.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
  }
}

function pickRandomIssue() {
  const issue = issues[Math.floor(Math.random() * issues.length)];
  renderIssue(issue);
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
modalNewIssue.addEventListener("click", pickRandomIssue);
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.add("hidden");
});

pickRandomIssue();
