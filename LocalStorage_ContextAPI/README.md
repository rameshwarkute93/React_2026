Step 1 : Create AuthContext (Global State)
Step 2 : Wrap Entire App with Provider in main.jsx
             <AuthProvider>
                <App />
             </AuthProvider>
Step 3 : Set Data Where Login Happens (Login Page) , import and initialize the context
Step 4 : Get Data Where You Need It (Dashboard / Home / Navbar) , import and initialize the context
