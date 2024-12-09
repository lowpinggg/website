import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type SummaryProps = {
  formData: {
    name: string
    email: string
    discord: string
  }
  event: {
    id: string
    name: string
    date: string
  }
  onBack: () => void
}

export default function Summary({ formData, event, onBack }: SummaryProps) {
  const handlePayment = async () => {
    // TODO: Implement Stripe redirect
    console.log('Redirecting to payment...')
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Registration Summary</CardTitle>
        <CardDescription>Please review your information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Event Details</h3>
          <p>{event.name}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Your Information</h3>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Discord: {formData.discord}</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Payment Details</h3>
          <p>Registration Fee: $XX.XX</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handlePayment}>Proceed to Payment</Button>
      </CardFooter>
    </Card>
  )
}