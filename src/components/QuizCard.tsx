
import { Quiz } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface QuizCardProps {
  quiz: Quiz;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-red-100 text-red-800 border-red-200"
};

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-video w-full bg-muted/50 relative overflow-hidden">
        <img 
          src={quiz.imageUrl} 
          alt={quiz.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${difficultyColors[quiz.difficulty]} font-medium`}>
            {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{quiz.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {quiz.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-sm text-muted-foreground">
          {quiz.questions.length} questions
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link to={`/quiz/${quiz.id}`}>
          <Button className="bg-quiz-primary hover:bg-quiz-primary/90 text-white">
            Start Quiz
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
