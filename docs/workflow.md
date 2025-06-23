PenaltyPal: User & System Workflow
This document outlines the primary workflows for users and the system.

1. Unauthenticated User Workflow
Discovery: The user discovers PenaltyPal through a search engine, social media, or word-of-mouth.

Landing Page: The user lands on the visually engaging marketing homepage (/).

They are greeted with a compelling hero section showing an example AI conversation.

They can scroll to learn about the key features (AI Appeals, Dashboard Management), benefits (Save Money, Save Time), and see the pricing tiers (Freemium, Premium, Fleet).

Multiple "Get Started for Free" or "Sign Up" CTAs are present.

Initiate Sign-up: The user clicks a CTA to begin the registration process.

Redirection: The user is redirected to the /signup page.

2. New User Registration & Onboarding Workflow
Sign-up Page (/signup): The user enters their name, email address, and a password.

Account Creation: Upon submission, the system:

Validates the input.

Creates a new user record in the Supabase auth.users table.

Creates a corresponding user profile in a public profiles table, linked by the user ID.

Login & Redirection: The user is automatically logged in and redirected to their personal dashboard (/dashboard).

Onboarding (First Time): On their first visit to the dashboard, a welcome modal appears.

Step 1: Welcome Message. A brief welcome to PenaltyPal.

Step 2: Add Vehicle. The user is prompted to add their first vehicle's registration plate. This is the primary entity for organizing fines.

Step 3: Tour. A brief, optional tour highlights the "Start New Appeal" button and the area where their fines will be listed.

3. Registered User: Contesting a New Fine
Login: A returning user logs in via the /login page and is directed to /dashboard.

Dashboard View (/dashboard): The user sees their registered vehicles and a list of their existing contested fines.

Initiate New Appeal: The user clicks the "Contest a New Fine" button.

AI Chat Interface (/contest):

The user is taken to the core AI chat page.

The AI greets the user and begins the information-gathering process.

AI: "Hello! I'm here to help you contest your fine. First, please tell me the vehicle registration this is for." (Presents a dropdown of their registered vehicles).

AI: "Great. Now, could you please provide the PCN number?"

AI: "What was the date of the alleged contravention?"

AI: "What is the name of the issuing authority? (e.g., Islington Council, Transport for London)"

AI: "What is the reason they gave for the fine? (e.g., 'Parked in a restricted street during prescribed hours')."

AI: "Thank you. Now, in your own words, please tell me what happened. The more detail, the better."

AI Analysis & Generation:

The user provides their side of the story.

The system sends the collected information and the user's story to the backend AI service.

The AI analyzes the context against its knowledge base of traffic law, compliance rules, and successful appeal strategies.

The AI identifies the strongest grounds for appeal (e.g., "Incorrect signage," "Grace period applies," "Procedural impropriety").

The AI generates a complete, professional appeal email.

Review & Use Appeal:

The generated email is displayed to the user in the chat interface within a formatted, easy-to-copy text area.

The AI also provides a direct link to the likely appeals page for the issuing authority.

The user is presented with two buttons: "Copy Appeal Text" and "Save to Dashboard".

Save & Track:

Upon clicking "Save to Dashboard," a new record is created in the fines database table, linked to their user ID and vehicle.

The record stores the PCN details, the generated appeal text, and is given a default status of "Appeal Generated".

The user is redirected back to their dashboard, where the new fine now appears in their list.

4. Registered User: Managing an Existing Fine
Dashboard View: The user logs in and views their list of fines.

View Details: The user can click on any fine in the list to expand it or navigate to a detail page (/dashboard/fines/[id]).

Update Status: The user can see the full appeal text they saved and can manually update the status of the appeal using a dropdown menu (e.g., change from "Appeal Submitted" to "Won" or "Lost").

Follow-up (V2): If the status is marked as "Lost", a new button "Appeal Again" appears, initiating the workflow for a follow-up appeal to a higher authority.PenaltyPal: User & System Workflow
This document outlines the primary workflows for users and the system.

1. Unauthenticated User Workflow
Discovery: The user discovers PenaltyPal through a search engine, social media, or word-of-mouth.

Landing Page: The user lands on the visually engaging marketing homepage (/).

They are greeted with a compelling hero section showing an example AI conversation.

They can scroll to learn about the key features (AI Appeals, Dashboard Management), benefits (Save Money, Save Time), and see the pricing tiers (Freemium, Premium, Fleet).

Multiple "Get Started for Free" or "Sign Up" CTAs are present.

Initiate Sign-up: The user clicks a CTA to begin the registration process.

Redirection: The user is redirected to the /signup page.

2. New User Registration & Onboarding Workflow
Sign-up Page (/signup): The user enters their name, email address, and a password.

Account Creation: Upon submission, the system:

Validates the input.

Creates a new user record in the Supabase auth.users table.

