# Troubleshooting Notes

This document explains the cloud support thinking behind the Cloud Café scenarios.

## 1. Public users cannot reach the application

Coffee shop version: cat customers cannot reach the café entrance.

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

## 2. Traffic reaches the network but not the server

Coffee shop version: customers enter the café but cannot reach the cashier because a chair blocks the path.

AWS equivalent:
- Security Group blocks HTTP, HTTPS, or SSH
- Network ACL blocks traffic or ephemeral response ports
- Application is listening on a different port

Checks:
1. Check Security Group inbound rules.
2. Check Security Group outbound rules.
3. Check NACL inbound and outbound rules.
4. Confirm the application port.

## 3. Server or application is down

Coffee shop version: the cash register is powered off.

AWS equivalent:
- EC2 instance is stopped or unhealthy
- Web server is not running
- Application process crashed

Checks:
1. Confirm EC2 instance state.
2. Use Session Manager to connect.
3. Check service status with `systemctl status`.
4. Review application logs.

## 4. High CPU or resource usage

Coffee shop version: the coffee machine is overheating.

AWS equivalent:
- EC2 CPUUtilization is high
- Application load is too heavy
- CloudWatch alarm should detect the issue
- SNS should notify the support team

Checks:
1. Review CloudWatch metrics.
2. Confirm CloudWatch alarm threshold.
3. Confirm alarm action points to SNS.
4. Confirm SNS email subscription.

## 5. Private EC2 access problem

Coffee shop version: staff need access to the back office without opening it to the public.

AWS equivalent:
- Private EC2 should not expose SSH to the internet
- Session Manager can provide secure access
- IAM role and SSM connectivity are required

Checks:
1. Confirm IAM role is attached to EC2.
2. Confirm role includes Systems Manager permissions.
3. Confirm SSM Agent is running.
4. Confirm the private subnet has NAT Gateway access or SSM VPC endpoints.
