
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { MOCK_CATEGORIES } from "@/data/mockData";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-quiz-primary to-quiz-secondary py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-white mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                  Challenge Your Knowledge with QuizWhiz
                </h1>
                <p className="text-lg md:text-xl mb-6 text-white/90">
                  Test your skills, learn new facts, and track your progress with our interactive quizzes.
                </p>
                <div className="flex space-x-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-quiz-primary hover:bg-white/90">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/explore">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Explore Quizzes
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end">
                <div className="w-full max-w-md bg-white rounded-lg p-2 shadow-xl transform rotate-2 animate-scale-in">
                  <div className="bg-gray-50 rounded-md p-6">
                    <div className="mb-4">
                      <div className="text-xl font-bold text-gray-800 mb-2">Sample Question</div>
                      <p className="text-gray-700">What does HTML stand for?</p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border border-gray-200 text-left text-gray-800">
                        Hyper Text Markup Language
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200 text-left text-gray-800">
                        High Tech Multi Language
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200 text-left text-gray-800">
                        Hyper Transfer Markup Language
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200 text-left text-gray-800">
                        Home Tool Markup Language
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose QuizWhiz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-quiz-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quiz-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Diverse Quiz Categories</h3>
                <p className="text-gray-600">
                  Explore a wide range of topics from technology to history, science to entertainment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-quiz-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quiz-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
                <p className="text-gray-600">
                  Get immediate results and explanations for each answer to enhance your learning experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-quiz-accent/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-quiz-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor your performance, see your growth, and identify areas for improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Popular Categories</h2>
              <Link to="/explore" className="text-quiz-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_CATEGORIES.slice(0, 3).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are expanding their horizons with QuizWhiz quizzes.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-quiz-primary hover:bg-quiz-primary/90 text-white">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
