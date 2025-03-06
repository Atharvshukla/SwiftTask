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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  CirclePlus as PlusCircle,
  CircleCheck as CheckCircle,
  Circle,
  Trash2,
  Pencil,
} from 'lucide-react-native';
import { useTodos } from '@/hooks/useTodos';
import { extractHashtags } from '@/utils/hashtag';
import { useTheme } from '@/hooks/useTheme';
import BottomSheet, { BottomSheetRefProps } from '@/components/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
  const { todos, addTodo, editTodo, toggleTodo, removeTodo } = useTodos();
  const { isDarkMode } = useTheme();
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const addButtonScale = useRef(new Animated.Value(1)).current;
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

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
//Function to handel the useTodo Hooks
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
      animateButton();
      Keyboard.dismiss();

      // Scroll to bottom after adding a new todo
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleEditPress = (todoId: string) => {
    setSelectedTodoId(todoId);
    const destination = Platform.OS === 'ios' ? -SCREEN_HEIGHT * 0.5 : -300;
    bottomSheetRef.current?.scrollTo(destination);
  };

  const handleEditSave = (newText: string) => {
    if (selectedTodoId && newText.trim()) {
      editTodo(selectedTodoId, newText.trim());
      setSelectedTodoId(null);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, themeStyles.container]}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
        >
          <View style={[styles.header, themeStyles.header]}>
            <Text style={[styles.title, themeStyles.title]}>My Tasks</Text>
            <Text style={[styles.subtitle, themeStyles.subtitle]}>
              {todos.filter((todo) => todo.completed).length}/{todos.length}{' '}
              completed
            </Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={[
              styles.todoList,
              { paddingBottom: keyboardHeight + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {todos.map((todo) => {
              const hashtags = extractHashtags(todo.text);
              return (
                <View
                  key={todo.id}
                  style={[
                    styles.todoItem,
                    themeStyles.todoItem,
                    todo.completed && [
                      styles.todoItemCompleted,
                      themeStyles.todoItemCompleted,
                    ],
                  ]}
                >
                  <TouchableOpacity
                    style={styles.todoCheckbox}
                    onPress={() => toggleTodo(todo.id)}
                  >
                    {todo.completed ? (
                      <CheckCircle size={24} color="#6366f1" />
                    ) : (
                      <Circle
                        size={24}
                        color={isDarkMode ? '#94a3b8' : '#94a3b8'}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={styles.todoTextContainer}>
                    <Text
                      style={[
                        styles.todoText,
                        themeStyles.todoText,
                        todo.completed && [
                          styles.todoTextCompleted,
                          themeStyles.todoTextCompleted,
                        ],
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
                          <View
                            key={index}
                            style={[
                              styles.hashtagBadge,
                              themeStyles.hashtagBadge,
                            ]}
                          >
                            <Text style={styles.hashtagBadgeText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEditPress(todo.id)}
                    >
                      <Pencil size={20} color="#6366f1" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => removeTodo(todo.id)}
                    >
                      <Trash2 size={20} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <View 
            style={[
              styles.inputContainer,
              {
                bottom: Platform.OS === 'ios' ? keyboardHeight + 20 : 20,
                paddingHorizontal: 20,
              },
            ]}
          >
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

        {selectedTodoId && (
          <BottomSheet
            ref={bottomSheetRef}
            taskText={todos.find((todo) => todo.id === selectedTodoId)?.text || ''}
            onSave={handleEditSave}
            onClose={() => setSelectedTodoId(null)}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
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