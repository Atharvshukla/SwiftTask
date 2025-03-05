import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withDelay,
  Easing,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';
import { Redirect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, ListTodo } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

const { width, height } = Dimensions.get('window');

export default function Index() {
  const { isDarkMode } = useTheme();
  const [redirectToApp, setRedirectToApp] = useState(false);
  
  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(1);
  
  // Background circles for visual interest
  const circles = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * width,
    y: Math.random() * height,
    opacity: Math.random() * 0.3 + 0.1,
    animValue: useSharedValue(0),
  }));

  useEffect(() => {
    // Start the animation sequence
    logoScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    logoOpacity.value = withTiming(1, { duration: 800 });
    
    // Animate title with delay
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
    titleTranslateY.value = withDelay(400, withTiming(0, { duration: 800 }));
    
    // Animate subtitle with more delay
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    
    // Animate button last
    buttonOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
    buttonScale.value = withDelay(1200, withSpring(1, { damping: 12, stiffness: 100 }));
    
    // Animate background circles
    circles.forEach((circle, index) => {
      circle.animValue.value = withDelay(
        index * 200, 
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      );
    });
  }, []);

  const handleEnterApp = () => {
    // Animate the circle reveal effect
    circleScale.value = withTiming(5, { duration: 800, easing: Easing.inOut(Easing.ease) }, () => {
      // After animation completes, redirect to the app
      runOnJS(setRedirectToApp)(true);
    });
    
    // Fade out other elements
    logoOpacity.value = withTiming(0, { duration: 400 });
    titleOpacity.value = withTiming(0, { duration: 400 });
    subtitleOpacity.value = withTiming(0, { duration: 400 });
    buttonOpacity.value = withTiming(0, { duration: 400 });
  };

  // Animated styles
  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    opacity: circleOpacity.value,
  }));

  // Background circle styles
  const circleStyles = circles.map(circle => 
    useAnimatedStyle(() => {
      const translateY = interpolate(
        circle.animValue.value,
        [0, 0.5, 1],
        [0, -20, 0],
        Extrapolate.CLAMP
      );
      
      return {
        opacity: interpolate(
          circle.animValue.value,
          [0, 0.5, 1],
          [circle.opacity, circle.opacity * 0.7, circle.opacity],
          Extrapolate.CLAMP
        ),
        transform: [
          { translateY },
          { scale: interpolate(
              circle.animValue.value,
              [0, 0.5, 1],
              [1, 1.1, 1],
              Extrapolate.CLAMP
            ) 
          }
        ],
      };
    })
  );

  if (redirectToApp) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }
    ]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Background decorative circles */}
      {circles.map((circle, index) => (
        <Animated.View
          key={circle.id}
          style={[
            styles.backgroundCircle,
            {
              width: circle.size,
              height: circle.size,
              left: circle.x,
              top: circle.y,
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
            },
            circleStyles[index],
          ]}
        />
      ))}
      
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <ListTodo size={80} color={isDarkMode ? '#6366f1' : '#6366f1'} strokeWidth={1.5} />
      </Animated.View>
      
      <Animated.Text style={[
        styles.title,
        titleStyle,
        { color: isDarkMode ? '#f1f5f9' : '#1e293b' }
      ]}>
        TaskMaster
      </Animated.Text>
      
      <Animated.Text style={[
        styles.subtitle,
        subtitleStyle,
        { color: isDarkMode ? '#94a3b8' : '#64748b' }
      ]}>
        Organize your tasks with style
      </Animated.Text>
      
      <Animated.View style={[styles.buttonContainer, buttonStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleEnterApp}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#6366f1', '#4f46e5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <CheckCircle size={20} color="#ffffff" style={styles.buttonIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Circle reveal animation */}
      <Animated.View 
        style={[
          styles.revealCircle, 
          circleStyle,
          { backgroundColor: isDarkMode ? '#1e293b' : '#ffffff' }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  backgroundCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.2,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 60,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    width: '80%',
    maxWidth: 300,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  revealCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    zIndex: 10,
  },
});