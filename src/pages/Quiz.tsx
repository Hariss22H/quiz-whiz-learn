
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MOCK_QUIZZES } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { QuizQuestion, QuizResult } from "@/types";

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-red-100 text-red-800 border-red-200"
};

const Quiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  
  // Find the quiz
  const quiz = MOCK_QUIZZES.find(q => q.id === quizId);
  
  useEffect(() => {
    // Reset quiz state when quiz changes
    if (quiz) {
      setQuizStarted(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setUserAnswers([]);
      setResult(null);
      setStartTime(null);
    }
  }, [quizId, quiz]);
  
  if (!quiz) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
            <p className="text-muted-foreground mb-6">The quiz you're looking for doesn't exist.</p>
            <Link to="/explore">
              <Button>Back to Explore</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to start a quiz");
      navigate("/login");
      return;
    }
    
    setQuizStarted(true);
    setStartTime(new Date());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    // Show feedback
    setShowFeedback(true);
    
    // Add answer to user answers
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed
      calculateResult();
    }
  };

  const calculateResult = () => {
    const endTime = new Date();
    const timeTaken = startTime 
      ? Math.round((endTime.getTime() - startTime.getTime()) / 1000) 
      : 0;
    
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    const quizResult: QuizResult = {
      quizId: quiz.id,
      totalQuestions: quiz.questions.length,
      correctAnswers,
      score,
      timeTaken,
      completedAt: new Date().toISOString()
    };
    
    setResult(quizResult);
    
    // In a real app, we would save this result to the backend
    toast.success("Quiz completed!");
  };

  // Current question data
  const question: QuizQuestion | undefined = quizStarted 
    ? quiz.questions[currentQuestion] 
    : undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {!quizStarted && !result && (
            <div className="max-w-3xl mx-auto">
              <Link to="/explore" className="text-quiz-primary hover:underline mb-4 inline-block">
                &larr; Back to Explore
              </Link>
              
              <Card className="overflow-hidden">
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img 
                    src={quiz.imageUrl} 
                    alt={quiz.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${difficultyColors[quiz.difficulty]} font-medium`}>
                      {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-quiz-primary"></div>
                        <span className="text-sm">{quiz.questions.length} questions</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Approx. {quiz.questions.length * 30} seconds
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end">
                  <Button onClick={handleStartQuiz} className="bg-quiz-primary hover:bg-quiz-primary/90">
                    Start Quiz
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {quizStarted && question && !result && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </div>
                </div>
                <Progress 
                  value={((currentQuestion + 1) / quiz.questions.length) * 100} 
                  className="h-2"
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{question.question}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <div
                        key={index}
                        className={`answer-option ${
                          selectedAnswer === index ? 'selected' : ''
                        } ${
                          showFeedback && index === question.correctAnswer ? 'correct' : ''
                        } ${
                          showFeedback && selectedAnswer === index && index !== question.correctAnswer ? 'incorrect' : ''
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <div className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                  
                  {showFeedback && question.explanation && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">Explanation:</h4>
                      <p className="text-sm">{question.explanation}</p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-end">
                  {!showFeedback ? (
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-quiz-primary hover:bg-quiz-primary/90"
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} className="bg-quiz-primary hover:bg-quiz-primary/90">
                      {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}

          {result && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Quiz Completed!</CardTitle>
                  <CardDescription className="text-center">
                    Here's how you did on "{quiz.title}"
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-quiz-primary/10 mb-4">
                      <span className="text-4xl font-bold text-quiz-primary">{result.score}%</span>
                    </div>
                    <h3 className="font-medium text-lg">
                      You got {result.correctAnswers} out of {result.totalQuestions} questions right
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Completed in {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Question Breakdown:</h4>
                    
                    {quiz.questions.map((q, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          userAnswers[index] === q.correctAnswer 
                            ? 'border-quiz-correct bg-quiz-correct/10' 
                            : 'border-quiz-incorrect bg-quiz-incorrect/10'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium mb-1">{q.question}</p>
                            <p className="text-sm">
                              <span className="font-medium">Your answer:</span> {q.options[userAnswers[index]]}
                            </p>
                            {userAnswers[index] !== q.correctAnswer && (
                              <p className="text-sm">
                                <span className="font-medium">Correct answer:</span> {q.options[q.correctAnswer]}
                              </p>
                            )}
                          </div>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            userAnswers[index] === q.correctAnswer 
                              ? 'bg-quiz-correct text-white' 
                              : 'bg-quiz-incorrect text-white'
                          }`}>
                            {userAnswers[index] === q.correctAnswer ? '✓' : '✗'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuizStarted(false);
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setShowFeedback(false);
                      setUserAnswers([]);
                      setResult(null);
                      setStartTime(null);
                    }}
                  >
                    Take Again
                  </Button>
                  <Link to="/dashboard">
                    <Button className="bg-quiz-primary hover:bg-quiz-primary/90">
                      Back to Dashboard
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;
