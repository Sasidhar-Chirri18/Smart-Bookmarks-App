# Smart Bookmark App

A personal library for saving and organizing your favorite web links. Built with Next.js, Supabase, and Tailwind CSS.

## Features

- User Authentication : Secure sign-in with Google via Supabase Auth.
- Bookmark Management : Add, view, and delete bookmarks in real-time.
- Dark Mode : A sleek, dark-themed UI designed for comfort and style.
- Responsive Design : Fully responsive layout that works on desktop and mobile.

## Tech Stack

-   Framework : [Next.js](https://nextjs.org/) (App Router)
-   Database & Auth : [Supabase](https://supabase.com/)
-   Styling : [Tailwind CSS](https://tailwindcss.com/)
-   Language : TypeScript

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/Sasidhar-Chirri18/Smart-Bookmarks-App.git
    cd Smart-Bookmarks-App
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up Environment Variables:

    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  Run the development server:

    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
