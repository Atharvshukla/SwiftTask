// context/TodosContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const STORAGE_KEY = '@todos';

const TodosContext = createContext<any>(null);

export const TodosProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTodos();
    }
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Failed to load todos', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos', error);
    }
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: generateUniqueId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const clearCompletedTodos = () => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => !todo.completed);
      console.log('Clearing completed todos:', updatedTodos);
      return updatedTodos;
    });
  };

  const clearAllTodos = () => {
    console.log('Clearing all todos');
    setTodos([]);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompletedTodos,
        clearAllTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);

const generateUniqueId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};