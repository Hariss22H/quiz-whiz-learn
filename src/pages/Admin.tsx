
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_CATEGORIES, MOCK_QUIZZES, MOCK_USERS, MOCK_USER_PROGRESS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Edit, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // For the create quiz form
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDescription, setNewQuizDescription] = useState("");
  const [newQuizCategory, setNewQuizCategory] = useState("");
  const [newQuizDifficulty, setNewQuizDifficulty] = useState<"easy" | "medium" | "hard">("easy");

  // For the create question form
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("0");
  const [explanation, setExplanation] = useState("");
  
  // Filter quizzes based on search
  const filteredQuizzes = MOCK_QUIZZES.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter users based on search
  const filteredUsers = MOCK_USERS.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to create a new quiz
    toast.success("Quiz created successfully!");
    
    // Reset form
    setNewQuizTitle("");
    setNewQuizDescription("");
    setNewQuizCategory("");
    setNewQuizDifficulty("easy");
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to create a new question
    toast.success("Question added successfully!");
    
    // Reset form
    setQuestionText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("0");
    setExplanation("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <section className="mb-10">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search quizzes, users, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{MOCK_QUIZZES.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{MOCK_USERS.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quiz Completions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{MOCK_USER_PROGRESS.length}</div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="quizzes">
              <TabsList className="mb-6">
                <TabsTrigger value="quizzes">Manage Quizzes</TabsTrigger>
                <TabsTrigger value="questions">Manage Questions</TabsTrigger>
                <TabsTrigger value="users">User Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quizzes">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <CardTitle>Quiz List</CardTitle>
                          <Button size="sm" className="flex items-center gap-1 bg-quiz-primary hover:bg-quiz-primary/90">
                            <Plus size={16} />
                            <span>New Quiz</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Difficulty</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredQuizzes.map(quiz => {
                                const category = MOCK_CATEGORIES.find(cat => cat.id === quiz.categoryId);
                                
                                return (
                                  <TableRow key={quiz.id}>
                                    <TableCell className="font-medium">{quiz.title}</TableCell>
                                    <TableCell>{category?.name || 'Unknown'}</TableCell>
                                    <TableCell>
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        quiz.difficulty === 'easy' 
                                          ? 'bg-green-100 text-green-800' 
                                          : quiz.difficulty === 'medium'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                      }`}>
                                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost">
                                          <Edit size={16} />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                                          <Trash size={16} />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                              
                              {filteredQuizzes.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                    No quizzes found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Create New Quiz</CardTitle>
                        <CardDescription>
                          Add a new quiz to your library
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleCreateQuiz} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Quiz Title</Label>
                            <Input 
                              id="title" 
                              placeholder="Enter quiz title" 
                              value={newQuizTitle}
                              onChange={(e) => setNewQuizTitle(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description" 
                              placeholder="Describe what this quiz is about" 
                              value={newQuizDescription}
                              onChange={(e) => setNewQuizDescription(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select 
                              value={newQuizCategory} 
                              onValueChange={setNewQuizCategory}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {MOCK_CATEGORIES.map(category => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select 
                              value={newQuizDifficulty} 
                              onValueChange={(value) => setNewQuizDifficulty(value as "easy" | "medium" | "hard")}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="submit" className="w-full bg-quiz-primary hover:bg-quiz-primary/90">
                            Create Quiz
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="questions">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <CardTitle>Question List</CardTitle>
                          <div className="flex items-center gap-2">
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select quiz" />
                              </SelectTrigger>
                              <SelectContent>
                                {MOCK_QUIZZES.map(quiz => (
                                  <SelectItem key={quiz.id} value={quiz.id}>
                                    {quiz.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button size="sm" className="flex items-center gap-1 bg-quiz-primary hover:bg-quiz-primary/90">
                              <Plus size={16} />
                              <span>Add Question</span>
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Question</TableHead>
                                <TableHead>Options</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {MOCK_QUIZZES[0]?.questions.map((question, index) => (
                                <TableRow key={question.id}>
                                  <TableCell className="font-medium">
                                    <div className="max-w-xs truncate">{question.question}</div>
                                  </TableCell>
                                  <TableCell>{question.options.length} options</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <Button size="icon" variant="ghost">
                                        <Edit size={16} />
                                      </Button>
                                      <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                                        <Trash size={16} />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Add New Question</CardTitle>
                        <CardDescription>
                          Create a new question for your quiz
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleCreateQuestion} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="quiz">Select Quiz</Label>
                            <Select required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a quiz" />
                              </SelectTrigger>
                              <SelectContent>
                                {MOCK_QUIZZES.map(quiz => (
                                  <SelectItem key={quiz.id} value={quiz.id}>
                                    {quiz.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="question">Question Text</Label>
                            <Textarea 
                              id="question" 
                              placeholder="Enter the question" 
                              value={questionText}
                              onChange={(e) => setQuestionText(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="optionA">Option A</Label>
                            <Input 
                              id="optionA" 
                              placeholder="Enter option A" 
                              value={optionA}
                              onChange={(e) => setOptionA(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="optionB">Option B</Label>
                            <Input 
                              id="optionB" 
                              placeholder="Enter option B" 
                              value={optionB}
                              onChange={(e) => setOptionB(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="optionC">Option C</Label>
                            <Input 
                              id="optionC" 
                              placeholder="Enter option C" 
                              value={optionC}
                              onChange={(e) => setOptionC(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="optionD">Option D</Label>
                            <Input 
                              id="optionD" 
                              placeholder="Enter option D" 
                              value={optionD}
                              onChange={(e) => setOptionD(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="correctAnswer">Correct Answer</Label>
                            <Select 
                              value={correctAnswer} 
                              onValueChange={setCorrectAnswer}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select correct answer" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">Option A</SelectItem>
                                <SelectItem value="1">Option B</SelectItem>
                                <SelectItem value="2">Option C</SelectItem>
                                <SelectItem value="3">Option D</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="explanation">Explanation (Optional)</Label>
                            <Textarea 
                              id="explanation" 
                              placeholder="Explain the correct answer" 
                              value={explanation}
                              onChange={(e) => setExplanation(e.target.value)}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-quiz-primary hover:bg-quiz-primary/90">
                            Add Question
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Analytics</CardTitle>
                    <CardDescription>
                      View user activity and quiz performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Quizzes Completed</TableHead>
                            <TableHead>Avg. Score</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map(user => {
                            const userCompletedQuizzes = MOCK_USER_PROGRESS.filter(
                              progress => progress.userId === user.id
                            );
                            
                            const avgScore = userCompletedQuizzes.length > 0
                              ? Math.round(userCompletedQuizzes.reduce((sum, progress) => sum + progress.score, 0) / userCompletedQuizzes.length)
                              : 0;
                            
                            return (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.isAdmin 
                                      ? 'bg-purple-100 text-purple-800' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                  </span>
                                </TableCell>
                                <TableCell>{userCompletedQuizzes.length}</TableCell>
                                <TableCell>{avgScore}%</TableCell>
                                <TableCell className="text-right">
                                  <Link to={`#user/${user.id}`}>
                                    <Button size="sm" variant="outline">View Details</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          
                          {filteredUsers.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                No users found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
