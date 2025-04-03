
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { MOCK_CATEGORIES, MOCK_QUIZZES } from "@/data/mockData";
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find the category
  const category = MOCK_CATEGORIES.find(cat => cat.id === categoryId);
  
  // Find quizzes for this category
  const categoryQuizzes = MOCK_QUIZZES.filter(quiz => quiz.categoryId === categoryId);
  
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category not found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Link to="/explore">
              <Button>Back to Explore</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/explore" className="text-quiz-primary hover:underline mb-4 inline-block">
              &larr; Back to Categories
            </Link>
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
          
          {categoryQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryQuizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No quizzes found in this category</h3>
              <p className="text-muted-foreground mb-4">Check back later for new quizzes</p>
              <Link to="/explore">
                <Button>Explore Other Categories</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
