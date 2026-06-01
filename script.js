const scenes = {
  "scene-a": {
    title: "Scene A: Street view / network route and public endpoint",
    image: "assets/cloud-cafe-exterior.png",
    alt: "Cloud Café exterior storefront from the street with a sign, sidewalk, and glass front."
  },
  "scene-b": {
    title: "Scene B: Café floor / delivery access and cashier health",
    image: "assets/cloud-cafe-floor.png",
    alt: "Cloud Café interior floor with cashier counter, cat customer, delivery person, and back-room access door."
  },
  "scene-c": {
    title: "Scene C: Inventory warehouse / storage layer",
    image: "assets/cloud-cafe-storage.png",
    alt: "Cloud Café warehouse with staff counting stock, shelves, boxes, and a small mouse thief."
  },
  "scene-d": {
    title: "Scene D: Manager office / monitoring, orders, and encryption",
    image: "assets/cloud-cafe-office.png",
    alt: "Cloud Café manager office with ledgers, order cards, laptop, locks, and secure operations tools."
  }
};

const issues = [
  { id: "door-path", sceneKey: "scene-a", title: "Entrance route is blocked by bricks", instruction: "A stack of bricks is blocking the glass door route. Click the bricks to clear the entrance path.", fixedTitle: "You cleared the route into the café.", real: "Customers outside could not enter because bricks were stacked in front of the doorway.", cloud: "This is similar to a public subnet missing a route to an Internet Gateway. Without the route table entry, external users cannot reach public resources.", services: "Amazon VPC, Route Tables, Internet Gateway, Public Subnet", steps: ["Check that the VPC has an attached Internet Gateway.", "Confirm the public subnet route table has 0.0.0.0/0 pointing to the Internet Gateway.", "Verify the subnet is associated with the intended public route table."] },
  { id: "open-sign", sceneKey: "scene-a", title: "Window sign shows the wrong state", instruction: "A hanging CLOSED sign is stuck on the café window. Click it to switch the public endpoint back to OPEN.", fixedTitle: "You corrected the hanging window sign.", real: "Customers thought the café was closed because the window sign showed the wrong state.", cloud: "This is similar to DNS or domain routing pointing users to the wrong endpoint or unavailable service.", services: "Route 53, DNS, CloudFront or Load Balancer DNS name", textClass: "sign-text", textValue: "OPEN", steps: ["Confirm the Route 53 record points to the active endpoint.", "Check the load balancer, CloudFront distribution, or app DNS name is healthy.", "Flush or retest DNS resolution from a clean browser/session."] },
  { id: "guard", sceneKey: "scene-b", title: "Customer queue path is blocked", instruction: "A red queue barrier blocks the cat customer from lining up at the cashier. Click it to clear the customer path.", fixedTitle: "You cleared the customer queue path.", real: "The customer could enter the café, but an unnecessary barrier stopped them from joining the cashier queue.", cloud: "This is similar to valid user traffic reaching the frontend but being blocked by a Security Group, Network ACL, or routing rule before it reaches the application path.", services: "Security Groups, Network ACL, route rules, application traffic path", steps: ["Check inbound Security Group rules for the expected app port.", "Inspect Network ACL allow and deny rules in both directions.", "Trace the route from edge/frontend to the application target."] },
  { id: "chair", sceneKey: "scene-b", title: "Cashier service unhealthy", instruction: "The cat customer reached the counter, but the cashier terminal shows DOWN. Click it to restore service health.", fixedTitle: "You restored cashier service health.", real: "Customers could reach the counter, but the checkout service was unavailable.", cloud: "This is similar to a Load Balancer target becoming unhealthy or an EC2 application service going down.", services: "Elastic Load Balancing, Target Groups, EC2, application health checks", steps: ["Check the target group health status and reason code.", "Confirm the EC2 instance is running and reachable on the health-check port.", "Inspect the app process, web server logs, and health-check path."] },
  { id: "storage-box", sceneKey: "scene-c", title: "Storage box has no label", instruction: "A question mark appears on an inventory box. Click it to label and organize the storage object.", fixedTitle: "You organized the storage object.", real: "Staff could not tell which box contained which stock because the inventory object had no label.", cloud: "This is similar to organizing S3 buckets and objects with clear naming, prefixes, tags, and access boundaries.", services: "Amazon S3, object prefixes, tags, IAM Policy", steps: ["Review bucket and object naming conventions.", "Use prefixes and tags to separate environments, owners, and data types.", "Check IAM policies align with the intended bucket structure."] },
  { id: "coffee-machine", sceneKey: "scene-c", title: "Mouse stealing stock", instruction: "A warning badge marks the corner where the mouse is stealing stock. Click it to stop unauthorized storage access.", fixedTitle: "You stopped unauthorized storage access.", real: "A stock item was being taken from the warehouse without permission.", cloud: "This is similar to an S3 bucket policy or IAM permission allowing unintended access.", services: "S3 Bucket Policy, IAM, Access Analyzer, GuardDuty", steps: ["Review bucket policy and public access block settings.", "Check IAM principals with access to sensitive objects.", "Use Access Analyzer or GuardDuty findings to identify unexpected access."] },
  { id: "log-book", sceneKey: "scene-c", title: "No stock records", instruction: "A NO LOGS marker appears near the warehouse records. Click it to enable storage access records.", fixedTitle: "You enabled storage audit records.", real: "When stock went missing, staff needed records showing what changed and when.", cloud: "This is similar to enabling object-level audit and operational logs so teams can investigate unusual storage access.", services: "CloudTrail data events, CloudWatch Logs, S3 server access logs", steps: ["Enable CloudTrail data events for important S3 buckets.", "Confirm logs are delivered to the expected log destination.", "Search events by object key, principal, source IP, and timestamp."] },
  { id: "register", sceneKey: "scene-d", title: "Monitoring alarm not configured", instruction: "The manager dashboard alarm is OFF while operations need alerting. Click it to turn on monitoring notifications.", fixedTitle: "You configured monitoring alerts.", real: "The manager needed alerts before café operations failed silently.", cloud: "This is similar to configuring CloudWatch alarms and SNS notifications for operational incidents.", services: "CloudWatch Alarm, SNS, metrics and notifications", textClass: "register-text", textValue: "ALARM ON", steps: ["Choose the metric and threshold that represents real risk.", "Attach an SNS topic or other alarm action.", "Confirm the SNS subscription and test that notification delivery works."] },
  { id: "order-pile", sceneKey: "scene-d", title: "Orders keep printing faster than staff can process", instruction: "Order tickets are flying out of the printer and piling up high on the desk. Click the overflowing orders to buffer the workload.", fixedTitle: "You buffered the order workload.", real: "Too many customer orders arrived at once, so the manager needed a safe queue instead of a messy paper pile.", cloud: "This is similar to using a message queue to absorb spikes and decouple producers from workers.", services: "Amazon SQS, asynchronous processing, decoupling", steps: ["Place incoming work onto an SQS queue instead of processing synchronously.", "Scale consumers based on queue depth and processing time.", "Add retry and dead-letter queue handling for failed messages."] },
  { id: "staff-pass", sceneKey: "scene-d", title: "Customer orders are not encrypted", instruction: "An unlocked order folder appears on the desk. Click it to lock and protect customer data.", fixedTitle: "You encrypted customer order data.", real: "Customer order records should be protected before they are stored or sent.", cloud: "This is similar to encrypting data at rest and in transit so stored records and messages are not exposed.", services: "AWS KMS, TLS, S3 encryption, encrypted application secrets", textClass: "pass-text", textValue: "LOCKED", steps: ["Confirm sensitive data is encrypted at rest with KMS-managed keys.", "Verify TLS is used for data in transit.", "Avoid plaintext secrets in code, logs, or unencrypted object metadata."] }
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
const modalSteps = document.getElementById("modal-steps");
let currentIssue = null;
let currentIssueIndex = 0;

function objectById(id) {
  return clickableObjects.find((item) => item.dataset.object === id);
}

function resetText() {
  const openSign = objectById("open-sign");
  const register = objectById("register");
  const staffPass = objectById("staff-pass");
  if (openSign) openSign.querySelector(".sign-text").textContent = "CLOSED";
  if (register) register.querySelector(".register-text").textContent = "OFF";
  if (staffPass) staffPass.querySelector(".pass-text").textContent = "UNLOCKED";
}

function renderIssue(issue, options = {}) {
  const shouldCenterActiveObject = options.centerActiveObject === true;
  currentIssue = issue;
  currentIssueIndex = issues.findIndex((item) => item.id === issue.id);
  const scene = scenes[issue.sceneKey];
  issueTitle.textContent = issue.title;
  issueInstruction.textContent = issue.instruction;
  sceneTitle.textContent = scene.title;
  sceneArt.src = scene.image;
  sceneArt.alt = scene.alt;
  cafeStage.classList.remove("scene-a", "scene-b", "scene-c", "scene-d");
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
  if (activeObject && shouldCenterActiveObject) {
    const centerActiveObject = () => {
      activeObject.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      const rect = activeObject.getBoundingClientRect();
      const top = window.scrollY + rect.top - ((window.innerHeight - rect.height) / 2);
      window.scrollTo({ top, behavior: "smooth" });
    };
    window.requestAnimationFrame(() => {
      window.setTimeout(centerActiveObject, 80);
      window.setTimeout(centerActiveObject, 520);
    });
  }
}

function pickRandomIssue() {
  const issue = issues[Math.floor(Math.random() * issues.length)];
  renderIssue(issue, { centerActiveObject: true });
}

function moveIssue(direction) {
  const nextIndex = (currentIssueIndex + direction + issues.length) % issues.length;
  renderIssue(issues[nextIndex], { centerActiveObject: true });
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
  modalSteps.innerHTML = "";
  (currentIssue.steps || []).forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    modalSteps.appendChild(item);
  });
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
  renderIssue(issue, { centerActiveObject: true });
  return true;
};

pickInitialIssue();
