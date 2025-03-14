# Agendly

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Next.js](https://img.shields.io/badge/Next.js-13-black.svg)](https://nextjs.org/) [![Google OAuth](https://img.shields.io/badge/Google-OAuth-blue.svg)](https://developers.google.com/identity)

Agendly is a sleek and innovative Next.js application designed to simplify your scheduling process. With secure Google authentication, you can easily log in, upload your PDF or Word itinerary documents, and let Agendly automatically extract and sync your events directly to your Google Calendar. Say goodbye to manual calendar updates and hello to effortless scheduling!

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

Agendly transforms the way you manage your time by automating the extraction of events from your itinerary documents. Seamlessly connect with your Google account to sync your schedule without lifting a finger.

---

## Features

- **Google Authentication:** Securely sign in using your Google account.
- **Document Upload:** Effortlessly load PDF and Word documents containing your itineraries or schedules.
- **Intelligent Extraction:** Automatically parse documents to extract events.
- **Google Calendar Sync:** Instantly upload extracted events to your Google Calendar.
- **Modern UI:** Enjoy a clean, responsive interface built with Next.js.

---

## Installation

Follow these steps to set up Agendly on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/agendly.git
   cd agendly
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_API_KEY=your-google-api-key
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see Agendly in action!

---

## Usage

1. **Login:** Click on the "Login with Google" button to securely sign in.
2. **Upload Document:** Choose your PDF or Word document that contains your itinerary or schedule.
3. **Event Extraction:** Allow Agendly to process the document and extract the scheduled events.
4. **Calendar Sync:** Review the extracted events and confirm to automatically upload them to your Google Calendar.
5. **Relax:** Enjoy your organized schedule with minimal effort!

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), React
- **Authentication:** Google OAuth
- **Document Parsing:** PDF and Word processing libraries (e.g., `pdf-parse`, `docx`)
- **APIs:** [Google Calendar API](https://developers.google.com/calendar)
- **Styling:** Modern CSS frameworks / libraries (e.g., Tailwind CSS)

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push the branch: `git push origin feature/my-new-feature`
5. Open a pull request detailing your changes.

For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contact

For questions, suggestions, or feedback, please open an issue or contact us at [your-email@example.com](mailto:your-email@example.com).

Happy scheduling with Agendly! 🚀
