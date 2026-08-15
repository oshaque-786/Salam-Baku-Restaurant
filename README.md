# Salam Baku Restaurant
Production-ready restaurant website and reservation management system for Salam Baku Restaurant, Baku, Azerbaijan.
The project includes:
- Public restaurant website
- Restaurant information and menu sections
- Gallery and testimonials
- Reservation form
- WhatsApp customer contact widget
- Firebase-backed reservation storage
- Protected staff/admin dashboard
- Reservation management
- Analytics/dashboard functionality
- Responsive desktop, tablet and mobile layouts
- SEO and social sharing metadata
- Production build using Vite

1. Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- Motion
- Lucide React
- Firebase / Firestore
- React Router
- Recharts
- GitHub Pages deployment

2. Project Structure
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── context/
│   ├── auth/
│   ├── utils/
│   └── App.tsx
├── firestore.rules
├── firestore.indexes.json
├── firebase.json
├── .firebaserc
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

3. Requirements
Before running the project, install:
•	Node.js 
•	npm 
•	Git 
Verify the installations:
node --version
npm --version
git --version
Firebase CLI is required for Firebase deployment/rules management:
npm install -g firebase-tools
Verify:
firebase --version

4. Installation
Clone the repository:
git clone <YOUR-GITHUB-REPOSITORY-URL>
Enter the project directory:
cd salam-baku-restaurant
Install dependencies:
npm install

5. Environment Variables
Create a local environment file:
.env
Do not commit .env to Git.
Use .env.example as the template.
Example:
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
Use the actual Firebase project configuration values for the production project.
Important
Never put private credentials, service-account JSON files, private keys, passwords or admin secrets inside:
•	.env committed to Git 
•	React source code 
•	public/ 
•	Firebase client configuration 
•	README documentation 
Firebase Web configuration values such as the API key are not treated as server-side secrets. Security must be enforced through Firebase Authentication and Firestore/Storage Security Rules.

6. Development
Start the local development server:
npm run dev
Vite will display the local development URL in the terminal.
Open that URL in a browser.

7. Lint / TypeScript Check
Run the project TypeScript check:
npm run lint
The project should complete without TypeScript errors.

8. Production Build
Create a production build:
npm run build
The generated production files are placed in:
dist/
A successful production build should finish without errors.

9. Preview Production Build
After building, the production build can be previewed locally:
npm run preview
Use this to verify the production bundle before deployment.

10. Firebase Configuration
The project uses Firebase for backend functionality, including Firestore and authentication-related functionality.
The production Firebase project is:
Project ID: salam-baku-restaurant
Firebase project files include:
firebase.json
.firebaserc
firestore.rules
firestore.indexes.json

11. Firebase Authentication
Staff/admin access is protected through Firebase Authentication.
Only authorized staff accounts should have access to the protected dashboard.
Do not expose admin credentials in the frontend source code or repository.
Admin/staff account management should be performed through Firebase Authentication / Firebase Console.

12. Firestore
Reservations are stored in Firestore.
The main reservation collection is:
reservations
The application uses Firestore Security Rules to control access.
The expected security model is:
•	Public users can create valid reservations. 
•	Public users cannot read reservations. 
•	Public users cannot update or delete reservations. 
•	Authorized staff can read reservations. 
•	Authorized staff can manage reservations. 
•	Public settings can be read where required by the application. 
•	Settings modification is restricted to authorized staff. 
Firestore rules are stored in:
firestore.rules
Firestore indexes are stored in:
firestore.indexes.json

13. Firebase Security Rules Deployment
Authenticate with Firebase CLI:
firebase login
Verify the available Firebase projects:
firebase projects:list
Select the production project:
firebase use salam-baku-restaurant
Deploy Firestore rules and indexes:
firebase deploy --only firestore
Before deployment, review:
firestore.rules
firestore.indexes.json
Do not deploy unreviewed Firebase Security Rules to production.

14. Firebase Storage
If Firebase Storage is enabled for the production project, its Security Rules should be maintained separately in:
storage.rules
The repository should contain the Storage configuration only when Storage is actually used by the application.
Do not make private uploaded files publicly writable.
Storage access must follow the application's actual authentication and file-access requirements.

15. Firebase Project Association
The local Firebase configuration is associated with:
salam-baku-restaurant
Firebase project aliases are managed through:
.firebaserc
Firebase CLI commands should be executed from the project root.

16. Deployment
The application is a Vite/React frontend.
Production build:
npm run build
The deployment output is:
dist/
For GitHub Pages deployment, the repository's configured GitHub Actions workflow should build the application and publish the production output.
Before deployment:
npm run lint
npm run build
Both commands should complete successfully.

17. GitHub Pages
The production website is intended to be deployed through GitHub Pages.
After pushing changes to the configured production branch, the GitHub Actions deployment workflow should build and publish the site.
Check:
GitHub Repository
→ Actions
→ deployment workflow
Verify that the latest workflow completes successfully.
After deployment, verify:
•	Homepage loads 
•	Internal navigation works 
•	Images load 
•	CSS loads 
•	JavaScript loads 
•	Reservation form works 
•	WhatsApp widget works 
•	Dashboard route remains protected 
•	Mobile layout works 
•	SEO metadata is present 
•	No console errors are present 

