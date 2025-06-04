import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Trophy, Target, Zap, Calendar, Award, Star } from 'lucide-react-native';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  total: number;
}

export default function AchievementsScreen() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first task',
      icon: <Star size={24} color="#FFD700" />,
      unlocked: true,
      progress: 1,
      total: 1,
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: <Calendar size={24} color="#FF6B6B" />,
      unlocked: true,
      progress: 7,
      total: 7,
    },
    {
      id: '3',
      title: 'Rule Master',
      description: 'Create 10 personal rules',
      icon: <Target size={24} color="#3498DB" />,
      unlocked: false,
      progress: 3,
      total: 10,
    },
    {
      id: '4',
      title: 'Consistency King',
      description: 'Complete all daily tasks for 30 days',
      icon: <Trophy size={24} color="#9B59B6" />,
      unlocked: false,
      progress: 15,
      total: 30,
    },
    {
      id: '5',
      title: 'Lightning Fast',
      description: 'Complete 5 tasks in under an hour',
      icon: <Zap size={24} color="#F39C12" />,
      unlocked: false,
      progress: 2,
      total: 5,
    },
    {
      id: '6',
      title: 'Ultimate Achiever',
      description: 'Unlock all achievements',
      icon: <Award size={24} color="#E74C3C" />,
      unlocked: false,
      progress: 2,
      total: 6,
    },
  ];

  const stats = {
    totalAchievements: achievements.length,
    unlockedCount: achievements.filter(a => a.unlocked).length,
    totalPoints: achievements.filter(a => a.unlocked).length * 100,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Stats Header */}
      <Animated.View 
        style={styles.statsCard}
        entering={FadeInDown.duration(400)}
      >
        <View style={styles.mainStat}>
          <Trophy size={48} color="#FFD700" />
          <Text style={styles.mainStatNumber}>{stats.unlockedCount}/{stats.totalAchievements}</Text>
          <Text style={styles.mainStatLabel}>Achievements Unlocked</Text>
        </View>
        <View style={styles.subStats}>
          <View style={styles.subStat}>
            <Text style={styles.subStatNumber}>{stats.totalPoints}</Text>
            <Text style={styles.subStatLabel}>Total Points</Text>
          </View>
          <View style={styles.subStat}>
            <Text style={styles.subStatNumber}>
              {Math.round((stats.unlockedCount / stats.totalAchievements) * 100)}%
            </Text>
            <Text style={styles.subStatLabel}>Completion</Text>
          </View>
        </View>
      </Animated.View>

      {/* Achievements Grid */}
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement, index) => (
          <Animated.View
            key={achievement.id}
            entering={FadeInDown.duration(400).delay(index * 50)}
            style={styles.achievementWrapper}
          >
            <View style={[
              styles.achievementCard,
              !achievement.unlocked && styles.achievementLocked
            ]}>
              <View style={[
                styles.iconContainer,
                !achievement.unlocked && styles.iconLocked
              ]}>
                {achievement.icon}
              </View>
              <Text style={[
                styles.achievementTitle,
                !achievement.unlocked && styles.textLocked
              ]}>
                {achievement.title}
              </Text>
              <Text style={[
                styles.achievementDescription,
                !achievement.unlocked && styles.textLocked
              ]}>
                {achievement.description}
              </Text>
              {!achievement.unlocked && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${(achievement.progress / achievement.total) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {achievement.progress}/{achievement.total}
                  </Text>
                </View>
              )}
              {achievement.unlocked && (
                <View style={styles.unlockedBadge}>
                  <Text style={styles.unlockedText}>UNLOCKED</Text>
                </View>
              )}
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Motivational Footer */}
      <Animated.View 
        style={styles.footer}
        entering={FadeInDown.duration(400).delay(300)}
      >
        <Text style={styles.footerText}>
          Keep pushing yourself! Every achievement brings you closer to your goals.
        </Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  mainStat: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainStatNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2C3E50',
    marginTop: 10,
  },
  mainStatLabel: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 5,
  },
  subStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  subStat: {
    alignItems: 'center',
  },
  subStatNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
  },
  subStatLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  achievementsGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementLocked: {
    backgroundColor: '#F5F5F5',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconLocked: {
    backgroundColor: '#E0E0E0',
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 8,
  },
  textLocked: {
    opacity: 0.6,
  },
  progressContainer: {
    width: '100%',
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 4,
  },
  unlockedBadge: {
    backgroundColor: '#2ECC71',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  unlockedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});