import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CirclePlus as PlusCircle, CircleCheck as CheckCircle, Circle, Trash2 } from 'lucide-react-native';
import { useTodos } from '@/hooks/useTodos';
import { extractHashtags } from '@/utils/hashtag';
import { useTheme } from '@/hooks/useTheme';

export default function HomeScreen() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const { isDarkMode } = useTheme();
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const addButtonScale = useRef(new Animated.Value(1)).current;

  console.log('Rendering HomeScreen with todos:', todos);

  // Animation for add button
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(addButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(addButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
      animateButton();
      Keyboard.dismiss();
      
      // Extract hashtags and store them if needed
      const hashtags = extractHashtags(newTodo.trim());
      // You might want to store these hashtags somewhere if needed

      // Scroll to bottom after adding a new todo
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Prefill with example todos if none exist
  useEffect(() => {
    if (todos.length === 0) {
      addTodo('Buy #banana from the grocery store');
      addTodo('Give mother the banana for kitchen');
      addTodo('Drink #banana shake in the evening');
    }
  }, []);

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
    subtitle: {
      color: isDarkMode ? '#94a3b8' : '#64748b',
    },
    todoItem: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      shadowColor: isDarkMode ? '#000000' : '#000000',
    },
    todoItemCompleted: {
      backgroundColor: isDarkMode ? '#0f172a' : '#f1f5f9',
    },
    todoText: {
      color: isDarkMode ? '#e2e8f0' : '#334155',
    },
    todoTextCompleted: {
      color: isDarkMode ? '#64748b' : '#94a3b8',
    },
    hashtagBadge: {
      backgroundColor: isDarkMode ? '#312e81' : '#ede9fe',
    },
    input: {
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      color: isDarkMode ? '#f1f5f9' : '#334155',
    },
    addButton: {
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
    },
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={[styles.header, themeStyles.header]}>
          <Text style={[styles.title, themeStyles.title]}>My Tasks</Text>
          <Text style={[styles.subtitle, themeStyles.subtitle]}>
            {todos.filter(todo => todo.completed).length}/{todos.length} completed
          </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.todoList}
          showsVerticalScrollIndicator={false}
        >
          {todos.map((todo) => {
            const hashtags = extractHashtags(todo.text);
            return (
              <TouchableOpacity
                key={todo.id}
                style={[
                  styles.todoItem,
                  themeStyles.todoItem,
                  todo.completed && [styles.todoItemCompleted, themeStyles.todoItemCompleted],
                ]}
                onPress={() => toggleTodo(todo.id)}
                activeOpacity={0.7}
              >
                <View style={styles.todoCheckbox}>
                  {todo.completed ? (
                    <CheckCircle size={24} color="#6366f1" />
                  ) : (
                    <Circle size={24} color={isDarkMode ? '#94a3b8' : '#94a3b8'} />
                  )}
                </View>
                <View style={styles.todoTextContainer}>
                  <Text
                    style={[
                      styles.todoText,
                      themeStyles.todoText,
                      todo.completed && [styles.todoTextCompleted, themeStyles.todoTextCompleted],
                    ]}
                  >
                    {todo.text.split(' ').map((word, index) => {
                      if (word.startsWith('#')) {
                        return (
                          <Text key={index} style={styles.hashtag}>
                            {word}{' '}
                          </Text>
                        );
                      }
                      return word + ' ';
                    })}
                  </Text>
                  {hashtags.length > 0 && (
                    <View style={styles.hashtagContainer}>
                      {hashtags.map((tag, index) => (
                        <View key={index} style={[styles.hashtagBadge, themeStyles.hashtagBadge]}>
                          <Text style={styles.hashtagBadgeText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeTodo(todo.id)}
                >
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={[styles.input, themeStyles.input]}
            placeholder="Add a new task..."
            placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={handleAddTodo}
            returnKeyType="done"
            blurOnSubmit={false}
          />
          <Animated.View
            style={[
              styles.addButton,
              themeStyles.addButton,
              { transform: [{ scale: addButtonScale }] },
            ]}
          >
            <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.7}>
              <PlusCircle size={48} color="#6366f1" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoidingView: {
    flex: 1,
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
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  todoList: {
    padding: 20,
    paddingBottom: 100,
  },
  todoItem: {
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
  todoItemCompleted: {
    backgroundColor: '#f1f5f9',
  },
  todoCheckbox: {
    marginRight: 12,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  hashtag: {
    color: '#6366f1',
    fontWeight: '600',
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  hashtagBadge: {
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  hashtagBadgeText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});