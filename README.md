# (itkbroke)?
> From broke people to broke people

## Useful information
### Couple of rules
* Work and commit only in "dev" branch
* Never commit directly to "main" branch without permission

### Project installation
1. Create project folder on your computer
2. Open terminal with folder path - (C:\projects\itkbroke) 
3. [Install Next.js](https://nextjs.org/docs/getting-started/installation) - `npx create-next-app@latest`, "project" folder name for Next.js - "client"
4. Inside the main project folder create new folder "server" and install Node.js - `npm init`
5. Install all dependencies (list of them is below)
6. Get back to terminal and connect to repository (check Git documentation below)
7. Make sure that you connected to "dev" branch
8. Clone repository to your workspace and merge your project files with existing files

## Work process
### To-do
#### Frontend
* New-in pages
* On Clothing+Accessories+Sale pages needs to be added a "Sort by" menu and range input field
* Configure logic for buttons on Clothing pages + Item page
* Navigation bar for mobile devices
* Connect payment to backend
#### Backend
* Image storage process


### In progress
* Frontend pages
* Authorization proccess
* Owner control panel

### Done
#### Frontend
* Configured
* Home, All Brands, Clothing, Accessories, Brand, Cart, Profile, Item pages
* Navigation bar + side menu
* Added routing
* Custom scrollbar
* Filterbar + Filter Sidebar for clothing\accessories pages
* Pop-up window for logging in and registration
* Connected pop-up window to backend
#### Backend
* Configured
* Implemented database connection
* Added registration+logging in
* Configured owner and user accessability
* Added accessability by role

### Future features
* Add a review section
* Messenger (customers with owners)

## Links
### Work-links
* Figma [direct link](https://www.figma.com/file/f6BjvXgXs9GVUNQs2MUJD9/Website?type=design&mode=design&t=eDPvBEuF9kpbvYK0-0)
* Figma [invite link](https://www.figma.com/team_invite/redeem/TvlmHkmLVmZOg4xRcrLNpq)
* [Discord](https://discord.gg/BuTQQzx2h)

### Docs
* [Tailwind CSS](https://tailwindcss.com/docs/installation)
* [Git](https://zarkom.notion.site/zarkom/Introduction-to-Git-ac396a0697704709a12b6a0e545db049)
* [Next.js](https://nextjs.org/docs)

### Miscellaneous
* [React-icons](https://react-icons.github.io/react-icons/)

## Dependencies
### Frontend
* React-icons `npm install react-icons`

### Backend
* Express `npm install express`
* Dotenv `npm install dotenv`
* Nodemon `npm install nodemon`
* Mongoose `npm install mongoose`
* MongoDB `npm install mongodb`
* BCrycpt `npm install bcrypt`
* JWT `npm install jsonwebtoken`
* CORS `npm install cors`
* CookieParser `npm install cookie-parser`