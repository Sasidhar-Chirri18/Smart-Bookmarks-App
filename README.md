# Smart Bookmark App

<<<<<<< HEAD
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
=======
A personal library for saving and organizing your favorite web links. Built with **Next.js**, **Supabase**, and **Tailwind CSS**.

## Features

-   **User Authentication**: Secure sign-in with Google via Supabase Auth.
-   **Bookmark Management**: Add, view, and delete bookmarks in real-time.
-   **Dark Mode**: A sleek, dark-themed UI designed for comfort and style.
-   **Responsive Design**: Fully responsive layout that works on desktop and mobile.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Language**: TypeScript

## Getting Started

1.  **Clone the repository:**
>>>>>>> cebd7ec (Fix next.config for Next.js 16)

    ```bash
    git clone https://github.com/Sasidhar-Chirri18/Smart-Bookmarks-App.git
    cd Smart-Bookmarks-App
    ```

<<<<<<< HEAD
2. Install dependencies:
=======
2.  **Install dependencies:**
>>>>>>> cebd7ec (Fix next.config for Next.js 16)

    ```bash
    npm install
    # or
    yarn install
    ```

<<<<<<< HEAD
3. Set up Environment Variables:
=======
3.  **Set up Environment Variables:**
>>>>>>> cebd7ec (Fix next.config for Next.js 16)

    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

<<<<<<< HEAD
4.  Run the development server:
=======
4.  **Run the development server:**
>>>>>>> cebd7ec (Fix next.config for Next.js 16)

    ```bash
    npm run dev
    ```
<<<<<<< HEAD
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
=======

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Challenges & Solutions

During the development and refinement of this application, several challenges were encountered and solved:

### 1. Reverting to a Previous Login Model
**Challenge:** The login page had evolved into a state that didn't match the desired "previous model".
**Solution:**
-   Utilized `git log` to inspect the commit history of `src/app/login/page.tsx`.
-   Identified the commit hash corresponding to the previous version.
-   Used `git checkout HEAD "src/app/login/page.tsx"` to revert the file to the desired state while keeping other project files intact.

### 2. Implementing a Specific Login Redesign
**Challenge:** A screenshot was provided for a new login page design that required specific UI elements (dark theme, glassmorphism, specific layout) different from the restored version.
**Solution:**
-   Analyzed the screenshot to identify key design tokens (colors, spacing, typography).
-   Implemented a dark theme using Tailwind's arbitrary value syntax (e.g., `bg-[#0f172a]`) to match the exact background color.
-   Created a custom SVG component for the bookmark logo and styled it with a glassmorphism effect using `bg-blue-600/20` and ring utilities.

### 3. Customizing the Google Sign-In Button
**Challenge:** The initial dark theme implementation of the Google button clashed with the official branding guidelines, and the user requested the original colorful Google logo on a white background.
**Solution:**
-   Refactored the button to use a white background (`bg-white`) with dark text (`text-slate-900`).
-   Replaced the monochrome SVG icon with the official multi-colored Google logo SVG paths.
-   Ensured the button remained responsive and accessible with proper hover and active states.

### 4. Applying a Consistent Global Dark Theme
**Challenge:** The dark theme was initially only applied to the login page, creating a jarring experience when navigating to the main app, which was still light-themed.
**Solution:**
-   Updated `src/app/globals.css` to override the root variables, setting the global background to `#0f172a` and foreground to white.
-   Refactored the `Navbar` component to remove the white background and apply the dark styled layout.
-   Updated the `AddBookmarkForm` and `BookmarkList` components to use dark glassmorphism styles (`bg-slate-800/50`, `backdrop-blur-xl`), ensuring all input fields and text elements were legible against the dark background.
>>>>>>> cebd7ec (Fix next.config for Next.js 16)
