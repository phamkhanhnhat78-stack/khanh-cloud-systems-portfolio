# KHANHNHAT PHAM Cloud Support Portfolio

This repository is being repositioned from a standalone Cloud Café project into an integrated cloud support portfolio. It combines the Cloud Café AWS troubleshooting game with the KHANHNHAT PHAM Portfolio Website, so recruiters can review the interactive project, AWS support thinking, documentation, and GitHub Pages delivery from one place.

Live website: https://phamkhanhnhat78-stack.github.io/cloud-cafe-aws-troubleshooting/

## Project Purpose

The portfolio has two connected parts:

- Cloud Café: an interactive AWS troubleshooting project.
- KHANHNHAT PHAM Portfolio Website: the personal project showcase and professional wrapper.

The homepage is structured like a professional personal website: a profile hero with a workplace image area, professional titles, skills, workplace experience, workplace skills, achievements, responsibility mapping, and certificate attachment slots.

Many cloud issues are difficult to explain with only screenshots or service names. This project uses a coffee shop as a visual metaphor:

- Cat customers represent users.
- Human stick-figure staff represent cloud support or operations staff.
- The coffee shop represents an application environment.
- Broken objects represent AWS misconfigurations or operational issues.

A visitor receives one random issue at a time. After clicking the correct object, the site explains:

1. What real-world café problem was fixed.
2. What AWS problem it represents.
3. Which AWS services are involved.
4. Which troubleshooting checks should be performed.

## AWS Concepts Covered

The random scenarios map to these AWS topics:

| Café Issue | AWS Equivalent | Services |
|---|---|---|
| Bricks blocking the entrance route | Missing public route to internet | VPC, Route Table, Internet Gateway |
| Hanging window sign says CLOSED | DNS or endpoint problem | Route 53, DNS, CloudFront / Load Balancer |
| Queue barrier blocks a customer | Valid traffic blocked before app path | Security Groups, Network ACL, route rules |
| Cashier service unhealthy | Backend target or app service unhealthy | ELB, Target Groups, EC2 |
| Unlabeled storage box | Storage organization and access control | S3, IAM |
| Mouse stealing stock | Storage access policy too open | S3 Bucket Policy, IAM, GuardDuty |
| No stock records | Missing storage audit visibility | S3 logs, CloudTrail, CloudWatch Logs |
| Monitoring alarm not configured | Missing operational alerting | CloudWatch Alarm, SNS |
| Printed orders piling up | Need workload buffering | SQS |
| Order data is not encrypted | Protect sensitive stored and transmitted data | KMS, TLS, S3 encryption |

## Website Features

- One-page portfolio website
- Personal profile hero with professional title positioning
- Skills, workplace experience, workplace skills, and career wins sections
- Company-style responsibility map explaining CEO / COO / CFO / CTO thinking
- Certificate attachment slots for official proof and exam evidence
- Integrated project showcase for Cloud Café and the personal portfolio website
- Random troubleshooting scenario on page load
- Clean café illustrations with visually distinct cats, stick-figure staff, and clickable troubleshooting props
- Four distinct interaction contexts: street storefront, café floor, warehouse storage, and manager office operations/security
- Ten random issues represented by intentionally inconsistent anomaly objects across the four scenes
- Previous/next scene controls so visitors can browse the situations directly
- Pop-up explanation after the visitor fixes an issue, including troubleshooting checks
- HR-friendly overview and technical AWS mapping table
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
│   ├── cloud-cafe-office.png
│   └── cloud-cafe-brick-block.png
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

KHANHNHAT PHAM Cloud Support Portfolio | HTML, CSS, JavaScript, GitHub Pages, AWS VPC, EC2, IAM, SSM, CloudWatch, SNS

- Integrated a personal portfolio website direction with an interactive cloud troubleshooting project for a clearer job-ready portfolio.
- Created random front-end scenarios explaining route table issues, DNS endpoint errors, traffic blocking, unhealthy backend targets, workload buffering, S3 organization, storage auditing, monitoring alarms, and encryption.
- Designed the portfolio to support a secure AWS operations project using VPC, private EC2, IAM roles, Systems Manager Session Manager, CloudWatch alarms, and SNS notifications.
- Published the project through GitHub Pages with documentation and troubleshooting notes.

## Future Improvements

- Add real AWS screenshots from the completed lab.
- Add an architecture diagram.
- Add bilingual English/Chinese explanation toggle.
- Add progress tracking for all 10 issues.
