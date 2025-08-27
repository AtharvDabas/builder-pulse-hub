// Comprehensive Progress Tracking Service for SarvSankalp
import { z } from 'zod';

// Progress data schema
const ProgressSchema = z.object({
  userId: z.string(),
  feature: z.string(),
  activity: z.string(),
  value: z.number(),
  maxValue: z.number(),
  timestamp: z.string(),
  metadata: z.record(z.any()).optional()
});

const UserProgressSchema = z.object({
  userId: z.string(),
  level: z.number(),
  totalPoints: z.number(),
  sdgContributions: z.record(z.number()),
  achievements: z.array(z.string()),
  streaks: z.record(z.number()),
  lastActivity: z.string()
});

type Progress = z.infer<typeof ProgressSchema>;
type UserProgress = z.infer<typeof UserProgressSchema>;

export class ProgressService {
  private static readonly STORAGE_KEY = 'sarvSankalp_progress';
  private static readonly USER_PROGRESS_KEY = 'sarvSankalp_user_progress';

  // Feature-specific progress configurations
  private static readonly FEATURE_CONFIGS = {
    'annapurna': {
      name: 'Annapurna Connect',
      sdg: 'SDG 2: Zero Hunger',
      activities: {
        'donations_posted': { max: 50, points: 10, name: 'Food Donations Posted' },
        'meals_saved': { max: 1000, points: 1, name: 'Meals Saved' },
        'ngos_connected': { max: 20, points: 15, name: 'NGOs Connected' },
        'otp_verified': { max: 100, points: 5, name: 'OTP Verified Donations' }
      }
    },
    'pathshala': {
      name: 'Pathshala Pocket',
      sdg: 'SDG 4: Quality Education',
      activities: {
        'lessons_processed': { max: 100, points: 15, name: 'Lessons Processed' },
        'videos_analyzed': { max: 50, points: 20, name: 'Videos Analyzed' },
        'quizzes_generated': { max: 200, points: 8, name: 'Quizzes Generated' },
        'notes_downloaded': { max: 500, points: 3, name: 'Notes Downloaded' }
      }
    },
    'sakhi': {
      name: 'Sakhi Suraksha',
      sdg: 'SDG 5: Gender Equality',
      activities: {
        'safety_reports': { max: 10, points: 25, name: 'Safety Reports Filed' },
        'fake_calls_used': { max: 30, points: 5, name: 'Fake Calls Used' },
        'emergency_contacts': { max: 20, points: 10, name: 'Emergency Contacts Added' },
        'location_shares': { max: 100, points: 2, name: 'Location Shares' }
      }
    },
    'jal': {
      name: 'Jal Rakshak',
      sdg: 'SDG 6: Clean Water',
      activities: {
        'water_tests': { max: 50, points: 20, name: 'Water Quality Tests' },
        'sources_mapped': { max: 25, points: 15, name: 'Water Sources Mapped' },
        'reports_generated': { max: 100, points: 8, name: 'Quality Reports Generated' },
        'contamination_detected': { max: 10, points: 30, name: 'Contamination Detected' }
      }
    },
    'skillhood': {
      name: 'Skillhood',
      sdg: 'SDG 8: Decent Work',
      activities: {
        'courses_completed': { max: 20, points: 50, name: 'Courses Completed' },
        'skills_learned': { max: 100, points: 10, name: 'Skills Learned' },
        'jobs_applied': { max: 50, points: 8, name: 'Jobs Applied To' },
        'certificates_earned': { max: 15, points: 30, name: 'Certificates Earned' }
      }
    },
    'saksin': {
      name: 'Sākṣin Green',
      sdg: 'SDG 12: Responsible Consumption',
      activities: {
        'products_scanned': { max: 200, points: 5, name: 'Products Scanned' },
        'barcodes_verified': { max: 150, points: 7, name: 'Barcodes Verified' },
        'sustainability_scores': { max: 100, points: 10, name: 'Sustainability Scores' },
        'eco_recommendations': { max: 300, points: 3, name: 'Eco Recommendations' }
      }
    },
    'carbon': {
      name: 'CarbonKart',
      sdg: 'SDG 13: Climate Action',
      activities: {
        'carbon_calculated': { max: 365, points: 2, name: 'Daily Carbon Tracking' },
        'offsets_purchased': { max: 12, points: 25, name: 'Carbon Offsets' },
        'eco_actions': { max: 100, points: 8, name: 'Eco-Friendly Actions' },
        'green_challenges': { max: 50, points: 15, name: 'Green Challenges' }
      }
    },
    'mitti': {
      name: 'Mitti Mitra',
      sdg: 'SDG 15: Life on Land',
      activities: {
        'soil_tests': { max: 30, points: 20, name: 'Soil Tests Conducted' },
        'farms_analyzed': { max: 20, points: 25, name: 'Farms Analyzed' },
        'recommendations_given': { max: 100, points: 10, name: 'Farming Recommendations' },
        'yield_improvements': { max: 15, points: 40, name: 'Yield Improvements' }
      }
    },
    'nyaya': {
      name: 'Nyaya Dost',
      sdg: 'SDG 16: Peace & Justice',
      activities: {
        'legal_queries': { max: 100, points: 8, name: 'Legal Queries Resolved' },
        'cases_researched': { max: 20, points: 30, name: 'Cases Researched' },
        'rights_learned': { max: 50, points: 12, name: 'Rights & Laws Learned' },
        'consultations': { max: 25, points: 25, name: 'Legal Consultations' }
      }
    }
  };