18. Production Verification
Before delivering the project to the restaurant owner, run:
npm run lint
Then:
npm run build
Then verify the production website manually.
Public Website
Verify:
•	Home 
•	About 
•	Menu 
•	Gallery 
•	Testimonials 
•	FAQ 
•	Contact / Location 
•	Reservation 
•	Footer 
•	Navigation 
•	WhatsApp widget 
Reservation
Verify:
•	Form validation 
•	Required fields 
•	Guest limits 
•	Date/time selection 
•	Successful reservation submission 
•	Firestore document creation 
•	Reservation status 
•	Confirmation behaviour 
Dashboard
Verify:
•	Login 
•	Protected routes 
•	Reservation list 
•	Reservation details 
•	Reservation filtering 
•	Reservation management 
•	Analytics 
•	Logout 
Responsive Testing
Test at minimum:
•	Mobile 
•	Tablet 
•	Desktop 
Check both portrait and landscape layouts where applicable.

19. SEO
The production website should contain appropriate:
•	Page title 
•	Meta description 
•	Open Graph metadata 
•	Twitter/social metadata where applicable 
•	Canonical URL where applicable 
•	Restaurant/location information 
•	Semantic headings 
•	Image alt text 
•	Mobile-friendly layout 
After deployment, verify the actual production HTML rather than relying only on the development environment.

20. Images and Assets
Static website assets are stored primarily under:
public/
Images should be optimized for their actual display size.
Avoid unnecessarily large image files because they increase:
•	Initial page load time 
•	Mobile data usage 
•	Build/deployment size 
•	Browser memory usage 
Before replacing or resizing production images, verify the visual result on the website.

21. WhatsApp Widget
The website includes a movable WhatsApp contact widget.
The widget supports:
•	Opening/closing the chat panel 
•	Starting a WhatsApp conversation 
•	Dragging the widget 
•	Saving the widget position locally 
•	Restoring the saved position after refresh 
The WhatsApp phone number and default message are configured inside the widget component.
Any production change to the WhatsApp number must be verified before deployment.

22. Git Workflow
Before committing production changes:
git status
Review modified files.
Run:
npm run lint
Then:
npm run build
Only commit the intended project files.
Do not commit:
.env
node_modules/
dist/
private credentials
service-account JSON files
unless a specific deployment configuration intentionally requires otherwise.

23. Recommended Production Sequence
Use this sequence before every production release:
1. Review code changes
2. git status
3. npm run lint
4. npm run build
5. Test production build
6. Test reservation flow
7. Test admin/dashboard
8. Test Firebase
9. Test mobile/tablet/desktop
10. Check browser console
11. Verify SEO
12. Commit changes
13. Push to GitHub
14. Verify GitHub Actions
15. Verify live website
16. Verify Firebase production data/rules

24. Production Ownership / Handover
If the website is transferred to the restaurant owner or another developer, the following should be transferred or documented separately:
•	GitHub repository access 
•	Firebase project ownership/access 
•	Firebase Authentication administration 
•	Domain/DNS access, if applicable 
•	GitHub Pages configuration 
•	Production environment variables 
•	Admin account management 
•	Deployment procedure 
•	Firebase Security Rules 
•	Website maintenance procedure 
Never transfer private passwords through the Git repository or README.

25. Maintenance
Routine maintenance should include:
•	Dependency updates 
•	Security updates 
•	Firebase Security Rule review 
•	Broken-link checks 
•	Reservation-flow testing 
•	Mobile testing 
•	Browser compatibility testing 
•	Image optimization 
•	SEO review 
•	GitHub Actions/deployment checks 
•	Firebase usage and billing monitoring 
Production changes should always be tested locally before deployment.

26. Final Production Status
Before considering the project complete, confirm:
[ ] npm run lint passes
[ ] npm run build passes
[ ] Production website loads
[ ] All public pages work
[ ] Reservation flow works
[ ] Firestore reservation creation works
[ ] Dashboard login works
[ ] Protected routes are protected
[ ] Dashboard reservation management works
[ ] Firebase Security Rules are deployed/reviewed
[ ] Mobile layout verified
[ ] Tablet layout verified
[ ] Desktop layout verified
[ ] WhatsApp widget verified
[ ] Images verified
[ ] SEO metadata verified
[ ] GitHub Actions deployment passes
[ ] Live production website verified

Project Conclusion
Salam Baku Restaurant is a React/TypeScript restaurant website with Firebase-backed reservation and administrative functionality.
The production application should be maintained through the source repository, Firebase project, and deployment configuration described in this document.
Any future developer should first run the project locally, review the environment configuration, verify Firebase access, run the lint/build checks, and complete production QA before making production change

