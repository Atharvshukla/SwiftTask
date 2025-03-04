import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Search, CircleCheck as CheckCircle, Circle, X } from 'lucide-react-native';
import { useTodos } from '@/hooks/useTodos';
import { extractHashtags } from '@/utils/hashtag';
import { useTheme } from '@/hooks/useTheme';

export default function SearchScreen() {
  const { todos, toggleTodo } = useTodos();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHashtags, setActiveHashtags] = useState<string[]>([]);
  const [allHashtags, setAllHashtags] = useState<string[]>([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  // Extract all unique hashtags from todos
  useEffect(() => {
    const tags = new Set<string>();
    todos.forEach((todo) => {
      const todoTags = extractHashtags(todo.text);
      todoTags.forEach((tag) => tags.add(tag));
    });
    setAllHashtags(Array.from(tags));
  }, [todos]);

  // Filter todos based on active hashtags and search query
  useEffect(() => {
    const filtered = todos.filter((todo) => {
      const todoTags = extractHashtags(todo.text);
      const hasAllTags = activeHashtags.every((tag) => todoTags.includes(tag));
      const matchesSearch = searchQuery ? todo.text.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      return hasAllTags && matchesSearch;
    });
    setFilteredTodos(filtered);
  }, [todos, activeHashtags, searchQuery]);

  const toggleHashtag = (hashtag: string) => {
    setActiveHashtags((prev) => {
      if (prev.includes(hashtag)) {
        return prev.filter((tag) => tag !== hashtag);
      } else {
        return [...prev, hashtag];
      }
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveHashtags([]);
    Keyboard.dismiss();
  };

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
    searchContainer: {
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      borderBottomColor: isDarkMode ? '#334155' : '#e2e8f0',
    },
    searchInputContainer: {
      backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
    },
    searchInput: {
      color: isDarkMode ? '#f1f5f9' : '#334155',
    },
    hashtagButton: {
      backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
    },
    hashtagButtonText: {
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
    emptyStateText: {
      color: isDarkMode ? '#94a3b8' : '#64748b',
    },
    emptyStateSubtext: {
      color: isDarkMode ? '#64748b' : '#94a3b8',
    },
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={[styles.header, themeStyles.header]}>
        <Text style={[styles.title, themeStyles.title]}>Search Tasks</Text>
      </View>

      <View style={[styles.searchContainer, themeStyles.searchContainer]}>
        <View style={[styles.searchInputContainer, themeStyles.searchInputContainer]}>
          <Search size={20} color={isDarkMode ? '#94a3b8' : '#94a3b8'} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, themeStyles.searchInput]}
            placeholder="Search tasks..."
            placeholderTextColor={isDarkMode ? '#94a3b8' : '#94a3b8'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {(searchQuery || activeHashtags.length > 0) && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color={isDarkMode ? '#94a3b8' : '#94a3b8'} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hashtagsScrollContainer}
        >
          {allHashtags.map((hashtag) => (
            <TouchableOpacity
              key={hashtag}
              style={[
                styles.hashtagButton,
                themeStyles.hashtagButton,
                activeHashtags.includes(hashtag) && styles.hashtagButtonActive,
              ]}
              onPress={() => toggleHashtag(hashtag)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.hashtagButtonText,
                  themeStyles.hashtagButtonText,
                  activeHashtags.includes(hashtag) && styles.hashtagButtonTextActive,
                ]}
              >
                #{hashtag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.todoList}
        showsVerticalScrollIndicator={false}
      >
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => {
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
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, themeStyles.emptyStateText]}>No matching tasks found</Text>
            <Text style={[styles.emptyStateSubtext, themeStyles.emptyStateSubtext]}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
    color: '#334155',
  },
  clearButton: {
    padding: 8,
  },
  hashtagsScrollContainer: {
    paddingVertical: 4,
    paddingRight: 16,
  },
  hashtagButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  hashtagButtonActive: {
    backgroundColor: '#6366f1',
  },
  hashtagButtonText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
  hashtagButtonTextActive: {
    color: '#ffffff',
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94a3b8',
  },
});