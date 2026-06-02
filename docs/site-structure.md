# Site Structure

The portfolio is implemented as a tabbed single-page static website. JavaScript switches visible page groups without reloading the document.

## Pages

### About Me

Hash route: `#about`

Visible sections:

- `#profile`
- `#contact`

Purpose:

- First impression
- Professional story
- Portrait
- Motto
- Email and LinkedIn

### Work Resume

Hash route: `#work`

Visible sections:

- `#resume`

Purpose:

- LinkedIn-style work history
- Operations support background
- Recruiter-ready experience summary

### Skills

Hash route: `#skills`

Visible sections:

- `#skills`
- `#experience`
- `#certificates`

Purpose:

- Support skills
- Technical tools
- Workplace skills
- Training and credentials
- Technical support readiness

### Support Game

Hash route: `#game`

Visible sections:

- `#projects`
- `#game`
- `#mapping`
- `#documentation`
- `#troubleshooting`

Purpose:

- Case studies
- Cloud Cafe AWS Troubleshooting Lab
- AWS mapping
- Documentation
- Troubleshooting notes

## Routing Implementation

Navigation links use `data-page-link`.

Sections use `data-page-section`.

`script.js` controls page switching with:

- `showPage(pageName)`
- `pageFromHash()`
- `hashchange` listener

## Cache Busting

Current asset versions:

- `style.css?v=14`
- `script.js?v=11`

Update these query strings after significant CSS or JavaScript changes so GitHub Pages and local preview do not serve stale assets.

