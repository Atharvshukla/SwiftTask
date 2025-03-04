# 📌 React Native To-Do List App

## 📖 Overview
The **React Native To-Do List App** is a simple and efficient task management application built using React Native and Expo. It helps users add, search, filter, and manage tasks efficiently while providing an intuitive and visually appealing interface with Dark Mode support.

## 🚀 Features

### 1️⃣ **Landing Page (Splash Screen & Onboarding)**
- Displays a splash screen with the app logo.
- Checks if the user is opening the app for the first time.
- If first-time user → Shows onboarding screens with an app introduction.
- If not → Navigates directly to the Home Screen with **Tab Navigation**.

### 2️⃣ **Main Tab Navigation (Three Sections)**
The app contains three primary tabs:

#### 📝 A. **Add Task Screen (Task Management)**
- Users can enter a new task using a **text input field**.
- Optional: Allow users to add **#hashtags** within task descriptions.
- Tasks are stored in **local storage (AsyncStorage) or Firebase**.
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
- **React Navigation** (Tab Navigation)
- **React Native Paper** (UI Components & Theming)
- **Firebase (Optional)** (Cloud Database for task storage)

---

## 📂 **Project Structure**
```
📦 react-native-todo-list-app
 ┣ 📂 assets              # App assets (icons, images, etc.)
 ┣ 📂 components          # Reusable UI components
 ┣ 📂 screens            # App screens (AddTask, Search, Settings)
 ┣ 📂 utils              # Utility functions
 ┣ 📜 App.js             # Main entry point
 ┣ 📜 navigation.js      # Navigation setup
 ┣ 📜 theme.js           # Light & Dark Mode configuration
 ┣ 📜 package.json       # Dependencies & scripts
 ┣ 📜 README.md          # Documentation
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
| Splash Screen | Task List | Search & Filter | Settings |
|--------------|-----------|----------------|----------|
| ![Splash](https://via.placeholder.com/200) | ![image](https://github.com/user-attachments/assets/a3c1aef5-2d8f-4d39-9c1f-405c5129b560)![image](https://github.com/user-attachments/assets/c56e5e33-86bb-4e8c-9f6e-84f424f2b105)

) | ![Search](https://via.placeholder.com/200) | ![Settings](https://via.placeholder.com/200) |

---

## 🤝 **Contributing**
1. **Fork the repository**.
2. **Create a new branch** for your feature (`git checkout -b feature-name`).
3. **Commit your changes** (`git commit -m 'Add new feature'`).
4. **Push to your branch** (`git push origin feature-name`).
5. **Submit a Pull Request**.

---

## 🔥 **Upcoming Features**
- ✅ Task Categories
- ✅ Reminder Notifications
- ✅ Cloud Syncing with Firebase
- ✅ Drag & Drop Task Sorting

---

## ⚖️ **License**
This project is licensed under the **MIT License**.

---

## 🙌 **Support & Feedback**
If you encounter any issues, feel free to [open an issue](https://github.com/your-username/react-native-todo-list-app/issues) or contact me at **your-email@example.com**.

Happy Coding! 🚀
