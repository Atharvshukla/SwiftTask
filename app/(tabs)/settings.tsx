import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Moon, Sun, Bell, Trash2, CircleHelp as HelpCircle, Info } from 'lucide-react-native';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';

export default function SettingsScreen() {
  const { clearCompletedTodos, clearAllTodos } = useTodos();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);

  // Apply theme styles
  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
    },
    header: {
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      borderBottomColor: isDarkMode ? '#334155' : '#e2e8f0',
    },
    title: {
      color: isDarkMode ? '#f1f5f9' : '#1e293b',
    },
    sectionTitle: {
      color: isDarkMode ? '#94a3b8' : '#64748b',
    },
    settingItem: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      shadowColor: isDarkMode ? '#000000' : '#000000',
    },
    settingIconContainer: {
      backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
    },
    settingTitle: {
      color: isDarkMode ? '#e2e8f0' : '#334155',
    },
    settingDescription: {
      color: isDarkMode ? '#94a3b8' : '#64748b',
    },
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={[styles.header, themeStyles.header]}>
        <Text style={[styles.title, themeStyles.title]}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Preferences</Text>
          
          <View style={[styles.settingItem, themeStyles.settingItem]}>
            <View style={[styles.settingIconContainer, themeStyles.settingIconContainer]}>
              {isDarkMode ? (
                <Moon size={22} color="#6366f1" />
              ) : (
                <Sun size={22} color="#6366f1" />
              )}
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, themeStyles.settingTitle]}>Dark Mode</Text>
              <Text style={[styles.settingDescription, themeStyles.settingDescription]}>
                Switch between light and dark themes
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
              thumbColor={isDarkMode ? '#6366f1' : '#f1f5f9'}
            />
          </View>

          <View style={[styles.settingItem, themeStyles.settingItem]}>
            <View style={[styles.settingIconContainer, themeStyles.settingIconContainer]}>
              <Bell size={22} color="#6366f1" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, themeStyles.settingTitle]}>Notifications</Text>
              <Text style={[styles.settingDescription, themeStyles.settingDescription]}>
                Receive reminders for your tasks
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e2e8f0', true: '#c7d2fe' }}
              thumbColor={notifications ? '#6366f1' : '#f1f5f9'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Data Management</Text>
          
          <TouchableOpacity
            style={[styles.settingItem, themeStyles.settingItem]}
            onPress={() => {
              console.log('Clear Completed Tasks button pressed');
              clearCompletedTodos();
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconContainer, themeStyles.settingIconContainer]}>
              <Trash2 size={22} color="#6366f1" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, themeStyles.settingTitle]}>Clear Completed Tasks</Text>
              <Text style={[styles.settingDescription, themeStyles.settingDescription]}>
                Remove all completed tasks from the list
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, themeStyles.settingItem]}
            onPress={() => {
              console.log('Clear All Tasks button pressed');
              clearAllTodos();
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconContainer, themeStyles.settingIconContainer]}>
              <Trash2 size={22} color="#ef4444" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: '#ef4444' }]}>
                Clear All Tasks
              </Text>
              <Text style={[styles.settingDescription, themeStyles.settingDescription]}>
                Remove all tasks from the list
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>About</Text>
          
          <TouchableOpacity
            style={[styles.settingItem, themeStyles.settingItem]}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconContainer, themeStyles.settingIconContainer]}>
              <HelpCircle size={22} color="#6366f1" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, themeStyles.settingTitle]}>Help & Support</Text>
              <Text style={[styles.settingDescription, themeStyles.settingDescription]}>
                Get help with using the app
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, themeStyles.settingItem]}
            activeOpacity={0.7}
          >
            <View style={[styles.settingIconContainer, themeStyles.settingIconContainer]}>
              <Info size={22} color="#6366f1" />
            </View>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, themeStyles.settingTitle]}>About TaskMaster</Text>
              <Text style={[styles.settingDescription, themeStyles.settingDescription]}>
                Version 1.0.0
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 24,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748b',
  },
});