  // Load progress data from localStorage
  private static loadProgress(): Progress[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return z.array(ProgressSchema).parse(parsed);
      }
    } catch (error) {
      console.error('Failed to load progress data:', error);
    }
    return [];
  }

  // Load user progress from localStorage
  private static loadUserProgress(userId: string): UserProgress {
    try {
      const data = localStorage.getItem(`${this.USER_PROGRESS_KEY}_${userId}`);
      if (data) {
        return UserProgressSchema.parse(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load user progress:', error);
    }
    
    // Return default user progress
    return {
      userId,
      level: 1,
      totalPoints: 0,
      sdgContributions: {},
      achievements: [],
      streaks: {},
      lastActivity: new Date().toISOString()
    };
  }

  // Save progress data to localStorage
  private static saveProgress(progressData: Progress[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progressData));
    } catch (error) {
      console.error('Failed to save progress data:', error);
    }
  }

  // Save user progress to localStorage
  private static saveUserProgress(userProgress: UserProgress): void {
    try {
      localStorage.setItem(`${this.USER_PROGRESS_KEY}_${userProgress.userId}`, JSON.stringify(userProgress));
    } catch (error) {
      console.error('Failed to save user progress:', error);
    }
  }

  // Track activity progress
  static trackActivity(
    userId: string, 
    feature: string, 
    activity: string, 
    value: number = 1, 
    metadata?: Record<string, any>
  ): void {
    const config = this.FEATURE_CONFIGS[feature as keyof typeof this.FEATURE_CONFIGS];
    if (!config || !config.activities[activity]) {
      console.warn(`Unknown feature "${feature}" or activity "${activity}"`);
      return;
    }

    const activityConfig = config.activities[activity];
    const progressData = this.loadProgress();
    
    // Find existing progress entry
    const existingIndex = progressData.findIndex(
      p => p.userId === userId && p.feature === feature && p.activity === activity
    );

    const currentValue = existingIndex >= 0 ? progressData[existingIndex].value : 0;
    const newValue = Math.min(currentValue + value, activityConfig.max);

    const progressEntry: Progress = {
      userId,
      feature,
      activity,
      value: newValue,
      maxValue: activityConfig.max,
      timestamp: new Date().toISOString(),
      metadata
    };

    if (existingIndex >= 0) {
      progressData[existingIndex] = progressEntry;
    } else {
      progressData.push(progressEntry);
    }

    this.saveProgress(progressData);

    // Update user progress
    this.updateUserProgress(userId, feature, value * activityConfig.points);
    
    // Check for achievements
    this.checkAchievements(userId, feature, activity, newValue);
  }

  // Update overall user progress
  private static updateUserProgress(userId: string, feature: string, pointsEarned: number): void {
    const userProgress = this.loadUserProgress(userId);
    
    userProgress.totalPoints += pointsEarned;
    userProgress.lastActivity = new Date().toISOString();
    
    // Update SDG contributions
    const config = this.FEATURE_CONFIGS[feature as keyof typeof this.FEATURE_CONFIGS];
    if (config) {
      userProgress.sdgContributions[config.sdg] = (userProgress.sdgContributions[config.sdg] || 0) + pointsEarned;
    }
    
    // Calculate level (every 100 points = 1 level)
    userProgress.level = Math.floor(userProgress.totalPoints / 100) + 1;
    
    // Update streaks
    this.updateStreaks(userProgress, feature);
    
    this.saveUserProgress(userProgress);
  }

  // Update daily/weekly streaks
  private static updateStreaks(userProgress: UserProgress, feature: string): void {
    const today = new Date().toDateString();
    const streakKey = `${feature}_daily`;
    
    // Check if activity was done today
    if (userProgress.lastActivity && new Date(userProgress.lastActivity).toDateString() === today) {
      userProgress.streaks[streakKey] = (userProgress.streaks[streakKey] || 0) + 1;
    } else {
      userProgress.streaks[streakKey] = 1;
    }
  }

  // Check and award achievements
  private static checkAchievements(userId: string, feature: string, activity: string, currentValue: number): void {
    const userProgress = this.loadUserProgress(userId);
    const config = this.FEATURE_CONFIGS[feature as keyof typeof this.FEATURE_CONFIGS];
    
    if (!config) return;

    const achievements: string[] = [];
    
    // Milestone achievements (25%, 50%, 75%, 100%)
    const percentage = (currentValue / config.activities[activity].max) * 100;
    const milestones = [25, 50, 75, 100];
    
    milestones.forEach(milestone => {
      const achievementId = `${feature}_${activity}_${milestone}`;
      if (percentage >= milestone && !userProgress.achievements.includes(achievementId)) {
        achievements.push(achievementId);
        userProgress.achievements.push(achievementId);
      }
    });

    if (achievements.length > 0) {
      this.saveUserProgress(userProgress);
      this.notifyAchievements(achievements, config, activity);
    }
  }

  // Notify user of new achievements
  private static notifyAchievements(achievements: string[], config: any, activity: string): void {
    achievements.forEach(achievementId => {
      const [, , milestone] = achievementId.split('_');
      const activityName = config.activities[activity].name;
      
      // Create achievement notification (could be replaced with toast notification)
      console.log(`🏆 Achievement Unlocked: ${milestone}% ${activityName} in ${config.name}!`);
      
      // In a real app, you might dispatch an event or show a toast
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('achievement-unlocked', {
          detail: { 
            achievementId, 
            feature: config.name, 
            activity: activityName, 
            milestone 
          }
        });
        window.dispatchEvent(event);
      }
    });
  }

  // Get user's overall progress
  static getUserProgress(userId: string): UserProgress {
    return this.loadUserProgress(userId);
  }

  // Get feature-specific progress
  static getFeatureProgress(userId: string, feature: string): Progress[] {
    const progressData = this.loadProgress();
    return progressData.filter(p => p.userId === userId && p.feature === feature);
  }

  // Get activity-specific progress
  static getActivityProgress(userId: string, feature: string, activity: string): Progress | null {
    const progressData = this.loadProgress();
    return progressData.find(p => p.userId === userId && p.feature === feature && p.activity === activity) || null;
  }

  // Get progress percentage for an activity
  static getProgressPercentage(userId: string, feature: string, activity: string): number {
    const progress = this.getActivityProgress(userId, feature, activity);
    return progress ? (progress.value / progress.maxValue) * 100 : 0;
  }

  // Get all features configuration
  static getFeatureConfigs() {
    return this.FEATURE_CONFIGS;
  }

  // Get leaderboard data
  static getLeaderboard(limit: number = 10): Array<{userId: string, totalPoints: number, level: number}> {
    try {
      const users: Array<{userId: string, totalPoints: number, level: number}> = [];
      
      // Collect all users from localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.USER_PROGRESS_KEY)) {
          const data = localStorage.getItem(key);
          if (data) {
            const userProgress = JSON.parse(data);
            users.push({
              userId: userProgress.userId,
              totalPoints: userProgress.totalPoints,
              level: userProgress.level
            });
          }
        }
      }
      
      return users
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      return [];
    }
  }

  // Reset user progress (for testing/demo purposes)
  static resetUserProgress(userId: string): void {
    localStorage.removeItem(`${this.USER_PROGRESS_KEY}_${userId}`);
    
    // Remove all progress entries for this user
    const progressData = this.loadProgress();
    const filteredData = progressData.filter(p => p.userId !== userId);
    this.saveProgress(filteredData);
  }

  // Export progress data
  static exportProgress(userId: string): string {
    const userProgress = this.loadUserProgress(userId);
    const featureProgress = this.loadProgress().filter(p => p.userId === userId);
    
    return JSON.stringify({
      userProgress,
      featureProgress,
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  // Get daily summary
  static getDailySummary(userId: string): {
    activitiesCompleted: number;
    pointsEarned: number;
    featuresUsed: string[];
    achievements: string[];
  } {
    const progressData = this.loadProgress();
    const today = new Date().toDateString();
    
    const todayActivities = progressData.filter(p => 
      p.userId === userId && 
      new Date(p.timestamp).toDateString() === today
    );

    const pointsEarned = todayActivities.reduce((total, activity) => {
      const config = this.FEATURE_CONFIGS[activity.feature as keyof typeof this.FEATURE_CONFIGS];
      if (config && config.activities[activity.activity]) {
        return total + (config.activities[activity.activity].points * activity.value);
      }
      return total;
    }, 0);

    return {
      activitiesCompleted: todayActivities.length,
      pointsEarned,
      featuresUsed: [...new Set(todayActivities.map(a => a.feature))],
      achievements: [] // Could implement daily achievements here
    };
  }
}

// Export convenience functions
export const trackProgress = ProgressService.trackActivity.bind(ProgressService);
export const getUserProgress = ProgressService.getUserProgress.bind(ProgressService);
export const getFeatureProgress = ProgressService.getFeatureProgress.bind(ProgressService);
export const getProgressPercentage = ProgressService.getProgressPercentage.bind(ProgressService);
export const getLeaderboard = ProgressService.getLeaderboard.bind(ProgressService);
export const getDailySummary = ProgressService.getDailySummary.bind(ProgressService);
