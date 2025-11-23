# Project Plan & Documentation

## 1. Project Overview

This document outlines the development plan, architecture, and future versioning for the Local Diary application. Local Diary is a platform designed to connect local professionals with clients in their community. It consists of a web application and a mobile application, sharing a common set of features and services.

## 2. Current State & Refactoring

The initial phase of this project involves a significant refactoring of the existing codebase. The primary goal is to establish a scalable and maintainable architecture by:

*   **Consolidating Code:** Moving shared components, types, and services into a `packages/shared` directory to eliminate duplication between the `app-web` and `app-mobile` projects.
*   **Improving Code Quality:** Separating data from presentation components, as demonstrated with the refactoring of `BlogsPage.tsx` and the creation of `packages/app-web/src/data/blogs.ts`.
*   **Establishing Clear Structure:** Organizing files and folders in a logical and consistent manner.

## 3. Architectural Design

The application will follow a monorepo architecture using a tool like Lerna or Nx to manage the shared packages and applications. The structure will be as follows:

```
/packages
  /app-web      # Web application (React)
  /app-mobile   # Mobile application (React Native)
  /shared       # Shared components, types, and services
    /components # Reusable React components
    /hooks      # Shared React hooks
    /services   # API services (e.g., Gemini, Firebase)
    /types      # TypeScript type definitions
    /utils      # Utility functions
```

## 4. Development Roadmap & Versioning

### Version 1.0: Foundation & Core Features (Current)

*   **Goal:** Establish a stable foundation with a clean, scalable architecture.
*   **Key Milestones:**
    *   Complete the initial codebase refactoring.
    *   Implement a unified design system with shared UI components.
    *   Ensure core features are functional on both web and mobile platforms:
        *   User Authentication (Sign up, Login)
        *   Profile Creation & Management
        *   Service Browsing & Searching
        *   Basic aMessaging

### Version 1.1: Enhanced User Experience

*   **Goal:** Improve user engagement and provide more value-added features.
*   **Key Milestones:**
    *   **Real-time Chat Translation:** Integrate a translation service (like Google Translate API) into the messaging feature.
    *   **Advanced Search & Filtering:** Implement more sophisticated search filters (e.g., by location, service category, price range, availability).
    *   **Notifications:** Add push notifications for new messages, booking confirmations, and other important events.

### Version 1.2: Project Management & Collaboration

*   **Goal:** Introduce tools for professionals to manage their work and collaborate with clients.
*   **Key Milestones:**
    *   **Project Dashboards:** Create a dashboard for professionals to track project status, milestones, and payments.
    *   **File Sharing:** Allow users to share files (e.g., project briefs, invoices, design mockups) within the platform.
    *   **Task Lists:** Implement a simple task management system for projects.

### Version 2.0: Monetization & Growth

*   **Goal:** Introduce monetization features and expand the platform's reach.
*   **Key Milestones:**
    *   **Subscription Plans:** Offer premium features for professionals through subscription tiers.
    *   **Featured Listings:** Allow professionals to pay for better visibility in search results.
    *   **Analytics & Reporting:** Provide professionals with insights into their profile performance and client engagement.

## 5. Technology Stack

*   **Monorepo:** Nx or Lerna
*   **Frontend (Web):** React, Vite, TypeScript, Tailwind CSS
*   **Frontend (Mobile):** React Native, Expo, TypeScript, Tailwind CSS
*   **Backend:** Firebase (Authentication, Firestore, Storage, Functions)
*   **AI-Powered Features:** Google Gemini API
*   **Deployment:** Firebase Hosting (Web), Apple App Store & Google Play Store (Mobile)

## 6. Contribution Guidelines

*   **Branching:** Use a `feature/` prefix for new features, `bugfix/` for bug fixes, and `refactor/` for code improvements.
*   **Commits:** Follow the Conventional Commits specification.
*   **Pull Requests:** All code changes must be submitted through a pull request and reviewed by at least one other developer.
*   **Code Style:** Adhere to the established Prettier and ESLint configurations to maintain a consistent code style.

This document will be updated as the project evolves. All team members are encouraged to contribute to its maintenance and improvement.
