import React, { useCallback, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { X } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.5;
const MAX_TRANSLATE_Y = -SHEET_HEIGHT;

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

type Props = {
  taskText: string;
  onSave: (text: string) => void;
  onClose: () => void;
};

const BottomSheet = forwardRef<BottomSheetRefProps, Props>(
  ({ taskText, onSave, onClose }, ref) => {
    const { isDarkMode } = useTheme();
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const [editedText, setEditedText] = React.useState(taskText);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { 
        damping: 50,
        stiffness: 300,
        mass: 0.8,
      });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SHEET_HEIGHT / 3) {
          scrollTo(0);
          runOnJS(onClose)();
        } else {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const handleSave = () => {
      onSave(editedText);
      scrollTo(0);
      onClose();
    };

    const themeStyles = {
      bottomSheet: {
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      },
      input: {
        backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
        color: isDarkMode ? '#f1f5f9' : '#334155',
      },
      saveButton: {
        backgroundColor: '#6366f1',
      },
      saveButtonText: {
        color: '#ffffff',
      },
      cancelButton: {
        backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
      },
      cancelButtonText: {
        color: isDarkMode ? '#f1f5f9' : '#334155',
      },
      header: {
        color: isDarkMode ? '#f1f5f9' : '#334155',
      },
    };

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle, themeStyles.bottomSheet]}>
          <View style={styles.line} />
          <View style={styles.header}>
            <Text style={[styles.headerText, themeStyles.header]}>Edit Task</Text>
            <TouchableOpacity 
              onPress={() => { scrollTo(0); onClose(); }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={24} color={isDarkMode ? '#f1f5f9' : '#334155'} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.input, themeStyles.input]}
            value={editedText}
            onChangeText={setEditedText}
            multiline
            placeholder="Edit your task..."
            placeholderTextColor={isDarkMode ? '#94a3b8' : '#64748b'}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, themeStyles.cancelButton]}
              onPress={() => { scrollTo(0); onClose(); }}
            >
              <Text style={[styles.buttonText, themeStyles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, themeStyles.saveButton]}
              onPress={handleSave}
            >
              <Text style={[styles.buttonText, themeStyles.saveButtonText]}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SHEET_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: '#cbd5e1',
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: Platform.OS === 'ios' ? 80 : 120,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 'auto',
  },
  button: {
    flex: 1,
    borderRadius: 12,
    padding: Platform.OS === 'ios' ? 14 : 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default BottomSheet;