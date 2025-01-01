
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/S0DNb574cPj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function FeedbackForm() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-100 p-4 ">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Feedback Form</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Feedback Message</Label>
            <Textarea id="message" placeholder="Enter your feedback" className="min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" type="number" min="1" max="5" placeholder="Rate us" />
          </div>
          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  )
}