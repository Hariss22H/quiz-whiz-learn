
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_QUIZZES, MOCK_USER_PROGRESS } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  
  // Filter user progress
  const userProgress = MOCK_USER_PROGRESS.filter(
    progress => progress.userId === user?.id
  );
  
  // Get completed quizzes
  const completedQuizIds = userProgress.map(progress => progress.quizId);
  const completedQuizzes = MOCK_QUIZZES.filter(quiz => 
    completedQuizIds.includes(quiz.id)
  );
  
  // Progress stats
  const totalQuizzes = MOCK_QUIZZES.length;
  const completedQuizzesCount = completedQuizzes.length;
  const completionRate = totalQuizzes > 0 ? Math.round((completedQuizzesCount / totalQuizzes) * 100) : 0;
  
  // Average score
  const averageScore = userProgress.length > 0
    ? Math.round(userProgress.reduce((sum, progress) => sum + progress.score, 0) / userProgress.length)
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg" alt={user?.username} />
                    <AvatarFallback className="text-2xl bg-quiz-primary/10 text-quiz-primary">
                      {user?.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold mb-1">{user?.username}</h1>
                    <p className="text-muted-foreground mb-4">{user?.email}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-3">
                        <div className="text-2xl font-bold text-quiz-primary">{completedQuizzesCount}</div>
                        <div className="text-sm text-muted-foreground">Quizzes Completed</div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="text-2xl font-bold text-quiz-primary">{averageScore}%</div>
                        <div className="text-sm text-muted-foreground">Average Score</div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="text-2xl font-bold text-quiz-primary">3</div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs defaultValue="progress">
              <TabsList className="mb-6">
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Quiz Progress</CardTitle>
                    <CardDescription>
                      Track your learning journey across different quiz categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Overall Completion</div>
                          <div className="text-sm text-muted-foreground">
                            {completedQuizzesCount} of {totalQuizzes} quizzes
                          </div>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                      
                      {completedQuizzes.length > 0 ? (
                        <div className="space-y-4">
                          <h3 className="font-medium">Completed Quizzes</h3>
                          
                          {completedQuizzes.map(quiz => {
                            const progress = userProgress.find(p => p.quizId === quiz.id);
                            
                            return (
                              <Card key={quiz.id} className="overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-4">
                                  <div className="md:col-span-1 bg-muted h-full">
                                    <img 
                                      src={quiz.imageUrl} 
                                      alt={quiz.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="md:col-span-3 p-4 md:p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                      <h3 className="text-xl font-semibold">{quiz.title}</h3>
                                      <div className="text-sm text-muted-foreground">
                                        Completed on {new Date(progress?.completedAt || "").toLocaleDateString()}
                                      </div>
                                    </div>
                                    <div className="mb-4">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">
                                          Score: {progress?.score}%
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                          {quiz.questions.length} questions
                                        </span>
                                      </div>
                                      <Progress value={progress?.score} className="h-2" />
                                    </div>
                                    <div className="flex justify-end">
                                      <Link to={`/quiz/${quiz.id}`}>
                                        <Button variant="outline">Retake Quiz</Button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <h3 className="text-lg font-medium mb-2">No quizzes completed yet</h3>
                          <p className="text-muted-foreground mb-4">Start taking quizzes to track your progress</p>
                          <Link to="/explore">
                            <Button>Explore Quizzes</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>
                      Badges and rewards you've earned through your learning journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-quiz-primary/10 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-quiz-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-center">First Quiz</h3>
                        <p className="text-xs text-muted-foreground text-center">
                          Completed your first quiz
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-center text-gray-400">Perfect Score</h3>
                        <p className="text-xs text-gray-400 text-center">
                          Get 100% on any quiz
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-center text-gray-400">Speedster</h3>
                        <p className="text-xs text-gray-400 text-center">
                          Complete a quiz in under 60 seconds
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <h3 className="font-medium text-center text-gray-400">Collector</h3>
                        <p className="text-xs text-gray-400 text-center">
                          Complete 10 different quizzes
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Profile Information</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Update your account details and profile picture
                        </p>
                        <Button variant="outline">Edit Profile</Button>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-2">Notification Preferences</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Control which notifications you receive from QuizWhiz
                        </p>
                        <Button variant="outline">Manage Notifications</Button>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-2">Privacy Settings</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Control your data and privacy preferences
                        </p>
                        <Button variant="outline">Privacy Settings</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
