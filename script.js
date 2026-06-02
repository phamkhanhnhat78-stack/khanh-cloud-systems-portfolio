const incidents = {
  "public-route": {
    severity: "Severity 2",
    layer: "Network layer",
    title: "Public app unreachable",
    summary: "Users cannot reach the public application endpoint after a subnet or route change.",
    impact: "External users see timeout or connection refused errors.",
    cause: "The public subnet route table may not point internet-bound traffic to an attached Internet Gateway.",
    checks: [
      "Confirm the VPC has an attached Internet Gateway.",
      "Check the public subnet route table for 0.0.0.0/0 -> Internet Gateway.",
      "Verify the subnet is associated with the intended route table.",
      "Review inbound Security Group and Network ACL rules."
    ]
  },
  "dns-endpoint": {
    severity: "Severity 3",
    layer: "DNS / edge layer",
    title: "Wrong public endpoint",
    summary: "Users reach an outdated or incorrect public endpoint after a DNS or load balancer change.",
    impact: "Users see an old page, failed connection, or inconsistent service behavior.",
    cause: "Route 53, CloudFront, or load balancer DNS may point to the wrong target.",
    checks: [
      "Confirm Route 53 record values.",
      "Verify the active load balancer or CloudFront distribution.",
      "Test DNS resolution from a clean browser or command line.",
      "Check recent DNS, certificate, or endpoint changes."
    ]
  },
  "backend-health": {
    severity: "Severity 2",
    layer: "Compute layer",
    title: "Backend target unhealthy",
    summary: "The load balancer receives traffic but target health checks fail.",
    impact: "Users may reach the site intermittently or receive 5xx errors.",
    cause: "The EC2 instance, app process, health-check path, or port may be unavailable.",
    checks: [
      "Review target group health status and reason codes.",
      "Confirm EC2 instance state and system status checks.",
      "Check app service status, logs, and listening port.",
      "Validate health-check protocol, path, and security group rules."
    ]
  },
  "storage-access": {
    severity: "Severity 2",
    layer: "Storage / IAM layer",
    title: "Storage access risk",
    summary: "A storage policy allows broader access than intended.",
    impact: "Sensitive records may be visible to unintended users or services.",
    cause: "S3 bucket policy, IAM permissions, or public access settings may be too open.",
    checks: [
      "Review S3 public access block settings.",
      "Check bucket policy and IAM principals.",
      "Use Access Analyzer findings where available.",
      "Confirm CloudTrail data events or access logs for investigation."
    ]
  },
  "monitoring-gap": {
    severity: "Severity 3",
    layer: "Monitoring layer",
    title: "Alerting gap",
    summary: "The system has no useful alarm for a recurring operational failure.",
    impact: "Support teams learn about the issue from users instead of monitoring.",
    cause: "CloudWatch alarm thresholds, actions, or SNS subscriptions may be missing.",
    checks: [
      "Identify the metric that represents real user or system risk.",
      "Create or adjust the CloudWatch alarm threshold.",
      "Attach an SNS topic or other notification action.",
      "Test notification delivery and document the response path."
    ]
  }
};

const tabs = Array.from(document.querySelectorAll(".incident-tab"));
const severity = document.getElementById("incident-severity");
const layer = document.getElementById("incident-layer");
const title = document.getElementById("incident-title");
const summary = document.getElementById("incident-summary");
const impact = document.getElementById("incident-impact");
const cause = document.getElementById("incident-cause");
const checks = document.getElementById("incident-checks");

function renderIncident(id) {
  const incident = incidents[id] || incidents["public-route"];
  severity.textContent = incident.severity;
  layer.textContent = incident.layer;
  title.textContent = incident.title;
  summary.textContent = incident.summary;
  impact.textContent = incident.impact;
  cause.textContent = incident.cause;
  checks.innerHTML = "";
  incident.checks.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    checks.appendChild(li);
  });
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.incident === id);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderIncident(tab.dataset.incident));
});

renderIncident("public-route");