Creates a corresponding user profile in a public profiles table, linked by the user ID.

Login & Redirection: The user is automatically logged in and redirected to their personal dashboard (/dashboard).

Onboarding (First Time): On their first visit to the dashboard, a welcome modal appears.

Step 1: Welcome Message. A brief welcome to PenaltyPal.

Step 2: Add Vehicle. The user is prompted to add their first vehicle's registration plate. This is the primary entity for organizing fines.

Step 3: Tour. A brief, optional tour highlights the "Start New Appeal" button and the area where their fines will be listed.

3. Registered User: Contesting a New Fine
Login: A returning user logs in via the /login page and is directed to /dashboard.

Dashboard View (/dashboard): The user sees their registered vehicles and a list of their existing contested fines.

Initiate New Appeal: The user clicks the "Contest a New Fine" button.

AI Chat Interface (/contest):

The user is taken to the core AI chat page.

The AI greets the user and begins the information-gathering process.

AI: "Hello! I'm here to help you contest your fine. First, please tell me the vehicle registration this is for." (Presents a dropdown of their registered vehicles).

AI: "Great. Now, could you please provide the PCN number?"

AI: "What was the date of the alleged contravention?"

AI: "What is the name of the issuing authority? (e.g., Islington Council, Transport for London)"

AI: "What is the reason they gave for the fine? (e.g., 'Parked in a restricted street during prescribed hours')."

AI: "Thank you. Now, in your own words, please tell me what happened. The more detail, the better."

AI Analysis & Generation:

The user provides their side of the story.

The system sends the collected information and the user's story to the backend AI service.

The AI analyzes the context against its knowledge base of traffic law, compliance rules, and successful appeal strategies.

The AI identifies the strongest grounds for appeal (e.g., "Incorrect signage," "Grace period applies," "Procedural impropriety").

The AI generates a complete, professional appeal email.

Review & Use Appeal:

The generated email is displayed to the user in the chat interface within a formatted, easy-to-copy text area.

The AI also provides a direct link to the likely appeals page for the issuing authority.

The user is presented with two buttons: "Copy Appeal Text" and "Save to Dashboard".

Save & Track:

Upon clicking "Save to Dashboard," a new record is created in the fines database table, linked to their user ID and vehicle.

The record stores the PCN details, the generated appeal text, and is given a default status of "Appeal Generated".

The user is redirected back to their dashboard, where the new fine now appears in their list.

4. Registered User: Managing an Existing Fine
Dashboard View: The user logs in and views their list of fines.

View Details: The user can click on any fine in the list to expand it or navigate to a detail page (/dashboard/fines/[id]).

Update Status: The user can see the full appeal text they saved and can manually update the status of the appeal using a dropdown menu (e.g., change from "Appeal Submitted" to "Won" or "Lost").

Follow-up (V2): If the status is marked as "Lost", a new button "Appeal Again" appears, initiating the workflow for a follow-up appeal to a higher authority.PenaltyPal: User & System Workflow
This document outlines the primary workflows for users and the system.

1. Unauthenticated User Workflow
Discovery: The user discovers PenaltyPal through a search engine, social media, or word-of-mouth.

Landing Page: The user lands on the visually engaging marketing homepage (/).

They are greeted with a compelling hero section showing an example AI conversation.

They can scroll to learn about the key features (AI Appeals, Dashboard Management), benefits (Save Money, Save Time), and see the pricing tiers (Freemium, Premium, Fleet).

Multiple "Get Started for Free" or "Sign Up" CTAs are present.

Initiate Sign-up: The user clicks a CTA to begin the registration process.

Redirection: The user is redirected to the /signup page.

2. New User Registration & Onboarding Workflow
Sign-up Page (/signup): The user enters their name, email address, and a password.

Account Creation: Upon submission, the system:

Validates the input.

Creates a new user record in the Supabase auth.users table.

Creates a corresponding user profile in a public profiles table, linked by the user ID.

Login & Redirection: The user is automatically logged in and redirected to their personal dashboard (/dashboard).

Onboarding (First Time): On their first visit to the dashboard, a welcome modal appears.

Step 1: Welcome Message. A brief welcome to PenaltyPal.

Step 2: Add Vehicle. The user is prompted to add their first vehicle's registration plate. This is the primary entity for organizing fines.

Step 3: Tour. A brief, optional tour highlights the "Start New Appeal" button and the area where their fines will be listed.

3. Registered User: Contesting a New Fine
Login: A returning user logs in via the /login page and is directed to /dashboard.

Dashboard View (/dashboard): The user sees their registered vehicles and a list of their existing contested fines.

Initiate New Appeal: The user clicks the "Contest a New Fine" button.

AI Chat Interface (/contest):

The user is taken to the core AI chat page.

The AI greets the user and begins the information-gathering process.

