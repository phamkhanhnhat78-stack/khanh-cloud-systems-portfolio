# Cloud Café: AWS Troubleshooting Portfolio

Cloud Café is an interactive AWS troubleshooting portfolio project. It uses four clean illustrated coffee shop scenes to explain real cloud operations problems in a way that is easy for both recruiters and technical interviewers to understand.

Live website: GitHub Pages link will be available after Pages is enabled in repository settings.

## Project Purpose

Many cloud issues are difficult to explain with only screenshots or service names. This project uses a coffee shop as a visual metaphor:

- Cat customers represent users.
- Human stick-figure staff represent cloud support or operations staff.
- The coffee shop represents an application environment.
- Broken objects represent AWS misconfigurations or operational issues.

A visitor receives one random issue at a time. After clicking the correct object, the site explains:

1. What real-world café problem was fixed.
2. What AWS problem it represents.
3. Which AWS services are involved.

## AWS Concepts Covered

The random scenarios map to these AWS topics:

| Café Issue | AWS Equivalent | Services |
|---|---|---|
| Missing route to café | Missing public route to internet | VPC, Route Table, Internet Gateway |
| Wrong shop sign | DNS or endpoint problem | Route 53, DNS, CloudFront / Load Balancer |
| Delivery access denied | Private resource access blocked | IAM, Systems Manager Session Manager |
| Cashier service unhealthy | Backend target or app service unhealthy | ELB, Target Groups, EC2 |
| Mouse stealing stock | Storage access policy too open | S3 Bucket Policy, IAM, GuardDuty |
| No stock records | Missing storage audit visibility | S3 logs, CloudTrail, CloudWatch Logs |
| Too many orders | Need workload buffering | SQS |
| Monitoring alarm not configured | Missing operational alerting | CloudWatch Alarm, SNS |
| Order data is not encrypted | Protect sensitive stored and transmitted data | KMS, TLS, S3 encryption |
| Unlabeled storage box | Storage organization and access control | S3, IAM |

## Website Features

- One-page portfolio website
- Random troubleshooting scenario on page load
- Clean café illustrations with visually distinct cats, stick-figure staff, and clickable troubleshooting props
- Four distinct interaction contexts: street storefront, café floor, warehouse storage, and manager office operations/security
- Ten random issues represented by intentionally inconsistent anomaly objects across the four scenes
- Previous/next scene controls so visitors can browse the situations directly
- Pop-up explanation after the visitor fixes an issue
- HR-friendly explanation and technical AWS mapping
- AWS documentation section
- Troubleshooting notes section
- GitHub Pages deployment ready

## File Structure

```text
cloud-cafe-aws-troubleshooting/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── cloud-cafe-network.png
│   ├── cloud-cafe-exterior.png
│   ├── cloud-cafe-floor.png
│   ├── cloud-cafe-storage.png
│   └── cloud-cafe-office.png
├── README.md
└── docs/
    └── troubleshooting-notes.md
```

## Planned Real AWS Project Behind This Portfolio

This website is designed to connect with a real AWS cloud operations project:

1. Create a custom VPC.
2. Create public and private subnets.
3. Attach an Internet Gateway.
4. Configure a NAT Gateway for private subnet outbound access.
5. Launch a private EC2 instance without a public IP.
6. Attach an IAM role for Systems Manager.
7. Access the private EC2 instance through Session Manager.
8. Create a CloudWatch CPU alarm.
9. Connect the alarm to an SNS email topic.
10. Run a CPU stress test and verify the alert.
11. Add screenshots and evidence to the portfolio.

## Resume Description

Cloud Café: AWS Troubleshooting Portfolio | HTML, CSS, JavaScript, GitHub Pages, AWS VPC, EC2, IAM, SSM, CloudWatch, SNS

- Built an interactive cloud troubleshooting portfolio website that maps coffee shop operational issues to AWS infrastructure problems.
- Created random front-end scenarios explaining route table issues, DNS endpoint errors, private access denial, unhealthy backend targets, workload buffering, S3 organization, storage auditing, monitoring alarms, and encryption.
- Designed the portfolio to support a secure AWS operations project using VPC, private EC2, IAM roles, Systems Manager Session Manager, CloudWatch alarms, and SNS notifications.
- Published the project through GitHub Pages with documentation and troubleshooting notes.

## Future Improvements

- Add real AWS screenshots from the completed lab.
- Add an architecture diagram.
- Add bilingual English/Chinese explanation toggle.
- Add progress tracking for all 10 issues.
