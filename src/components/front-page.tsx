'use client'

import { useState } from 'react'
import { Button } from "s/components/ui/button"
import { Moon, Sun, User, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "s/components/ui/sheet"

export function FrontPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // In a real application, you'd apply the dark mode to the entire site here
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-col min-h-screen">
        <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
          <svg className="h-10 w-40" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill={isDarkMode ? "#4B5563" : "#E5E7EB"} />
            <text x="10" y="35" fill={isDarkMode ? "#E5E7EB" : "#4B5563"} fontSize="24" fontWeight="bold">Quiz Game</text>
          </svg>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" /> Login
            </Button>
          </div>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-4">
                <Button variant="ghost" size="lg" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun className="mr-2 h-5 w-5" /> : <Moon className="mr-2 h-5 w-5" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <Button variant="outline" size="lg">
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
        <div className="flex-grow flex">
          <aside className="w-1/6 bg-gray-200 dark:bg-gray-700 p-4 hidden lg:block">
            <div className="h-full border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">Ad Space</p>
            </div>
          </aside>
          <main className="flex-grow p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6 dark:text-white">Welcome to Quiz Game</h1>
              <p className="text-xl mb-8 dark:text-gray-300">Test your knowledge with our exciting quizzes!</p>
              <Button size="lg">Start Playing</Button>
            </div>
          </main>
          <aside className="w-1/6 bg-gray-200 dark:bg-gray-700 p-4 hidden lg:block">
            <div className="h-full border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">Ad Space</p>
            </div>
          </aside>
        </div>
        <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">&copy; 2023 Quiz Game. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}