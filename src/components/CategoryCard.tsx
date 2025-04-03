
import { QuizCategory } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: QuizCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-video w-full bg-muted/50 relative overflow-hidden">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{category.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {category.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Link to={`/category/${category.id}`}>
          <Button variant="outline" className="text-quiz-primary border-quiz-primary hover:bg-quiz-primary/10">
            Browse Quizzes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
