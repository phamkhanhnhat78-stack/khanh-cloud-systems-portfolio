# Support Game Troubleshooting Notes

This document explains the support thinking behind the Cloud Cafe scenarios on the Support Game page.

The lab is not only a game. It is a compact way to show how visible user symptoms can be translated into cloud infrastructure checks.

## Support Method

For each issue, the portfolio connects four layers:

1. User-facing symptom.
2. Real-world service impact.
3. AWS or cloud infrastructure equivalent.
4. Troubleshooting checks.

This matches the portfolio positioning: operations experience translated into IT and cloud support logic.

## 1. Public users cannot reach the application

Cafe version: customers cannot reach the cafe entrance.

AWS equivalent:

- Public subnet route table may be missing `0.0.0.0/0 -> Internet Gateway`
- Internet Gateway may not be attached to the VPC
- The instance may not have a public IP if it is expected to be public
- Security Group or Network ACL may block inbound traffic

Checks:

1. Confirm the subnet route table.
2. Confirm the Internet Gateway is attached.
3. Confirm the target resource is in the expected subnet.
4. Confirm Security Group inbound rules.
5. Confirm Network ACL inbound and outbound rules.

## 2. DNS or public endpoint is wrong

Cafe version: the storefront sign says CLOSED even though the service should be available.

AWS equivalent:

- Route 53 record points to the wrong endpoint
- Load balancer DNS or CloudFront distribution is not healthy
- Browser or client cache is resolving an outdated endpoint

Checks:

1. Confirm Route 53 record values.
2. Verify the active load balancer, CloudFront distribution, or application DNS name.
3. Test DNS resolution from a clean browser or command line.

## 3. Valid traffic is blocked before the app path

Cafe version: customers enter the cafe but cannot reach the cashier path.

AWS equivalent:

- Security Group blocks HTTP, HTTPS, SSH, or the application port
- Network ACL blocks traffic or ephemeral response ports
- Routing is valid at the edge but blocked before the backend

Checks:

1. Check Security Group inbound rules.
2. Check Security Group outbound rules.
3. Check Network ACL inbound and outbound rules.
4. Confirm the application port and health-check path.

## 4. Server or application is down

Cafe version: the cashier service is unavailable.

AWS equivalent:

- EC2 instance is stopped or unhealthy
- Web server is not running
- Application process crashed
- Load balancer target group marks the backend unhealthy

Checks:

1. Confirm EC2 instance state.
2. Review target group health status.
3. Use Systems Manager Session Manager where possible.
4. Check service status and application logs.

## 5. Storage access or organization issue

Cafe version: stock is missing, unlabeled, or not recorded.

AWS equivalent:

- S3 object naming, prefixing, or tagging is unclear
- Bucket policy or IAM permission is too open
- CloudTrail or access logs are not enabled

Checks:

1. Review bucket naming and object prefixes.
2. Confirm IAM and bucket policy boundaries.
3. Enable CloudTrail data events or S3 access logs where appropriate.
4. Search logs by principal, object key, source IP, and timestamp.

## 6. Monitoring or alerting is missing

Cafe version: the manager dashboard alarm is off.

AWS equivalent:

- CloudWatch alarm is not configured
- Alarm threshold does not match real operational risk
- SNS action or subscription is missing

Checks:

1. Review CloudWatch metrics.
2. Confirm alarm threshold and evaluation period.
3. Confirm alarm action points to SNS.
4. Confirm SNS email subscription.

## 7. Workload needs buffering

Cafe version: orders arrive faster than staff can process them.

AWS equivalent:

- Workload should be decoupled through a queue
- Producer and consumer rates are mismatched
- Failed work needs retry and dead-letter handling

Checks:

1. Place incoming work onto SQS.
2. Monitor queue depth and processing time.
3. Scale consumers based on backlog.
4. Add retry and dead-letter queue handling.

## 8. Sensitive data is not protected

Cafe version: customer order records are left unlocked.

AWS equivalent:

- Data at rest is not encrypted
- Data in transit is not protected by TLS
- Secrets may be exposed in code, logs, or metadata

Checks:

1. Confirm KMS-backed encryption for sensitive storage.
2. Verify TLS for data in transit.
3. Avoid plaintext secrets in code, logs, or object metadata.
4. Review IAM access to sensitive data.

