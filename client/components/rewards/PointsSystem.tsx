import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  Star, 
  Trophy, 
  Gift, 
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Users,
  Heart
} from "lucide-react";

interface PointsSystemProps {
  user: any;
  onPointsUpdate: (points: number) => void;
}

const achievements = [
  {
    id: "first_contribution",
    title: "First Contribution",
    description: "Made your first SDG contribution",
    points: 100,
    icon: Star,
    unlocked: true,
    rarity: "common"
  },
  {
    id: "health_champion",
    title: "Health Champion",
    description: "Used Sehat Sathi 10 times",
    points: 250,
    icon: Heart,
    unlocked: true,
    rarity: "uncommon"
  },
  {
    id: "food_hero",
    title: "Food Hero",
    description: "Donated food 5 times through Annapurna Connect",
    points: 300,
    icon: Gift,
    unlocked: false,
    rarity: "rare"
  },
  {
    id: "sdg_master",
    title: "SDG Master",
    description: "Contributed to all 10 SDG features",
    points: 1000,
    icon: Trophy,
    unlocked: false,
    rarity: "legendary"
  }
];

const dailyTasks = [
  {
    id: "daily_health_check",
    title: "Daily Health Check",
    description: "Use Sehat Sathi symptom checker",
    points: 50,
    completed: false,
    sdg: "SDG 3"
  },
  {
    id: "water_quality_report",
    title: "Water Quality Report",
    description: "Report water quality data",
    points: 75,
    completed: true,
    sdg: "SDG 6"
  },
  {
    id: "skill_exchange",
    title: "Skill Exchange",
    description: "Participate in skill sharing",
    points: 100,
    completed: false,
    sdg: "SDG 8"
  }
];

const levelBenefits = [
  { level: 1, title: "Beginner", minPoints: 0, benefits: ["Basic access", "SDG progress tracking"] },
  { level: 2, title: "Contributor", minPoints: 500, benefits: ["Priority support", "Monthly reports"] },
  { level: 3, title: "Advocate", minPoints: 1000, benefits: ["Expert consultations", "Advanced features"] },
  { level: 4, title: "Champion", minPoints: 2000, benefits: ["Mentorship opportunities", "Beta features"] },
  { level: 5, title: "Leader", minPoints: 5000, benefits: ["Policy consultation", "Leadership board"] }
];

const rewards = [
  {
    id: "tree_planting",
    title: "Plant a Tree",
    description: "We'll plant a tree in your name",
    points: 500,
    category: "Environment",
    available: true
  },
  {
    id: "meal_donation",
    title: "Sponsor a Meal",
    description: "Provide a meal to someone in need",
    points: 200,
    category: "Hunger",
    available: true
  },
  {
    id: "education_kit",
    title: "Education Kit",
    description: "Support a child's education for a month",
    points: 800,
    category: "Education",
    available: true
  },
  {
    id: "water_filter",
    title: "Water Filter Donation",
    description: "Provide clean water access",
    points: 1000,
    category: "Water",
    available: false
  }
];

