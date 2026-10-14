<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Instructions

## 1. Project Overview

- **Project**: Commercial web design portfolio.
- **Brand**: GB Software Solutions.
- **Professional positioning**: Web Designer focused on creating professional websites for businesses.
- **Purpose**: Showcase selected web design projects and convert visitors into potential clients.
- **Target audience**: Small and medium-sized businesses, local businesses, professionals and companies looking for a professional website.
- **Acquisition channels**: Instagram, social media, Google Maps, direct prospecting and referrals.
- **Primary conversion**: Start a conversation through WhatsApp.
- **Secondary conversion**: Submit the contact form.

The website must prioritize commercial communication and project presentation over technical details.

The target audience is primarily non-technical. Avoid presenting technologies, architecture or development terminology unless they provide clear value to the visitor.

---

## 2. Tech Stack

### Frontend
- Next.js with App Router.
- TypeScript.
- Tailwind CSS.

### Backend
- Next.js Server Functions / Route Handlers when necessary.
- TypeScript.
- Nodemailer for transactional email when applicable.
- SendPulse for email communication and integrations when applicable.
- Prisma ORM.

### Database
- Turso / SQLite.

### Deployment
- Vercel.

Do not introduce new dependencies, frameworks or infrastructure unless they provide clear value and are necessary for the requested feature.

Keep the backend intentionally simple.

---

## 3. Project Structure

The application has two main areas:

### Public Website

The public website is the commercial portfolio.

Main routes:

- `/` — Home.
- `/projetos` — Projects and websites.
- `/contato` — Contact.

The public website should present:

- Professional introduction.
- Short "about me" content.
- Selected projects.
- Contact options.
- Instagram/social links.
- WhatsApp CTA.
- Contact form.

The website must not behave like a technical developer portfolio.

Projects should focus on visual quality, business purpose and the final result rather than technologies used.

### Admin Panel

The application must provide a simple private admin area under `/admin`.

The admin panel should allow:

- Authentication of a single administrator.
- Create projects.
- Edit projects.
- Delete projects.
- View projects.
- View contact messages received through the website.

Keep the admin interface intentionally simple.

Do not implement unnecessary features such as multiple users, roles, permissions or complex account management unless explicitly requested later.

### Admin Authentication

The administrator is configured through environment variables.

Use:

- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD_HASH`

Never store or compare administrator passwords in plaintext.

Authentication must be handled securely and the admin routes must not be publicly accessible.

---

## 4. Development Guidelines

- Prefer simple solutions over complex abstractions.
- Avoid overengineering.
- Keep the code readable and maintainable.
- Use TypeScript with proper typing.
- Avoid `any` unless there is a clear technical reason.
- Prefer Server Components by default.
- Use Client Components only when client-side behavior is required.
- Reuse existing components before creating new ones.
- Avoid unnecessary component abstraction.
- Avoid duplicated logic when a simple reusable solution exists.
- Do not introduce dependencies without clear justification.
- Follow the existing project structure and conventions.
- Do not redesign architecture without a concrete reason.
- Validate external and user-provided data.
- Never expose secrets or sensitive environment variables to the client.

---

## 5. UI/UX Guidelines

### General

The website must feel professional, modern, clean and commercially oriented.

The main objective of the interface is to showcase projects and encourage potential clients to contact the Web Designer.

### Responsive Design

- Use a mobile-first approach.
- All public pages must work properly on mobile, tablet and desktop.
- Mobile experience has high priority because a significant portion of visitors may arrive from Instagram and other social networks.
- Avoid horizontal overflow.
- Keep typography readable across screen sizes.
- Ensure buttons and interactive elements are comfortable to use on touch devices.

### Navigation

Main navigation:

- Início
- Projetos/Sites
- Contato

Navigation must remain simple and predictable.

### Home

The home page should contain:

- Strong professional headline.
- Short introduction.
- Professional profile image.
- Link to Instagram.
- Primary WhatsApp CTA.
- Link to projects.

Avoid excessive text above the fold.

Visitors should quickly understand:

1. What service is offered.
2. Who provides the service.
3. Where they can see previous work.
4. How they can get in contact.

### Projects

Projects are one of the most important parts of the website.

Each project may contain:

- Name.
- Short description.
- Cover image.
- Public website URL.
- Video/demo when available.

Do not prioritize technology stacks in project presentation.

Focus on:

- Visual result.
- Business purpose.
- User experience.
- Website presentation.

Projects that are conceptual, fictional or portfolio demonstrations must never be presented as real client work.

### Contact

The contact page must provide a simple form containing:

- Name.
- Email.
- Phone / WhatsApp.
- Message.
- Submit button.

WhatsApp must remain the primary and most visible contact option.

### Visual Design

- Maintain consistent spacing.
- Maintain strong visual hierarchy.
- Use consistent typography.
- Keep buttons and components visually consistent.
- Avoid excessive animations.
- Avoid unnecessary visual effects.
- Prefer subtle interactions and transitions.
- Prioritize readability and usability over decoration.
- Maintain basic accessibility standards.

---

## 6. Content Guidelines

All public-facing content must be written for business owners, not developers.

- Use clear and professional language.
- Use commercial but natural language.
- Prioritize business benefits over technologies.
- Avoid unnecessary technical jargon.
- Keep paragraphs concise.
- Keep headlines direct.
- Use clear calls to action.
- Focus on how a professional website can help the client's business.
- Do not exaggerate capabilities or results.
- Do not invent clients.
- Do not invent testimonials.
- Do not invent business metrics or conversion improvements.
- Do not claim that conceptual projects were developed for real clients.

Technical terminology should only appear when it helps establish credibility or when specifically required.

---

## 7. Agent Rules

### Scope

- Understand the requested task before modifying code.
- Inspect existing implementation before creating a new solution.
- Keep changes focused on the requested task.
- Do not modify unrelated functionality.
- Do not remove existing functionality without a clear reason.
- Do not introduce speculative features.
- Do not increase architectural complexity without necessity.

### Dependencies

Before installing a new dependency:

1. Check whether the project already provides a solution.
2. Check whether the requirement can be implemented simply without another dependency.
3. Only add the dependency when it provides clear value.

### Git and GitHub

- Use semantic commit messages.
- Write commit messages in English.
- Keep commits focused on coherent units of work.
- Commit and push after completing a coherent task.
- Avoid unnecessary commits for trivial intermediate changes.
- Never commit secrets or `.env` files.
- Use the local `gh` CLI when necessary to inspect GitHub Actions and CI status.
- When CI/CD checks exist, verify their result after pushing relevant changes.

### Testing

Automated tests should primarily cover backend and business-critical behavior.

Prioritize tests for:

- Admin authentication.
- Project CRUD operations.
- Contact form processing.
- Data validation.
- Email sending logic.
- Important links or backend integrations when applicable.

Do not create unnecessary automated tests for purely visual presentation.

---

## 8. Validation

Before considering a relevant task complete, verify what applies to the change.

### Frontend

- Layout is visually consistent.
- Mobile responsiveness is preserved.
- No obvious desktop regressions exist.
- Navigation works correctly.
- Links work correctly.
- WhatsApp CTA works correctly.
- Basic accessibility is preserved.
- Basic SEO requirements are preserved.

### Backend

- Admin authentication works correctly.
- Protected routes remain protected.
- CRUD operations work correctly.
- Input validation works correctly.
- Error handling is appropriate.
- TypeScript types are correct.
- Email functionality works when affected by the task.

### Code Quality

Run the relevant project checks when applicable:

- Lint.
- TypeScript validation.
- Relevant automated tests.

Run the production build when appropriate, especially before releases or after significant structural changes.

A full production build is not required after every minor visual or content change.

### SEO

Public pages should include basic SEO practices where applicable:

- Appropriate page title.
- Meta description.
- Semantic HTML.
- Proper heading hierarchy.
- Image alt text.
- Open Graph metadata when relevant.
- Crawlable public content.

### Completion Report

After completing a development task, briefly report:

- What was changed.
- Relevant files or areas affected.
- Tests/checks performed.
- Any known limitations or pending issues.
