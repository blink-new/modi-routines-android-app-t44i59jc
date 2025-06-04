import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Plus, CheckCircle, Circle, Flame } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  streak: number;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Morning Meditation', completed: false, streak: 5 },
    { id: '2', title: 'Read for 30 minutes', completed: false, streak: 12 },
    { id: '3', title: 'Exercise', completed: true, streak: 8 },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        streak: 0
      }]);
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Stats */}
      <Animated.View 
        style={styles.statsContainer}
        entering={FadeInDown.duration(400)}
      >
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completionRate}%</Text>
          <Text style={styles.statLabel}>Today's Progress</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.streakContainer}>
            <Flame size={24} color="#FF6B6B" fill="#FF6B6B" />
            <Text style={styles.statNumber}>15</Text>
          </View>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </Animated.View>

      {/* Motivational Quote */}
      <Animated.View 
        style={styles.quoteCard}
        entering={FadeInDown.duration(400).delay(100)}
      >
        <Text style={styles.quoteText}>
          "The secret of getting ahead is getting started."
        </Text>
        <Text style={styles.quoteAuthor}>- Mark Twain</Text>
      </Animated.View>

      {/* Today's Tasks */}
      <Animated.View 
        style={styles.tasksSection}
        entering={FadeInDown.duration(400).delay(200)}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddTask(true)}
          >
            <Plus size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        {showAddTask && (
          <View style={styles.addTaskContainer}>
            <TextInput
              style={styles.taskInput}
              placeholder="Add new task..."
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              onSubmitEditing={addTask}
              autoFocus
            />
            <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
              <Text style={styles.addTaskButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}

        {tasks.map((task, index) => (
          <Animated.View
            key={task.id}
            entering={FadeInUp.duration(400).delay(index * 50)}
          >
            <TouchableOpacity 
              style={[styles.taskCard, task.completed && styles.taskCompleted]}
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}
            >
              <View style={styles.taskLeft}>
                {task.completed ? (
                  <CheckCircle size={24} color="#4CAF50" />
                ) : (
                  <Circle size={24} color="#CCCCCC" />
                )}
                <View style={styles.taskInfo}>
                  <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
                    {task.title}
                  </Text>
                  {task.streak > 0 && (
                    <View style={styles.streakBadge}>
                      <Flame size={12} color="#FF6B6B" />
                      <Text style={styles.streakText}>{task.streak} days</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  quoteCard: {
    backgroundColor: '#FFE5E5',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2C3E50',
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 8,
    textAlign: 'right',
  },
  tasksSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  addButton: {
    backgroundColor: '#FFE5E5',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
  taskInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addTaskButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  addTaskButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCompleted: {
    opacity: 0.8,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#7F8C8D',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  streakText: {
    fontSize: 12,
    color: '#FF6B6B',
  },
});