AI: "Hello! I'm here to help you contest your fine. First, please tell me the vehicle registration this is for." (Presents a dropdown of their registered vehicles).

AI: "Great. Now, could you please provide the PCN number?"

AI: "What was the date of the alleged contravention?"

AI: "What is the name of the issuing authority? (e.g., Islington Council, Transport for London)"

AI: "What is the reason they gave for the fine? (e.g., 'Parked in a restricted street during prescribed hours')."

AI: "Thank you. Now, in your own words, please tell me what happened. The more detail, the better."

AI Analysis & Generation:

The user provides their side of the story.

The system sends the collected information and the user's story to the backend AI service.

The AI analyzes the context against its knowledge base of traffic law, compliance rules, and successful appeal strategies.

The AI identifies the strongest grounds for appeal (e.g., "Incorrect signage," "Grace period applies," "Procedural impropriety").

The AI generates a complete, professional appeal email.

Review & Use Appeal:

The generated email is displayed to the user in the chat interface within a formatted, easy-to-copy text area.

The AI also provides a direct link to the likely appeals page for the issuing authority.

The user is presented with two buttons: "Copy Appeal Text" and "Save to Dashboard".

Save & Track:

Upon clicking "Save to Dashboard," a new record is created in the fines database table, linked to their user ID and vehicle.

The record stores the PCN details, the generated appeal text, and is given a default status of "Appeal Generated".

The user is redirected back to their dashboard, where the new fine now appears in their list.

4. Registered User: Managing an Existing Fine
Dashboard View: The user logs in and views their list of fines.

View Details: The user can click on any fine in the list to expand it or navigate to a detail page (/dashboard/fines/[id]).

Update Status: The user can see the full appeal text they saved and can manually update the status of the appeal using a dropdown menu (e.g., change from "Appeal Submitted" to "Won" or "Lost").

Follow-up (V2): If the status is marked as "Lost", a new button "Appeal Again" appears, initiating the workflow for a follow-up appeal to a higher authority.PenaltyPal: User & System Workflow
This document outlines the primary workflows for users and the system.

1. Unauthenticated User Workflow
Discovery: The user discovers PenaltyPal through a search engine, social media, or word-of-mouth.

Landing Page: The user lands on the visually engaging marketing homepage (/).

They are greeted with a compelling hero section showing an example AI conversation.

They can scroll to learn about the key features (AI Appeals, Dashboard Management), benefits (Save Money, Save Time), and see the pricing tiers (Freemium, Premium, Fleet).

Multiple "Get Started for Free" or "Sign Up" CTAs are present.

Initiate Sign-up: The user clicks a CTA to begin the registration process.

Redirection: The user is redirected to the /signup page.

2. New User Registration & Onboarding Workflow
Sign-up Page (/signup): The user enters their name, email address, and a password.

Account Creation: Upon submission, the system:

Validates the input.

Creates a new user record in the Supabase auth.users table.

Creates a corresponding user profile in a public profiles table, linked by the user ID.

Login & Redirection: The user is automatically logged in and redirected to their personal dashboard (/dashboard).

Onboarding (First Time): On their first visit to the dashboard, a welcome modal appears.

Step 1: Welcome Message. A brief welcome to PenaltyPal.

Step 2: Add Vehicle. The user is prompted to add their first vehicle's registration plate. This is the primary entity for organizing fines.

Step 3: Tour. A brief, optional tour highlights the "Start New Appeal" button and the area where their fines will be listed.

3. Registered User: Contesting a New Fine
Login: A returning user logs in via the /login page and is directed to /dashboard.

Dashboard View (/dashboard): The user sees their registered vehicles and a list of their existing contested fines.

Initiate New Appeal: The user clicks the "Contest a New Fine" button.

AI Chat Interface (/contest):

The user is taken to the core AI chat page.

The AI greets the user and begins the information-gathering process.

AI: "Hello! I'm here to help you contest your fine. First, please tell me the vehicle registration this is for." (Presents a dropdown of their registered vehicles).

AI: "Great. Now, could you please provide the PCN number?"

AI: "What was the date of the alleged contravention?"

AI: "What is the name of the issuing authority? (e.g., Islington Council, Transport for London)"

AI: "What is the reason they gave for the fine? (e.g., 'Parked in a restricted street during prescribed hours')."

AI: "Thank you. Now, in your own words, please tell me what happened. The more detail, the better."

AI Analysis & Generation:

The user provides their side of the story.

The system sends the collected information and the user's story to the backend AI service.

The AI analyzes the context against its knowledge base of traffic law, compliance rules, and successful appeal strategies.

The AI identifies the strongest grounds for appeal (e.g., "Incorrect signage," "Grace period applies," "Procedural impropriety").

The AI generates a complete, professional appeal email.

Review & Use Appeal:

The generated email is displayed to the user in the chat interface within a formatted, easy-to-copy text area.

