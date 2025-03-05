# 📌 React Native To-Do List App

## 📖 Overview
The **React Native To-Do List App** is a simple and efficient task management application built using React Native and Expo. It helps users add, search, filter, and manage tasks efficiently while providing an intuitive and visually appealing interface with Dark Mode support.

## 🎬 App Preview  

<table>
  <tr>
    <th style="width: 50%">📱 iOS Demo</th>
    <th style="width: 50%">🤖 Android Demo</th>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/3d8a29b3-11e8-4383-9a96-fa139c09c3da" width="250">
    </td>
    <td align="center">
      <img src="![androidDemo](https://github.com/user-attachments/assets/2a4174bf-e7b6-4f38-b89e-5b58e629d4f9)
" width="250">
    </td>
  </tr>
</table>

## 🚀 Features

### 1️⃣ **Landing Page (Splash Screen & Onboarding)**
- Displays a splash screen with the app logo.
- Checks if the user is opening the app for the first time.
- Shows onboarding screens with an app introduction.
-  Navigates to the Home Screen with **Tab Navigation**.

### 2️⃣ **Main Tab Navigation (Three Sections)**
The app contains three primary tabs:

#### 📝 A. **Add Task Screen (Task Management)**
- Users can enter a new task using a **text input field**.
- Optional: Allow users to add **#hashtags** within task descriptions.
- Tasks are stored in **local storage (AsyncStorage) .
- **Task List Display**:
  - Displays tasks in a scrollable list.
  - Each task includes:
    - **Task Name**
    - **Hashtags** (if any)
    - **Completion Status** (Checkbox or Toggle Button)
  - Users can mark a task as completed or uncompleted via a **checkbox** or **swipe gestures**.
  - Completed tasks appear with a **strikethrough or different styling**.

#### 🔍 B. **Search & Filter Task Screen**
- **Search Bar**: Users can search tasks by typing keywords.
- **Hashtag Filter**: Users can filter tasks based on hashtags.
- **Dynamic List Update**: The task list updates in real-time as users type or select hashtags.

#### ⚙️ C. **Settings Screen**
- **Theme Switching**: Users can toggle between **Light Mode and Dark Mode**.
- **Delete Options**:
  - Delete All Completed Tasks
  - Delete All Tasks (Clear List)

### 3️⃣ **Application Testing using Expo Go**
- Install **Expo Go** on iPhone/Android.
- Run the following command to start the development server:
  ```sh
  expo start
  ```
- Scan the **QR Code** to open the app on a real device.
- Test functionalities:
  - ✅ Add/Edit/Delete tasks
  - ✅ Apply filters with hashtags
  - ✅ Mark tasks as completed
  - ✅ Change themes
  - ✅ Validate persistence of data

---

## 🛠️ **Tech Stack**
- **React Native** (UI development)
- **Expo** (Development & Testing)
- **AsyncStorage** (Local Storage for task persistence)
- **React  Navigation** (Tab Navigation)
- **React Native ** (UI Components & Theming)
- **Firebase (Will Be Implemented)** (Cloud Database for task storage)

---

## 📂 **Project Structure**
```
📦 react-native-todo-list-app
 ┣ 📜 README.md                 # Project documentation
 ┣ 📜 app.json                   # Expo configuration
 ┣ 📜 tsconfig.json               # TypeScript configuration
 ┣ 📜 package.json               # Dependencies & scripts
 ┣ 📜 package-lock.json          # Lock file for package versions
 ┣ 📂 assets                     # Static assets (images, fonts, icons)
 ┃ ┣ 📂 fonts
 ┃ ┃ ┗ 📜 SpaceMono-Regular.ttf  # Custom font
 ┃ ┣ 📂 images
 ┃ ┃ ┣ 📜 adaptive-icon.png
 ┃ ┃ ┣ 📜 favicon.png
 ┃ ┃ ┣ 📜 icon.png
 ┃ ┃ ┣ 📜 splash-icon.png
 ┃ ┃ ┗ 📜 react-logo.png
 ┣ 📂 app                        # App screens and navigation (Expo Router)
 ┃ ┣ 📂 (tabs)                   # Tab-based navigation
 ┃ ┃ ┣ 📜 _layout.tsx            # Tab navigation layout
 ┃ ┃ ┣ 📜 index.tsx              # Home screen (Add Task)
 ┃ ┃ ┣ 📜 search.tsx             # Search & Filter screen
 ┃ ┃ ┗ 📜 settings.tsx           # Settings screen
 ┃ ┣ 📜 +not-found.tsx           # 404 screen (for unknown routes)
 ┃ ┣ 📜 _layout.tsx              # Main layout for the app
 ┃ ┗ 📜 index.tsx                # App entry point (Landing Page)
 ┣ 📂 components                 # Reusable UI components (Buttons, Input, etc.)
 ┣ 📂 context                    # Global state management
 ┃ ┗ 📜 TodosContext.tsx         # Context API for managing tasks
 ┣ 📂 hooks                      # Custom hooks for state management
 ┃ ┣ 📜 useTheme.tsx             # Custom hook for theme switching
 ┃ ┗ 📜 useTodos.tsx             # Custom hook for managing todos
 ┣ 📂 scripts                    # Utility scripts
 ┃ ┗ 📜 reset-project.js         # Script to reset the project state
 ┣ 📂 utils                      # Utility functions
 ┃ ┗ 📜 hashtag.ts               # Function to extract & manage hashtags

```

---

## 📦 **Installation & Setup**
1️⃣ **Clone the repository:**
```sh
git clone https://github.com/your-username/react-native-todo-list-app.git
cd react-native-todo-list-app
```

2️⃣ **Install dependencies:**
```sh
npm install
# OR
yarn install
```

3️⃣ **Start the Expo development server:**
```sh
npx expo start
```

4️⃣ **Run on a mobile device:**
- Install the **Expo Go** app (available on iOS & Android).
- Scan the QR code displayed in the terminal.

---
## 📸 **Screenshots**

### 🏠 **App Screens Overview**

| **Splash Screen** | **Task List** | **Settings** |
|------------------|-------------|------------|
| ![Splash Screen](https://github.com/user-attachments/assets/f7effbd1-3aee-4a61-ab0c-04d0ffa24287) | ![Task List](https://github.com/user-attachments/assets/a3c1aef5-2d8f-4d39-9c1f-405c5129b560) | ![Settings](https://github.com/user-attachments/assets/ae56f8d7-efbc-4725-b96c-01782dcc94f5) |

---

### 🔍 **Search & Filter Variations**
| Filter added | Filter 1 | Filter 2 | Filter 3 |
|----------|----------|----------|----------|
| ![Filter 1](https://github.com/user-attachments/assets/2251518c-a251-4feb-8de1-83a490ef3ba8) | ![Filter 2](https://github.com/user-attachments/assets/72db5a78-ebd7-473e-bc6d-17d346d9aae8) | ![Filter 3](https://github.com/user-attachments/assets/8d56435f-5a76-4f7c-b506-6da522f6e7e7) | ![Filter 4](https://github.com/user-attachments/assets/48136eae-7468-483b-843d-03280518e308) |


## 🔥 **Upcoming Features**
- ✅ Task Categories
- ✅ Reminder Notifications
- ✅ Cloud Syncing with Firebase
- ✅ Drag & Drop Task Sorting

---

## ⚖️ **License**
This project is licensed under the **MIT License**.

---

Happy Coding! 🚀
