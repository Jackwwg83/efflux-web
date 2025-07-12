import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Account Information</h4>
            <p>When you create an account, we collect your email address and any profile information you choose to provide.</p>
            
            <h4 className="font-semibold">API Keys</h4>
            <p>Your AI provider API keys are encrypted using AES-256-GCM encryption on your device before being stored. We cannot decrypt or access your API keys.</p>
            
            <h4 className="font-semibold">Chat Data</h4>
            <p>Your conversations are stored to provide continuity across sessions. Messages are associated with your account and protected by row-level security.</p>
            
            <h4 className="font-semibold">Usage Information</h4>
            <p>We collect basic usage analytics to improve our service, including page views and feature usage (anonymized).</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li>Provide and maintain the Efflux service</li>
              <li>Enable communication with AI providers using your API keys</li>
              <li>Store and retrieve your conversation history</li>
              <li>Send important service updates and security notifications</li>
              <li>Improve our service through anonymized usage analytics</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Encryption</h4>
            <p>Your API keys are encrypted using industry-standard AES-256-GCM encryption. The encryption happens in your browser, and we never have access to your unencrypted API keys.</p>
            
            <h4 className="font-semibold">Database Security</h4>
            <p>All data is stored in Supabase with row-level security (RLS) policies ensuring users can only access their own data.</p>
            
            <h4 className="font-semibold">Transport Security</h4>
            <p>All data transmission uses HTTPS/TLS encryption.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We do not sell, trade, or rent your personal information to third parties. We only share data in the following circumstances:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>AI Providers</strong>: Your messages are sent to your chosen AI providers (OpenAI, Anthropic, etc.) using your API keys</li>
              <li><strong>Service Providers</strong>: We use Supabase for database hosting and Vercel for application hosting</li>
              <li><strong>Legal Requirements</strong>: When required by law or to protect our rights</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Access</strong>: View all data we have about you through your account dashboard</li>
              <li><strong>Export</strong>: Download your conversation history and settings</li>
              <li><strong>Delete</strong>: Permanently delete your account and all associated data</li>
              <li><strong>Modify</strong>: Update your profile information and preferences at any time</li>
              <li><strong>Portability</strong>: Export your data in standard formats</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">AI Providers</h4>
            <p>When you use Efflux, your messages are sent to your chosen AI providers. Each provider has their own privacy policy:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>OpenAI: <a href="https://openai.com/privacy" className="text-blue-600 hover:underline">https://openai.com/privacy</a></li>
              <li>Anthropic: <a href="https://www.anthropic.com/privacy" className="text-blue-600 hover:underline">https://www.anthropic.com/privacy</a></li>
              <li>Google: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">https://policies.google.com/privacy</a></li>
            </ul>
            
            <h4 className="font-semibold">Infrastructure</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Supabase: <a href="https://supabase.com/privacy" className="text-blue-600 hover:underline">https://supabase.com/privacy</a></li>
              <li>Vercel: <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:underline">https://vercel.com/legal/privacy-policy</a></li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Account Data</strong>: Retained until you delete your account</li>
              <li><strong>Conversations</strong>: Stored indefinitely unless you delete them</li>
              <li><strong>API Keys</strong>: Stored until you remove them from your vault</li>
              <li><strong>Analytics</strong>: Anonymized usage data retained for up to 2 years</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Efflux is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>If you have any questions about this privacy policy, please contact us at:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Email: privacy@efflux.ai</li>
              <li>GitHub: <a href="https://github.com/Jackwwg83/efflux-web/issues" className="text-blue-600 hover:underline">https://github.com/Jackwwg83/efflux-web/issues</a></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}