export default function PointsSystem({ user, onPointsUpdate }: PointsSystemProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [userLevel, setUserLevel] = useState(1);
  const [pointsToNextLevel, setPointsToNextLevel] = useState(0);

  useEffect(() => {
    // Calculate user level based on points
    const currentLevel = levelBenefits.findIndex(level => user.points < level.minPoints);
    const level = currentLevel === -1 ? levelBenefits.length : currentLevel;
    setUserLevel(level);
    
    if (level < levelBenefits.length) {
      setPointsToNextLevel(levelBenefits[level].minPoints - user.points);
    } else {
      setPointsToNextLevel(0);
    }
  }, [user.points]);

  const completeTask = (taskId: string, points: number) => {
    const newPoints = user.points + points;
    onPointsUpdate(newPoints);
    
    // Update local storage
    const updatedUser = { ...user, points: newPoints };
    localStorage.setItem('sarvSankalpUser', JSON.stringify(updatedUser));
    
    alert(`Task completed! +${points} points earned`);
  };

  const redeemReward = (reward: any) => {
    if (user.points >= reward.points) {
      const newPoints = user.points - reward.points;
      onPointsUpdate(newPoints);
      
      const updatedUser = { ...user, points: newPoints };
      localStorage.setItem('sarvSankalpUser', JSON.stringify(updatedUser));
      
      alert(`Reward redeemed: ${reward.title}\nThank you for your contribution to ${reward.category}!`);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-600 bg-gray-100";
      case "uncommon": return "text-green-600 bg-green-100";
      case "rare": return "text-blue-600 bg-blue-100";
      case "legendary": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Points & Rewards</h2>
            <p className="text-blue-100">Level {userLevel}: {levelBenefits[userLevel - 1]?.title}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{user.points}</div>
            <div className="text-sm text-blue-100">Total Points</div>
          </div>
        </div>
        
        {pointsToNextLevel > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Progress to Level {userLevel + 1}</span>
              <span className="text-sm">{pointsToNextLevel} points needed</span>
            </div>
            <Progress 
              value={((levelBenefits[userLevel]?.minPoints - pointsToNextLevel) / levelBenefits[userLevel]?.minPoints) * 100} 
              className="h-2 bg-blue-300"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 bg-white rounded-lg p-1 shadow-sm">
        {["overview", "tasks", "achievements", "rewards"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-500" />
                Daily Goals
              </CardTitle>
              <CardDescription>Complete tasks to earn points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{task.title}</div>
                      <div className="text-xs text-gray-600">{task.description}</div>
                      <Badge variant="outline" className="mt-1 text-xs">{task.sdg}</Badge>
                    </div>
                    <div className="text-right">
                      {task.completed ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      ) : (
                        <div>
                          <div className="text-sm font-medium text-blue-600">+{task.points}</div>
                          <Button size="sm" onClick={() => completeTask(task.id, task.points)}>
                            Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Impact Statistics
              </CardTitle>
              <CardDescription>Your contribution to SDGs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Contributions Made</span>
                  <span className="font-bold">{user.contributions || 23}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SDGs Impacted</span>
                  <span className="font-bold">7/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lives Touched</span>
                  <span className="font-bold">{Math.floor(user.points / 10)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Days Active</span>
                  <span className="font-bold">{Math.floor(Math.random() * 30) + 1}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Daily Tasks
              </CardTitle>
              <CardDescription>Complete daily tasks to earn points and contribute to SDGs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <Badge variant="outline">{task.sdg}</Badge>
                    </div>
                    <div className="text-right">
                      {task.completed ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Star className="h-4 w-4 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-lg font-bold text-blue-600">+{task.points}</div>
                          <Button 
                            size="sm" 
                            onClick={() => completeTask(task.id, task.points)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            Complete Task
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Achievements
              </CardTitle>
              <CardDescription>Unlock achievements by contributing to different SDGs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className={`p-4 border rounded-lg ${
                        achievement.unlocked ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${achievement.unlocked ? "bg-yellow-500" : "bg-gray-400"}`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge className={getRarityColor(achievement.rarity)}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        {achievement.unlocked && <Zap className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-600">+{achievement.points} points</span>
                        {achievement.unlocked ? (
                          <Badge className="bg-green-100 text-green-800">Unlocked</Badge>
                        ) : (
                          <Badge variant="outline">Locked</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === "rewards" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2 text-green-500" />
                Redeem Rewards
              </CardTitle>
              <CardDescription>Use your points to make real-world impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="border rounded-lg p-4">
                    <div className="mb-3">
                      <h4 className="font-semibold">{reward.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                      <Badge variant="outline">{reward.category}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">{reward.points} points</span>
                      <Button 
                        size="sm"
                        onClick={() => redeemReward(reward)}
                        disabled={user.points < reward.points || !reward.available}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        {user.points < reward.points ? "Not enough points" : "Redeem"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
