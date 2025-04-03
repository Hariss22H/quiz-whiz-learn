
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MOCK_CATEGORIES, MOCK_QUIZZES } from "@/data/mockData";
import CategoryCard from "@/components/CategoryCard";
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("categories");
  
  // Filter categories based on search
  const filteredCategories = MOCK_CATEGORIES.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter quizzes based on search
  const filteredQuizzes = MOCK_QUIZZES.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <section className="mb-10">
            <h1 className="text-3xl font-bold mb-6">Explore Quizzes</h1>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search for categories or quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="categories" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="quizzes">All Quizzes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories">
                {filteredCategories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map(category => (
                      <CategoryCard key={category.id} category={category} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium mb-2">No categories found</h3>
                    <p className="text-muted-foreground mb-4">Try a different search term</p>
                    {searchQuery && (
                      <Button variant="outline" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="quizzes">
                {filteredQuizzes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuizzes.map(quiz => (
                      <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
                    <p className="text-muted-foreground mb-4">Try a different search term</p>
                    {searchQuery && (
                      <Button variant="outline" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
