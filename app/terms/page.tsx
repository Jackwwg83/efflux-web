import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>By accessing and using Efflux ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Efflux is a web application that provides a unified interface for interacting with multiple AI language models including:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>OpenAI GPT models</li>
              <li>Anthropic Claude models</li>
              <li>Google Gemini models</li>
              <li>AWS Bedrock models</li>
              <li>Azure OpenAI models</li>
            </ul>
            <p>Users provide their own API keys for these services. Efflux does not provide AI model access directly.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Registration</h4>
            <p>You must create an account to use Efflux. You are responsible for maintaining the confidentiality of your account credentials.</p>
            
            <h4 className="font-semibold">API Keys</h4>
            <p>You are responsible for obtaining and managing your own API keys from AI providers. Efflux encrypts and stores these keys securely but you remain responsible for their usage and associated costs.</p>
            
            <h4 className="font-semibold">Account Security</h4>
            <p>You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Permitted Uses</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Personal and commercial use for AI-assisted tasks</li>
              <li>Research and development projects</li>
              <li>Educational purposes</li>
              <li>Content creation and writing assistance</li>
            </ul>
            
            <h4 className="font-semibold">Prohibited Uses</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Generating harmful, illegal, or malicious content</li>
              <li>Attempting to circumvent AI provider usage policies</li>
              <li>Sharing API keys or account access with unauthorized parties</li>
              <li>Using the service to violate any laws or regulations</li>
              <li>Attempting to reverse engineer or compromise the service</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. API Provider Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>By using Efflux with various AI providers, you agree to comply with each provider's terms of service:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>OpenAI Terms: <a href="https://openai.com/terms" className="text-blue-600 hover:underline">https://openai.com/terms</a></li>
              <li>Anthropic Terms: <a href="https://www.anthropic.com/terms" className="text-blue-600 hover:underline">https://www.anthropic.com/terms</a></li>
              <li>Google Terms: <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline">https://policies.google.com/terms</a></li>
            </ul>
            <p>You are solely responsible for compliance with these terms and any associated costs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Data and Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Your Data</h4>
            <p>You retain ownership of all content you create using Efflux. We do not claim rights to your conversations or generated content.</p>
            
            <h4 className="font-semibold">Data Processing</h4>
            <p>Your messages are processed by the AI providers you choose. Each provider has their own data handling policies.</p>
            
            <h4 className="font-semibold">Privacy</h4>
            <p>Our privacy practices are detailed in our Privacy Policy, which is incorporated into these terms by reference.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Service Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Uptime</h4>
            <p>We strive to maintain high availability but do not guarantee uninterrupted service. Maintenance, updates, and technical issues may cause temporary interruptions.</p>
            
            <h4 className="font-semibold">Third-Party Dependencies</h4>
            <p>Service functionality depends on third-party AI providers and infrastructure services. We are not responsible for outages or issues with these services.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Fees and Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Efflux Service</h4>
            <p>Efflux is currently provided free of charge. We reserve the right to introduce fees for premium features in the future with advance notice.</p>
            
            <h4 className="font-semibold">AI Provider Costs</h4>
            <p>You are responsible for all costs associated with your AI provider API usage. Efflux does not mark up or profit from these costs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Efflux is provided "as is" without warranties of any kind</li>
              <li>We are not liable for any damages arising from your use of the service</li>
              <li>We are not responsible for content generated by AI models</li>
              <li>Our liability is limited to the amount you paid for the service (currently $0)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Efflux IP</h4>
            <p>The Efflux application, including its code, design, and branding, is protected by intellectual property laws.</p>
            
            <h4 className="font-semibold">Open Source</h4>
            <p>Efflux is open source software. The source code is available under the MIT License at <a href="https://github.com/Jackwwg83/efflux-web" className="text-blue-600 hover:underline">GitHub</a>.</p>
            
            <h4 className="font-semibold">User Content</h4>
            <p>You retain all rights to content you create. We do not claim ownership of your conversations or generated text.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">By You</h4>
            <p>You may terminate your account at any time by deleting it through the settings page.</p>
            
            <h4 className="font-semibold">By Us</h4>
            <p>We may terminate accounts that violate these terms or for operational reasons with reasonable notice.</p>
            
            <h4 className="font-semibold">Effect of Termination</h4>
            <p>Upon termination, your data will be deleted according to our data retention policies outlined in the Privacy Policy.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We may update these terms from time to time. Material changes will be communicated via email or prominently displayed in the application. Continued use after changes constitutes acceptance of the new terms.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>13. Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p>These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>14. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>For questions about these terms, please contact us:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Email: legal@efflux.ai</li>
              <li>GitHub: <a href="https://github.com/Jackwwg83/efflux-web/issues" className="text-blue-600 hover:underline">https://github.com/Jackwwg83/efflux-web/issues</a></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>15. Severability</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}