
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_QUIZZES, MOCK_USER_PROGRESS } from "@/data/mockData";
import QuizCard from "@/components/QuizCard";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Filter quizzes for the user progress
  const userProgress = MOCK_USER_PROGRESS.filter(
    progress => progress.userId === user?.id
  );
  
  // Get completed quizzes
  const completedQuizIds = userProgress.map(progress => progress.quizId);
  const completedQuizzes = MOCK_QUIZZES.filter(quiz => 
    completedQuizIds.includes(quiz.id)
  );
  
  // Get recommended quizzes (not completed yet)
  const recommendedQuizzes = MOCK_QUIZZES.filter(
    quiz => !completedQuizIds.includes(quiz.id)
  ).slice(0, 3);

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
          <section className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username}!</h1>
            <p className="text-muted-foreground">
              Continue your learning journey today
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quizzes Completed</CardTitle>
                <CardDescription>Your learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completedQuizzesCount} / {totalQuizzes}</div>
                <Progress value={completionRate} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Score</CardTitle>
                <CardDescription>Your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{averageScore}%</div>
                <Progress value={averageScore} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Streak</CardTitle>
                <CardDescription>Days active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3 days</div>
                <div className="flex space-x-1 mt-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div 
                      key={day} 
                      className={`h-2 flex-1 rounded-full ${day <= 3 ? 'bg-quiz-primary' : 'bg-muted'}`}
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended for You</h2>
              <Link to="/explore">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            {recommendedQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedQuizzes.map(quiz => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">You've completed all available quizzes!</p>
                  <Button asChild>
                    <Link to="/explore">Explore All Quizzes</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Recent Activity</h2>
              <Link to="/profile">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            {completedQuizzes.length > 0 ? (
              <div className="space-y-4">
                {completedQuizzes.slice(0, 3).map(quiz => {
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
              <Card className="bg-muted/30">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">You haven't completed any quizzes yet</p>
                  <Button asChild>
                    <Link to="/explore">Start a Quiz</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
