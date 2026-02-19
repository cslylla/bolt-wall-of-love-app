import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import FlipCard from '../components/FlipCard'
import FAQItem from '../components/FAQItem'

export default function Landing() {
  const features = [
    {
      front: 'Community',
      back: "You're not building alone. Every project shared here is proof that someone just like you figured it out.",
    },
    {
      front: 'Inspiration',
      back: "Stuck on your next idea? Browse what others have built and let their creativity spark yours.",
    },
    {
      front: 'Sharing',
      back: "No project is too small or too simple. If you built it with Bolt, it belongs here.",
    },
  ]

  const faqs = [
    {
      question: 'My project is just a beginner app — can I still share it?',
      answer: "Absolutely. Every expert started somewhere. Beginner projects are some of the most inspiring because they show what's possible from day one.",
    },
    {
      question: 'Do I need an account to browse the wall?',
      answer: 'Yes, the wall is for the Bolt community — sign up for free to view and share projects.',
    },
    {
      question: 'Can I edit my project after posting it?',
      answer: 'Yes, you can edit or delete your own projects anytime from the wall.',
    },
    {
      question: 'What information do I need to share a project?',
      answer: "Just a title, a short description, and a link to your project. That's it.",
    },
    {
      question: "Can I share someone else's project?",
      answer: 'Only your own projects for now — each card is tied to your account.',
    },
    {
      question: 'Is there a limit to how many projects I can share?',
      answer: 'No limit. Build more, share more.',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Build it. Share it. Get inspired.
            </h1>
            <p className="text-2xl text-gray-400 mb-10 leading-relaxed">
              A community wall for Bolt.new creators — share what you've built and discover what's possible.
            </p>
            <Link to="/auth?mode=signup">
              <Button variant="primary" className="text-lg px-8 py-3">
                Get started
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-bolt-bg/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FlipCard key={index} front={feature.front} back={feature.back} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
