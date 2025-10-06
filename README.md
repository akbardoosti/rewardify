# Vendor Management Panel

This is a web application designed for vendors to manage their shop, customers, and sales activities. It provides a user-friendly interface for handling daily operations, including customer registration, purchase tracking, and report generation.

## Key Features

- **User Authentication**: Secure login, registration, and phone verification.
- **Dashboard**: A central hub for managing shop activities.
- **Profile Management**: View and update shop information.
- **Customer Registration**: Onboard new customers.
- **Purchase Tracking**: Record and manage customer purchases.
- **Reporting**: Download sales and activity reports.
- **Logout**: Securely end user sessions.

## Technology Stack

- **Frontend**: [Nuxt.js](https://nuxt.com/) (v4)
- **UI Framework**: [PrimeVue](https://primevue.org/) with [PrimeUIX Themes](https://primeuix.org/themes)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Picker**: [Vue3 Persian Datepicker](https://github.com/alireza-ab/vue3-persian-datepicker)
- **Service Worker**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

## APIs Used

The application interacts with two main backend services:

1.  **Main Application API**: `http://185.130.50.241:7000/api/v1`
    - Handles core functionalities like shop management, authentication, and customer data.
2.  **Iran Places API**: `https://iranplacesapi.liara.run/api`
    - Used to fetch geographical data for provinces and cities in Iran.

## Setup

Make sure to install the dependencies using Yarn:

```bash
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview the production build:

```bash
yarn preview
```

For more information on deployment, check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).