The AI also provides a direct link to the likely appeals page for the issuing authority.

The user is presented with two buttons: "Copy Appeal Text" and "Save to Dashboard".

Save & Track:

Upon clicking "Save to Dashboard," a new record is created in the fines database table, linked to their user ID and vehicle.

The record stores the PCN details, the generated appeal text, and is given a default status of "Appeal Generated".

The user is redirected back to their dashboard, where the new fine now appears in their list.

4. Registered User: Managing an Existing Fine
Dashboard View: The user logs in and views their list of fines.

View Details: The user can click on any fine in the list to expand it or navigate to a detail page (/dashboard/fines/[id]).

Update Status: The user can see the full appeal text they saved and can manually update the status of the appeal using a dropdown menu (e.g., change from "Appeal Submitted" to "Won" or "Lost").

Follow-up (V2): If the status is marked as "Lost", a new button "Appeal Again" appears, initiating the workflow for a follow-up appeal to a higher authority.PenaltyPal: User & System Workflow
This document outlines the primary workflows for users and the system.

1. Unauthenticated User Workflow
Discovery: The user discovers PenaltyPal through a search engine, social media, or word-of-mouth.

Landing Page: The user lands on the visually engaging marketing homepage (/).

They are greeted with a compelling hero section showing an example AI conversation.

They can scroll to learn about the key features (AI Appeals, Dashboard Management), benefits (Save Money, Save Time), and see the pricing tiers (Freemium, Premium, Fleet).

Multiple "Get Started for Free" or "Sign Up" CTAs are present.

Initiate Sign-up: The user clicks a CTA to begin the registration process.

Redirection: The user is redirected to the /signup page.

2. New User Registration & Onboarding Workflow
Sign-up Page (/signup): The user enters their name, email address, and a password.

Account Creation: Upon submission, the system:

Validates the input.

Creates a new user record in the Supabase auth.users table.

Creates a corresponding user profile in a public profiles table, linked by the user ID.

Login & Redirection: The user is automatically logged in and redirected to their personal dashboard (/dashboard).

Onboarding (First Time): On their first visit to the dashboard, a welcome modal appears.

Step 1: Welcome Message. A brief welcome to PenaltyPal.

Step 2: Add Vehicle. The user is prompted to add their first vehicle's registration plate. This is the primary entity for organizing fines.

Step 3: Tour. A brief, optional tour highlights the "Start New Appeal" button and the area where their fines will be listed.

3. Registered User: Contesting a New Fine
Login: A returning user logs in via the /login page and is directed to /dashboard.

Dashboard View (/dashboard): The user sees their registered vehicles and a list of their existing contested fines.

Initiate New Appeal: The user clicks the "Contest a New Fine" button.

AI Chat Interface (/contest):

The user is taken to the core AI chat page.

The AI greets the user and begins the information-gathering process.

AI: "Hello! I'm here to help you contest your fine. First, please tell me the vehicle registration this is for." (Presents a dropdown of their registered vehicles).

AI: "Great. Now, could you please provide the PCN number?"

AI: "What was the date of the alleged contravention?"

AI: "What is the name of the issuing authority? (e.g., Islington Council, Transport for London)"

AI: "What is the reason they gave for the fine? (e.g., 'Parked in a restricted street during prescribed hours')."

AI: "Thank you. Now, in your own words, please tell me what happened. The more detail, the better."

AI Analysis & Generation:

The user provides their side of the story.

The system sends the collected information and the user's story to the backend AI service.

The AI analyzes the context against its knowledge base of traffic law, compliance rules, and successful appeal strategies.

The AI identifies the strongest grounds for appeal (e.g., "Incorrect signage," "Grace period applies," "Procedural impropriety").

The AI generates a complete, professional appeal email.

Review & Use Appeal:

The generated email is displayed to the user in the chat interface within a formatted, easy-to-copy text area.

The AI also provides a direct link to the likely appeals page for the issuing authority.

The user is presented with two buttons: "Copy Appeal Text" and "Save to Dashboard".

Save & Track:

Upon clicking "Save to Dashboard," a new record is created in the fines database table, linked to their user ID and vehicle.

The record stores the PCN details, the generated appeal text, and is given a default status of "Appeal Generated".

The user is redirected back to their dashboard, where the new fine now appears in their list.

4. Registered User: Managing an Existing Fine
Dashboard View: The user logs in and views their list of fines.

View Details: The user can click on any fine in the list to expand it or navigate to a detail page (/dashboard/fines/[id]).

Update Status: The user can see the full appeal text they saved and can manually update the status of the appeal using a dropdown menu (e.g., change from "Appeal Submitted" to "Won" or "Lost").

Follow-up (V2): If the status is marked as "Lost", a new button "Appeal Again" appears, initiating the workflow for a follow-up appeal to a higher authority.